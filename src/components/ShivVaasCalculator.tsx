
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { calculateAccuratePanchang, calculateAccurateShivVaas, getShivaPujaTime, type PanchangData } from '@/utils/astronomicalUtils';
import AppDrawer from './AppDrawer';
import { validateDate, validateTime, validateCoordinates } from '@/utils/securityUtils';
import ShivVaasHeader from './ShivVaasHeader';
import LanguageToggle from './LanguageToggle';
import CurrentTimeDisplay from './CurrentTimeDisplay';
import DateTimeInput from './DateTimeInput';
import LocationInput from './LocationInput';
import ShivVaasTab from './ShivVaasTab';
import PanchangTab from './PanchangTab';
import MantrasTab from './MantrasTab';

interface AccurateShivVaasData {
  isShivVaas: boolean;
  type: string;
  startTime: Date;
  endTime: Date;
  significance: string;
  observances: string[];
  shivVaasIndex: number;
  location: {
    sanskrit: string;
    english: string;
    significance: {
      sanskrit: string;
      english: string;
    };
    activities: {
      sanskrit: string[];
      english: string[];
    };
  };
  sunriseTime: Date;
  tithiDetails: {
    name: string;
    number: number;
    paksha: string;
  };
}

const ShivVaasCalculator = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [specificTime, setSpecificTime] = useState<Date | null>(null);
  const [useSpecificTime, setUseSpecificTime] = useState(false);
  const [language, setLanguage] = useState<'sanskrit' | 'english'>('english');
  const [location, setLocation] = useState({ latitude: 28.6139, longitude: 77.2090, city: 'New Delhi' });
  const [panchangData, setPanchangData] = useState<(PanchangData & { accurateData: any }) | null>(null);
  const [shivVaasData, setShivVaasData] = useState<AccurateShivVaasData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCalculating, setIsCalculating] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateData = async () => {
      setIsCalculating(true);
      try {
        const calculationTime = useSpecificTime && specificTime ? specificTime : undefined;
        const panchang = calculateAccuratePanchang(selectedDate, location.latitude, location.longitude, language, calculationTime);
        const shivVaas = calculateAccurateShivVaas(selectedDate, location.latitude, location.longitude, language, calculationTime);
        setPanchangData(panchang);
        setShivVaasData(shivVaas);
      } catch (error) {
        console.error('Error calculating astronomical data:', error);
      } finally {
        setIsCalculating(false);
      }
    };

    calculateData();
  }, [selectedDate, location, language, useSpecificTime, specificTime]);

  const pujaTime = getShivaPujaTime(currentTime, language);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (validateDate(dateValue)) {
      setSelectedDate(new Date(dateValue));
    }
  };

  const handleTimeChange = (timeString: string) => {
    if (timeString && validateTime(timeString)) {
      const [hours, minutes] = timeString.split(':').map(Number);
      const newTime = new Date(selectedDate);
      newTime.setHours(hours, minutes, 0, 0);
      setSpecificTime(newTime);
    } else if (!timeString) {
      setSpecificTime(null);
    }
  };

  const handleLocationSelect = (newLocation: { latitude: number; longitude: number; city: string }) => {
    if (validateCoordinates(newLocation.latitude, newLocation.longitude)) {
      setLocation(newLocation);
    } else {
      console.error('Invalid coordinates provided:', newLocation);
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        if (validateCoordinates(latitude, longitude)) {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
              {
                headers: {
                  'User-Agent': 'ShivVaasCalculator/1.0.0'
                }
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              const cityName = data.address?.city || data.address?.town || data.address?.village || 'Current Location';
              
              setLocation({
                latitude,
                longitude,
                city: cityName
              });
            } else {
              setLocation({
                latitude,
                longitude,
                city: 'Current Location'
              });
            }
          } catch (error) {
            console.error('Error getting location name:', error);
            setLocation({
              latitude,
              longitude,
              city: 'Current Location'
            });
          }
        }
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const texts = {
    sanskrit: {
      calculating: '🔄 सटीक खगोलीय डेटा की गणना...',
      footer: 'हर हर महादेव 🙏',
      mantras: 'मंत्र',
      panchang: 'पंचांग',
      shivVaas: 'शिव वास'
    },
    english: {
      calculating: '🔄 Calculating precise astronomical data...',
      footer: 'Har Har Mahadev 🙏',
      mantras: 'Mantras',
      panchang: 'Panchang',
      shivVaas: 'Shiv Vaas'
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-orange-50 to-red-50 p-4">
      <ShivVaasHeader 
        onMenuClick={() => setIsDrawerOpen(true)} 
        language={language} 
      />

      {isCalculating && (
        <div className="text-center mb-4">
          <p className="text-sm text-orange-600">{t.calculating}</p>
        </div>
      )}

      <LanguageToggle 
        language={language} 
        onLanguageChange={setLanguage} 
      />

      <CurrentTimeDisplay 
        currentTime={currentTime} 
        pujaTime={pujaTime} 
        language={language} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DateTimeInput
          selectedDate={selectedDate}
          specificTime={specificTime}
          useSpecificTime={useSpecificTime}
          language={language}
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
          onUseSpecificTimeChange={setUseSpecificTime}
        />

        <LocationInput
          location={location}
          language={language}
          isGettingLocation={isGettingLocation}
          onLocationSelect={handleLocationSelect}
          onGetCurrentLocation={getCurrentLocation}
        />
      </div>

      <Tabs defaultValue="shivvaas" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shivvaas">{t.shivVaas}</TabsTrigger>
          <TabsTrigger value="panchang">{t.panchang}</TabsTrigger>
          <TabsTrigger value="mantras">{t.mantras}</TabsTrigger>
        </TabsList>

        <TabsContent value="shivvaas">
          <ShivVaasTab
            shivVaasData={shivVaasData}
            specificTime={specificTime}
            useSpecificTime={useSpecificTime}
            language={language}
          />
        </TabsContent>

        <TabsContent value="panchang">
          <PanchangTab
            panchangData={panchangData}
            selectedDate={selectedDate}
            language={language}
          />
        </TabsContent>

        <TabsContent value="mantras">
          <MantrasTab language={language} />
        </TabsContent>
      </Tabs>

      <div className="text-center mt-8 text-blue-600 text-sm">
        <p className="text-lg mb-2">{t.footer}</p>
        <p>Powered by The Universe</p>
      </div>

      <AppDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        language={language} 
      />
    </div>
  );
};

export default ShivVaasCalculator;
