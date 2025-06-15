import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon, ClockIcon, SunIcon, MoonIcon, StarIcon, InfoIcon, LanguagesIcon, GlobeIcon, MenuIcon, ShieldIcon } from 'lucide-react';
import { format } from 'date-fns';
import { calculateAccuratePanchang, calculateAccurateShivVaas, getShivaPujaTime, type PanchangData } from '@/utils/astronomicalUtils';
import LocationSearch from './LocationSearch';
import AppDrawer from './AppDrawer';
import { validateDate, validateTime, validateCoordinates } from '@/utils/securityUtils';

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

  // Add input validation for date changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (validateDate(dateValue)) {
      setSelectedDate(new Date(dateValue));
    }
  };

  // Add validation for time input
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

  // Add validation for location updates
  const handleLocationSelect = (newLocation: { latitude: number; longitude: number; city: string }) => {
    if (validateCoordinates(newLocation.latitude, newLocation.longitude)) {
      setLocation(newLocation);
    } else {
      console.error('Invalid coordinates provided:', newLocation);
    }
  };

  const texts = {
    sanskrit: {
      title: 'शिव वास कैलकुलेटर',
      subtitle: 'सटीक खगोलीय गणना आधारित',
      calculating: '🔄 सटीक खगोलीय डेटा की गणना...',
      currentTime: 'वर्तमान समय',
      pujaTime: 'पूजा काल',
      dateSelection: 'तिथि चयन',
      location: 'स्थान',
      language: 'भाषा',
      specificTime: 'विशिष्ट समय',
      useSpecificTimeLabel: 'विशिष्ट समय का उपयोग करें',
      specificTimeHelper: 'सूर्योदय के बजाय विशिष्ट समय पर तिथि की गणना',
      shivVaasDetails: 'शिव वास विवरण',
      tithiDetails: 'तिथि विवरण',
      sunriseTime: 'सूर्योदय काल',
      favorableActivities: 'अनुकूल कार्य',
      avoidActivities: 'बचने योग्य कार्य',
      accuratePanchang: 'सटीक पंचांग विवरण',
      tithi: 'तिथि',
      nakshatra: 'नक्षत्र',
      yoga: 'योग',
      sunriseSunset: 'सूर्योदय/अस्त',
      moonriseMoonset: 'चंद्रोदय/अस्त',
      rahuKaal: 'राहु काल',
      yamaghanta: 'यमघंटा',
      abhijit: 'अभिजित',
      shivaMantras: 'शिव मंत्र',
      mahamrityunjaya: 'महामृत्युंजय मंत्र',
      panchakshar: 'शिव पञ्चाक्षर मंत्र',
      footer: 'हर हर महादेव 🙏',
      poweredBy: 'सटीक खगोलीय गणना द्वारा संचालित',
      menu: 'मेन्यू'
    },
    english: {
      title: 'Shiv Vaas Calculator',
      subtitle: 'Accurate Astronomical Calculations Based',
      calculating: '🔄 Calculating precise astronomical data...',
      currentTime: 'Current Time',
      pujaTime: 'Puja Time',
      dateSelection: 'Date Selection',
      location: 'Location',
      language: 'Language',
      specificTime: 'Specific Time',
      useSpecificTimeLabel: 'Use Specific Time',
      specificTimeHelper: 'Calculate tithi at specific time instead of sunrise',
      shivVaasDetails: 'Shiv Vaas Details',
      tithiDetails: 'Tithi Details',
      sunriseTime: 'Sunrise Time',
      favorableActivities: 'Favorable Activities',
      avoidActivities: 'Activities to Avoid',
      accuratePanchang: 'Accurate Panchang Details',
      tithi: 'Tithi',
      nakshatra: 'Nakshatra',
      yoga: 'Yoga',
      sunriseSunset: 'Sunrise/Sunset',
      moonriseMoonset: 'Moonrise/Moonset',
      rahuKaal: 'Rahu Kaal',
      yamaghanta: 'Yamaghanta',
      abhijit: 'Abhijit',
      shivaMantras: 'Shiva Mantras',
      mahamrityunjaya: 'Mahamrityunjaya Mantra',
      panchakshar: 'Shiva Panchakshar Mantra',
      footer: 'Har Har Mahadev 🙏',
      poweredBy: 'Powered by Accurate Astronomical Calculations',
      menu: 'Menu'
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-orange-50 to-red-50 p-4">
      {/* Header with Menu */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2"
        >
          <MenuIcon className="w-4 h-4" />
          {t.menu}
        </Button>
        
        <div className="text-center flex-1">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-saffron-500 to-orange-600 rounded-full mb-2 animate-shine">
            <span className="text-2xl text-white">🕉️</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-600 text-sm">{t.subtitle}</p>
        </div>
        
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {isCalculating && (
        <div className="text-center mb-4">
          <p className="text-sm text-orange-600">{t.calculating}</p>
        </div>
      )}

      {/* Language Toggle */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-4">
            <LanguagesIcon className="w-5 h-5 text-blue-600" />
            <Label className="text-blue-800">{t.language}:</Label>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${language === 'english' ? 'font-bold text-blue-800' : 'text-blue-600'}`}>
                English
              </span>
              <Switch
                checked={language === 'sanskrit'}
                onCheckedChange={(checked) => setLanguage(checked ? 'sanskrit' : 'english')}
              />
              <span className={`text-sm ${language === 'sanskrit' ? 'font-bold text-blue-800' : 'text-blue-600'}`}>
                हिंदी
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Time and Puja Time */}
      <Card className="mb-6 bg-gradient-to-r from-temple-100 to-saffron-100 border-saffron-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">{t.currentTime}</p>
              <p className="text-lg font-bold text-orange-800">{format(currentTime, 'HH:mm:ss')}</p>
              <p className="text-sm text-gray-600">{format(currentTime, 'dd/MM/yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">{t.pujaTime}</p>
              <p className="text-lg font-bold text-orange-800">{pujaTime.time}</p>
              <p className="text-xs text-gray-600">{pujaTime.significance}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date, Location, and Time Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              {t.dateSelection}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={handleDateChange}
              className="mb-4"
              min="1900-01-01"
              max="2100-12-31"
            />
            
            {/* Specific Time Option */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={useSpecificTime}
                  onCheckedChange={setUseSpecificTime}
                />
                <Label className="text-sm">{t.useSpecificTimeLabel}</Label>
              </div>
              
              {useSpecificTime && (
                <div>
                  <Label className="text-xs text-gray-600 mb-2 block">
                    {t.specificTimeHelper}
                  </Label>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-gray-500" />
                    <Input
                      type="time"
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className="flex-1"
                      min="00:00"
                      max="23:59"
                    />
                  </div>
                  {specificTime && (
                    <p className="text-xs text-blue-600 mt-1">
                      {t.specificTime}: {format(specificTime, 'HH:mm')}
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GlobeIcon className="w-5 h-5" />
              {t.location}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>{language === 'sanskrit' ? 'शहर' : 'City'}: {location.city}</Label>
              <LocationSearch 
                onLocationSelect={handleLocationSelect}
                language={language}
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-xs text-gray-600">
                  {language === 'sanskrit' ? 'अक्षांश' : 'Latitude'}: {location.latitude.toFixed(4)}
                </div>
                <div className="text-xs text-gray-600">
                  {language === 'sanskrit' ? 'देशांतर' : 'Longitude'}: {location.longitude.toFixed(4)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accurate Shiv Vaas Information */}
      {shivVaasData && (
        <Card className={`mb-6 ${shivVaasData.shivVaasIndex === 7 ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🔱</span>
              {t.shivVaasDetails}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`text-center p-4 rounded-lg ${shivVaasData.shivVaasIndex === 7 ? 'bg-red-100' : 'bg-green-100'}`}>
                <h3 className={`text-xl font-bold mb-2 ${shivVaasData.shivVaasIndex === 7 ? 'text-red-800' : 'text-green-800'}`}>
                  {language === 'sanskrit' ? shivVaasData.location.sanskrit : shivVaasData.location.english}
                </h3>
                <p className={shivVaasData.shivVaasIndex === 7 ? 'text-red-700' : 'text-green-700'}>
                  {language === 'sanskrit' ? shivVaasData.location.significance.sanskrit : shivVaasData.location.significance.english}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <InfoIcon className="w-4 h-4" />
                    {t.tithiDetails}:
                  </h4>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-700">{t.tithi}: {shivVaasData.tithiDetails.name}</p>
                    <p className="text-blue-700">{language === 'sanskrit' ? 'संख्या' : 'Number'}: {shivVaasData.tithiDetails.number}</p>
                    <p className="text-blue-700">{language === 'sanskrit' ? 'पक्ष' : 'Paksha'}: {shivVaasData.tithiDetails.paksha}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t.sunriseTime}:</h4>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-orange-700">
                      {format(shivVaasData.sunriseTime, 'dd/MM/yyyy HH:mm:ss')}
                    </p>
                    {useSpecificTime && specificTime && (
                      <p className="text-orange-600 text-sm mt-1">
                        {t.specificTime}: {format(specificTime, 'dd/MM/yyyy HH:mm')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  {shivVaasData.shivVaasIndex === 7 ? t.avoidActivities : t.favorableActivities}:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {(language === 'sanskrit' ? shivVaasData.location.activities.sanskrit : shivVaasData.location.activities.english).map((activity, index) => (
                    <li key={index} className={shivVaasData.shivVaasIndex === 7 ? 'text-red-700' : 'text-green-700'}>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accurate Panchang Data */}
      {panchangData && (
        <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-saffron-50 border-saffron-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StarIcon className="w-5 h-5" />
              {t.accuratePanchang} - {format(selectedDate, 'dd MMMM yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-3 bg-saffron-50 rounded-lg border-l-4 border-saffron-400">
                  <h4 className="font-semibold text-saffron-800">{t.tithi}</h4>
                  <p className="text-saffron-700">{panchangData.tithi}</p>
                  <p className="text-xs text-saffron-600">{language === 'sanskrit' ? 'संख्या' : 'Number'}: {panchangData.tithiNumber}</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-800">{t.nakshatra}</h4>
                  <p className="text-blue-700">{panchangData.nakshatra}</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-800">{t.yoga}</h4>
                  <p className="text-green-700">{panchangData.yoga}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <h4 className="font-semibold text-orange-800 flex items-center gap-2">
                    <SunIcon className="w-4 h-4" />
                    {t.sunriseSunset}
                  </h4>
                  <p className="text-orange-700">
                    {format(panchangData.sunrise, 'HH:mm:ss')} / {format(panchangData.sunset, 'HH:mm:ss')}
                  </p>
                </div>
                
                <div className="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                  <h4 className="font-semibold text-indigo-800 flex items-center gap-2">
                    <MoonIcon className="w-4 h-4" />
                    {t.moonriseMoonset}
                  </h4>
                  <p className="text-indigo-700">
                    {format(panchangData.moonrise, 'HH:mm')} / {format(panchangData.moonset, 'HH:mm')}
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-800">{t.rahuKaal}</h4>
                  <p className="text-red-700">{panchangData.rahu}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-800">{t.yamaghanta}</h4>
                <p className="text-purple-700">{panchangData.yamaghanta}</p>
              </div>
              
              <div className="p-3 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                <h4 className="font-semibold text-teal-800">{t.abhijit}</h4>
                <p className="text-teal-700">{panchangData.abhijit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shiva Mantras */}
      <Card className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center text-xl text-purple-800">{t.shivaMantras}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-saffron-400">
              <h4 className="font-semibold mb-2 text-saffron-800">{t.mahamrityunjaya}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।<br/>
                उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-orange-400">
              <h4 className="font-semibold mb-2 text-orange-800">{t.panchakshar}</h4>
              <p className="text-gray-700 text-lg font-semibold">
                ॐ नमः शिवाय
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-600 text-sm">
        <p className="text-lg mb-2">{t.footer}</p>
        <p>{t.poweredBy}</p>
      </div>

      {/* App Drawer */}
      <AppDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} language={language} />
    </div>
  );
};

export default ShivVaasCalculator;
