
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, MapPinIcon, SunIcon, MoonIcon, StarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { calculatePanchang, calculateShivVaas, getShivaPujaTime, type PanchangData, type ShivVaasData } from '@/utils/astronomicalUtils';

const ShivVaasCalculator = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [location, setLocation] = useState({ latitude: 28.6139, longitude: 77.2090, city: 'New Delhi' });
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);
  const [shivVaasData, setShivVaasData] = useState<ShivVaasData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const panchang = calculatePanchang(selectedDate, location.latitude, location.longitude);
    const shivVaas = calculateShivVaas(selectedDate);
    setPanchangData(panchang);
    setShivVaasData(shivVaas);
  }, [selectedDate, location]);

  const pujaTime = getShivaPujaTime(currentTime);

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: 'Current Location'
          });
        },
        (error) => {
          console.error('Location detection failed:', error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-orange-50 to-red-50 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-saffron-500 to-orange-600 rounded-full mb-4 animate-shine">
          <span className="text-2xl text-white">🕉️</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">शिव वास कैलकुलेटर</h1>
        <p className="text-gray-600">Indian Panchang & Swiss Ephemeris</p>
      </div>

      {/* Current Time and Puja Time */}
      <Card className="mb-6 bg-gradient-to-r from-temple-100 to-saffron-100 border-saffron-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">वर्तमान समय</p>
              <p className="text-lg font-bold text-orange-800">{format(currentTime, 'HH:mm:ss')}</p>
              <p className="text-sm text-gray-600">{format(currentTime, 'dd/MM/yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">पूजा काल</p>
              <p className="text-lg font-bold text-orange-800">{pujaTime.time}</p>
              <p className="text-xs text-gray-600">{pujaTime.significance}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date and Location Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              तिथि चयन
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="mb-4"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5" />
              स्थान
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>शहर: {location.city}</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="अक्षांश"
                  value={location.latitude}
                  onChange={(e) => setLocation(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
                />
                <Input
                  placeholder="देशांतर"
                  value={location.longitude}
                  onChange={(e) => setLocation(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <Button onClick={handleLocationDetection} variant="outline" className="w-full">
                वर्तमान स्थान
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shiv Vaas Information */}
      {shivVaasData && (
        <Card className={`mb-6 ${shivVaasData.isShivVaas ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 'bg-gray-50'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🔱</span>
              शिव वास स्थिति
            </CardTitle>
          </CardHeader>
          <CardContent>
            {shivVaasData.isShivVaas ? (
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-100 rounded-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-2">{shivVaasData.type}</h3>
                  <p className="text-green-700">{shivVaasData.significance}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">व्रत काल:</h4>
                  <p className="text-gray-700">
                    {format(shivVaasData.startTime, 'dd/MM/yyyy HH:mm')} से {format(shivVaasData.endTime, 'dd/MM/yyyy HH:mm')} तक
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">पालनीय नियम:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {shivVaasData.observances.map((observance, index) => (
                      <li key={index} className="text-gray-700">{observance}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-600">आज शिव वास नहीं है</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Panchang Data */}
      {panchangData && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StarIcon className="w-5 h-5" />
              पंचांग विवरण - {format(selectedDate, 'dd MMMM yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-3 bg-saffron-50 rounded-lg">
                  <h4 className="font-semibold text-saffron-800">तिथि</h4>
                  <p className="text-saffron-700">{panchangData.tithi}</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">नक्षत्र</h4>
                  <p className="text-blue-700">{panchangData.nakshatra}</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">योग</h4>
                  <p className="text-green-700">{panchangData.yoga}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 flex items-center gap-2">
                    <SunIcon className="w-4 h-4" />
                    सूर्योदय/अस्त
                  </h4>
                  <p className="text-orange-700">
                    {format(panchangData.sunrise, 'HH:mm')} / {format(panchangData.sunset, 'HH:mm')}
                  </p>
                </div>
                
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 flex items-center gap-2">
                    <MoonIcon className="w-4 h-4" />
                    चंद्रोदय/अस्त
                  </h4>
                  <p className="text-indigo-700">
                    {format(panchangData.moonrise, 'HH:mm')} / {format(panchangData.moonset, 'HH:mm')}
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800">राहु काल</h4>
                  <p className="text-red-700">{panchangData.rahu}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800">यमघंटा</h4>
                <p className="text-purple-700">{panchangData.yamaghanta}</p>
              </div>
              
              <div className="p-3 bg-teal-50 rounded-lg">
                <h4 className="font-semibold text-teal-800">अभिजित</h4>
                <p className="text-teal-700">{panchangData.abhijit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shiva Mantras */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center">शिव मंत्र</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">महामृत्युंजय मंत्र</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।<br/>
                उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2">शिव पञ्चाक्षर मंत्र</h4>
              <p className="text-gray-700 text-sm">
                ॐ नमः शिवाय
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-600 text-sm">
        <p>हर हर महादेव 🙏</p>
        <p className="mt-2">Based on Indian Panchang & Swiss Ephemeris calculations</p>
      </div>
    </div>
  );
};

export default ShivVaasCalculator;
