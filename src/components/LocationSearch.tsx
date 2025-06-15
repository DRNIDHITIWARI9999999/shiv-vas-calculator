
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPinIcon, SearchIcon } from 'lucide-react';

interface LocationSearchProps {
  onLocationSelect: (location: { latitude: number; longitude: number; city: string }) => void;
  language: 'sanskrit' | 'english';
}

// Major Indian cities with coordinates
const INDIAN_CITIES = [
  { name: 'New Delhi', sanskrit: 'नई दिल्ली', latitude: 28.6139, longitude: 77.2090 },
  { name: 'Mumbai', sanskrit: 'मुंबई', latitude: 19.0760, longitude: 72.8777 },
  { name: 'Kolkata', sanskrit: 'कोलकाता', latitude: 22.5726, longitude: 88.3639 },
  { name: 'Chennai', sanskrit: 'चेन्नई', latitude: 13.0827, longitude: 80.2707 },
  { name: 'Bangalore', sanskrit: 'बैंगलोर', latitude: 12.9716, longitude: 77.5946 },
  { name: 'Hyderabad', sanskrit: 'हैदराबाद', latitude: 17.3850, longitude: 78.4867 },
  { name: 'Pune', sanskrit: 'पुणे', latitude: 18.5204, longitude: 73.8567 },
  { name: 'Ahmedabad', sanskrit: 'अहमदाबाद', latitude: 23.0225, longitude: 72.5714 },
  { name: 'Jaipur', sanskrit: 'जयपुर', latitude: 26.9124, longitude: 75.7873 },
  { name: 'Surat', sanskrit: 'सूरत', latitude: 21.1702, longitude: 72.8311 },
  { name: 'Lucknow', sanskrit: 'लखनऊ', latitude: 26.8467, longitude: 80.9462 },
  { name: 'Kanpur', sanskrit: 'कानपुर', latitude: 26.4499, longitude: 80.3319 },
  { name: 'Nagpur', sanskrit: 'नागपुर', latitude: 21.1458, longitude: 79.0882 },
  { name: 'Indore', sanskrit: 'इंदौर', latitude: 22.7196, longitude: 75.8577 },
  { name: 'Thane', sanskrit: 'ठाणे', latitude: 19.2183, longitude: 72.9781 },
  { name: 'Bhopal', sanskrit: 'भोपाल', latitude: 23.2599, longitude: 77.4126 },
  { name: 'Visakhapatnam', sanskrit: 'विशाखापत्तनम', latitude: 17.6868, longitude: 83.2185 },
  { name: 'Pimpri-Chinchwad', sanskrit: 'पिंपरी-चिंचवड', latitude: 18.6298, longitude: 73.7997 },
  { name: 'Patna', sanskrit: 'पटना', latitude: 25.5941, longitude: 85.1376 },
  { name: 'Vadodara', sanskrit: 'वडोदरा', latitude: 22.3072, longitude: 73.1812 },
  { name: 'Ghaziabad', sanskrit: 'गाजियाबाद', latitude: 28.6692, longitude: 77.4538 },
  { name: 'Ludhiana', sanskrit: 'लुधियाना', latitude: 30.9010, longitude: 75.8573 },
  { name: 'Agra', sanskrit: 'आगरा', latitude: 27.1767, longitude: 78.0081 },
  { name: 'Nashik', sanskrit: 'नाशिक', latitude: 19.9975, longitude: 73.7898 },
  { name: 'Faridabad', sanskrit: 'फरीदाबाद', latitude: 28.4089, longitude: 77.3178 },
  { name: 'Meerut', sanskrit: 'मेरठ', latitude: 28.9845, longitude: 77.7064 },
  { name: 'Rajkot', sanskrit: 'राजकोट', latitude: 22.3039, longitude: 70.8022 },
  { name: 'Kalyan-Dombivli', sanskrit: 'कल्याण-डोंबिवली', latitude: 19.2350, longitude: 73.1300 },
  { name: 'Vasai-Virar', sanskrit: 'वसई-विरार', latitude: 19.4914, longitude: 72.8054 },
  { name: 'Varanasi', sanskrit: 'वाराणसी', latitude: 25.3176, longitude: 82.9739 },
  { name: 'Srinagar', sanskrit: 'श्रीनगर', latitude: 34.0837, longitude: 74.7973 },
  { name: 'Dhanbad', sanskrit: 'धनबाद', latitude: 23.7957, longitude: 86.4304 },
  { name: 'Jodhpur', sanskrit: 'जोधपुर', latitude: 26.2389, longitude: 73.0243 },
  { name: 'Amritsar', sanskrit: 'अमृतसर', latitude: 31.6340, longitude: 74.8723 },
  { name: 'Raipur', sanskrit: 'रायपुर', latitude: 21.2514, longitude: 81.6296 },
  { name: 'Allahabad', sanskrit: 'इलाहाबाद', latitude: 25.4358, longitude: 81.8463 },
  { name: 'Coimbatore', sanskrit: 'कोयंबटूर', latitude: 11.0168, longitude: 76.9558 },
  { name: 'Jabalpur', sanskrit: 'जबलपुर', latitude: 23.1815, longitude: 79.9864 },
  { name: 'Gwalior', sanskrit: 'ग्वालियर', latitude: 26.2183, longitude: 78.1828 },
  { name: 'Vijayawada', sanskrit: 'विजयवाड़ा', latitude: 16.5062, longitude: 80.6480 },
  { name: 'Madurai', sanskrit: 'मदुरै', latitude: 9.9252, longitude: 78.1198 },
  { name: 'Guwahati', sanskrit: 'गुवाहाटी', latitude: 26.1445, longitude: 91.7362 },
  { name: 'Chandigarh', sanskrit: 'चंडीगढ़', latitude: 30.7333, longitude: 76.7794 },
  { name: 'Hubli-Dharwad', sanskrit: 'हुबली-धारवाड़', latitude: 15.3647, longitude: 75.1240 },
  { name: 'Amroha', sanskrit: 'अमरोहा', latitude: 28.9034, longitude: 78.4677 },
  { name: 'Moradabad', sanskrit: 'मुरादाबाद', latitude: 28.8386, longitude: 78.7733 },
  { name: 'Mysore', sanskrit: 'मैसूर', latitude: 12.2958, longitude: 76.6394 },
  { name: 'Bareilly', sanskrit: 'बरेली', latitude: 28.3670, longitude: 79.4304 },
  { name: 'Gurgaon', sanskrit: 'गुड़गांव', latitude: 28.4595, longitude: 77.0266 },
  { name: 'Aligarh', sanskrit: 'अलीगढ़', latitude: 27.8974, longitude: 78.0880 },
  { name: 'Jalandhar', sanskrit: 'जालंधर', latitude: 31.3260, longitude: 75.5762 },
  { name: 'Tiruchirappalli', sanskrit: 'तिरुचिरापल्ली', latitude: 10.7905, longitude: 78.7047 },
  { name: 'Bhubaneswar', sanskrit: 'भुवनेश्वर', latitude: 20.2961, longitude: 85.8245 },
  { name: 'Salem', sanskrit: 'सेलम', latitude: 11.6643, longitude: 78.1460 },
  { name: 'Mira-Bhayandar', sanskrit: 'मीरा-भायंदर', latitude: 19.2952, longitude: 72.8544 },
  { name: 'Warangal', sanskrit: 'वारंगल', latitude: 17.9689, longitude: 79.5941 },
  { name: 'Thiruvananthapuram', sanskrit: 'तिरुवनंतपुरम', latitude: 8.5241, longitude: 76.9366 },
  { name: 'Guntur', sanskrit: 'गुंटूर', latitude: 16.3067, longitude: 80.4365 },
  { name: 'Bhiwandi', sanskrit: 'भिवंडी', latitude: 19.3002, longitude: 73.0588 },
  { name: 'Saharanpur', sanskrit: 'सहारनपुर', latitude: 29.9680, longitude: 77.5552 },
  { name: 'Gorakhpur', sanskrit: 'गोरखपुर', latitude: 26.7606, longitude: 83.3732 },
  { name: 'Bikaner', sanskrit: 'बीकानेर', latitude: 28.0229, longitude: 73.3119 },
  { name: 'Amravati', sanskrit: 'अमरावती', latitude: 20.9374, longitude: 77.7796 },
  { name: 'Noida', sanskrit: 'नोएडा', latitude: 28.5355, longitude: 77.3910 },
  { name: 'Jamshedpur', sanskrit: 'जमशेदपुर', latitude: 22.8046, longitude: 86.2029 },
  { name: 'Bhilai', sanskrit: 'भिलाई', latitude: 21.1938, longitude: 81.3509 },
  { name: 'Cuttack', sanskrit: 'कटक', latitude: 20.4625, longitude: 85.8828 },
  { name: 'Firozabad', sanskrit: 'फिरोजाबाद', latitude: 27.1592, longitude: 78.3957 },
  { name: 'Kochi', sanskrit: 'कोच्चि', latitude: 9.9312, longitude: 76.2673 },
  { name: 'Nellore', sanskrit: 'नेल्लोर', latitude: 14.4426, longitude: 79.9865 },
  { name: 'Bhavnagar', sanskrit: 'भावनगर', latitude: 21.7645, longitude: 72.1519 },
  { name: 'Dehradun', sanskrit: 'देहरादून', latitude: 30.3165, longitude: 78.0322 },
  { name: 'Durgapur', sanskrit: 'दुर्गापुर', latitude: 23.5204, longitude: 87.3119 },
  { name: 'Asansol', sanskrit: 'आसनसोल', latitude: 23.6739, longitude: 86.9524 },
  { name: 'Rourkela', sanskrit: 'राउरकेला', latitude: 22.2604, longitude: 84.8536 },
  { name: 'Nanded', sanskrit: 'नांदेड़', latitude: 19.1383, longitude: 77.3210 },
  { name: 'Kolhapur', sanskrit: 'कोल्हापुर', latitude: 16.7050, longitude: 74.2433 },
  { name: 'Ajmer', sanskrit: 'अजमेर', latitude: 26.4499, longitude: 74.6399 },
  { name: 'Akola', sanskrit: 'अकोला', latitude: 20.7002, longitude: 77.0082 },
  { name: 'Gulbarga', sanskrit: 'गुलबर्गा', latitude: 17.3297, longitude: 76.8343 },
  { name: 'Jamnagar', sanskrit: 'जामनगर', latitude: 22.4707, longitude: 70.0577 },
  { name: 'Ujjain', sanskrit: 'उज्जैन', latitude: 23.1765, longitude: 75.7885 },
  { name: 'Loni', sanskrit: 'लोनी', latitude: 28.7333, longitude: 77.2833 },
  { name: 'Siliguri', sanskrit: 'सिलीगुड़ी', latitude: 26.7271, longitude: 88.3953 },
  { name: 'Jhansi', sanskrit: 'झांसी', latitude: 25.4484, longitude: 78.5685 },
  { name: 'Ulhasnagar', sanskrit: 'उल्हासनगर', latitude: 19.2215, longitude: 73.1645 },
  { name: 'Jammu', sanskrit: 'जम्मू', latitude: 32.7266, longitude: 74.8570 },
  { name: 'Sangli-Miraj & Kupwad', sanskrit: 'सांगली-मिराज और कुपवाड', latitude: 16.8524, longitude: 74.5815 },
  { name: 'Mangalore', sanskrit: 'मंगलौर', latitude: 12.9141, longitude: 74.8560 },
  { name: 'Erode', sanskrit: 'इरोड', latitude: 11.3410, longitude: 77.7172 },
  { name: 'Belgaum', sanskrit: 'बेलगाम', latitude: 15.8497, longitude: 74.4977 },
  { name: 'Ambattur', sanskrit: 'अम्बत्तूर', latitude: 13.1143, longitude: 80.1548 },
  { name: 'Tirunelveli', sanskrit: 'तिरुनेलवेली', latitude: 8.7139, longitude: 77.7567 },
  { name: 'Malegaon', sanskrit: 'मालेगांव', latitude: 20.5579, longitude: 74.5287 },
  { name: 'Gaya', sanskrit: 'गया', latitude: 24.7914, longitude: 85.0002 },
  { name: 'Jalgaon', sanskrit: 'जलगांव', latitude: 21.0077, longitude: 75.5626 },
  { name: 'Udaipur', sanskrit: 'उदयपुर', latitude: 24.5854, longitude: 73.7125 },
  { name: 'Maheshtala', sanskrit: 'महेशताला', latitude: 22.5050, longitude: 88.2481 }
];

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState(INDIAN_CITIES.slice(0, 10));
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCities(INDIAN_CITIES.slice(0, 10));
    } else {
      const filtered = INDIAN_CITIES.filter(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.sanskrit.includes(searchTerm)
      ).slice(0, 10);
      setFilteredCities(filtered);
    }
  }, [searchTerm]);

  const handleCitySelect = (city: typeof INDIAN_CITIES[0]) => {
    onLocationSelect({
      latitude: city.latitude,
      longitude: city.longitude,
      city: language === 'sanskrit' ? city.sanskrit : city.name
    });
    setSearchTerm(language === 'sanskrit' ? city.sanskrit : city.name);
    setShowSuggestions(false);
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

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={language === 'sanskrit' ? 'शहर खोजें...' : 'Search city...'}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10"
          />
          
          {showSuggestions && filteredCities.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredCities.map((city, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-saffron-50 cursor-pointer flex justify-between items-center"
                  onClick={() => handleCitySelect(city)}
                >
                  <span className="font-medium">
                    {language === 'sanskrit' ? city.sanskrit : city.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleLocationDetection} 
          variant="outline" 
          className="px-3"
          title={language === 'sanskrit' ? 'वर्तमान स्थान' : 'Current Location'}
        >
          <MapPinIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LocationSearch;
