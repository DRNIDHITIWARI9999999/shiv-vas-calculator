
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPinIcon, SearchIcon, LoaderIcon } from 'lucide-react';

interface LocationSearchProps {
  onLocationSelect: (location: { latitude: number; longitude: number; city: string }) => void;
  language: 'sanskrit' | 'english';
}

interface GeocodingResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  display_name: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  const searchCities = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Using Nominatim (OpenStreetMap) geocoding service - free and no API key required
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&addressdetails=1&featuretype=city`
      );
      
      if (response.ok) {
        const data = await response.json();
        const cities = data
          .filter((item: any) => 
            item.type === 'city' || 
            item.type === 'town' || 
            item.type === 'village' ||
            item.class === 'place'
          )
          .map((item: any) => ({
            name: item.name || item.display_name.split(',')[0],
            country: item.address?.country || '',
            state: item.address?.state || '',
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            display_name: item.display_name
          }))
          .slice(0, 6);
        
        setSuggestions(cities);
      }
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search to avoid too many API calls
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchCities(searchTerm);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

  const handleCitySelect = (city: GeocodingResult) => {
    const cityName = `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`;
    onLocationSelect({
      latitude: city.lat,
      longitude: city.lon,
      city: cityName
    });
    setSearchTerm(cityName);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: language === 'sanskrit' ? 'वर्तमान स्थान' : 'Current Location'
          });
          setSearchTerm(language === 'sanskrit' ? 'वर्तमान स्थान' : 'Current Location');
        },
        (error) => {
          console.error('Location detection failed:', error);
        }
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (!(e.target as Element).closest('.location-search-container')) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleGlobalClick = () => setShowSuggestions(false);
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="relative location-search-container">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          {isLoading && (
            <LoaderIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
          )}
          <Input
            placeholder={language === 'sanskrit' ? 'शहर खोजें (जैसे: नई दिल्ली, न्यूयॉर्क)...' : 'Search city (e.g: New Delhi, New York)...'}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="pl-10 pr-10"
            autoComplete="off"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((city, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-saffron-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {city.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {city.state && `${city.state}, `}{city.country}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 ml-2 text-right">
                      <div>{city.lat.toFixed(3)}</div>
                      <div>{city.lon.toFixed(3)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showSuggestions && searchTerm.length >= 2 && suggestions.length === 0 && !isLoading && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="px-4 py-3 text-gray-500 text-sm">
                {language === 'sanskrit' ? 'कोई शहर नहीं मिला' : 'No cities found'}
              </div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleLocationDetection} 
          variant="outline" 
          className="px-3"
          title={language === 'sanskrit' ? 'वर्तमान स्थान का उपयोग करें' : 'Use current location'}
        >
          <MapPinIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LocationSearch;
