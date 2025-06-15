
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, MapPinIcon } from 'lucide-react';
import { sanitizeCityName, validateCoordinates, RateLimiter } from '@/utils/securityUtils';

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

interface LocationSearchProps {
  onLocationSelect: (location: { latitude: number; longitude: number; city: string }) => void;
  language: 'sanskrit' | 'english';
}

// Create rate limiter instance
const searchRateLimiter = new RateLimiter(5, 10000); // 5 requests per 10 seconds

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const texts = {
    sanskrit: {
      placeholder: 'शहर खोजें...',
      searching: 'खोज रहे हैं...',
      noResults: 'कोई परिणाम नहीं मिला',
      rateLimitExceeded: 'बहुत अधिक अनुरोध, कृपया प्रतीक्षा करें',
      invalidInput: 'अवैध इनपुट'
    },
    english: {
      placeholder: 'Search for a city...',
      searching: 'Searching...',
      noResults: 'No results found',
      rateLimitExceeded: 'Too many requests, please wait',
      invalidInput: 'Invalid input'
    }
  };

  const t = texts[language];

  const searchCities = async (query: string) => {
    // Sanitize and validate input
    const sanitizedQuery = sanitizeCityName(query);
    if (!sanitizedQuery || sanitizedQuery.length < 2) {
      setResults([]);
      return;
    }

    // Check rate limiting
    if (!searchRateLimiter.canMakeRequest()) {
      console.warn('Rate limit exceeded for location search');
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    try {
      // Use encodeURIComponent to properly encode the query
      const encodedQuery = encodeURIComponent(sanitizedQuery);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=5&countrycodes=&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'ShivVaasCalculator/1.0.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Validate response data
      if (Array.isArray(data)) {
        const validResults = data.filter((item: any) => {
          const lat = parseFloat(item.lat);
          const lon = parseFloat(item.lon);
          return (
            item.display_name && 
            typeof item.display_name === 'string' &&
            validateCoordinates(lat, lon) &&
            item.place_id &&
            typeof item.place_id === 'number'
          );
        });
        
        setResults(validResults.slice(0, 5)); // Limit to 5 results
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error searching cities:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchTerm.trim()) {
      debounceTimer.current = setTimeout(() => {
        searchCities(searchTerm);
      }, 500);
    } else {
      setResults([]);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = sanitizeCityName(value);
    setSearchTerm(sanitizedValue);
    setShowResults(true);
  };

  const handleLocationSelect = (result: LocationResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    // Double-check coordinates before using them
    if (validateCoordinates(lat, lon)) {
      const cityName = result.display_name.split(',')[0].trim();
      onLocationSelect({
        latitude: lat,
        longitude: lon,
        city: sanitizeCityName(cityName)
      });
      setSearchTerm(cityName);
      setShowResults(false);
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder={t.placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="pl-10"
            maxLength={100}
            autoComplete="off"
          />
        </div>
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">
              {t.searching}
            </div>
          ) : results.length > 0 ? (
            results.map((result) => (
              <Button
                key={result.place_id}
                variant="ghost"
                className="w-full justify-start p-3 h-auto text-left hover:bg-gray-50 rounded-none border-b border-gray-100 last:border-b-0"
                onClick={() => handleLocationSelect(result)}
              >
                <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" />
                <span className="truncate">{result.display_name}</span>
              </Button>
            ))
          ) : searchTerm.trim() && !isLoading ? (
            <div className="p-3 text-center text-gray-500">
              {t.noResults}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
