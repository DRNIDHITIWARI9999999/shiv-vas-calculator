
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StarIcon, SunIcon, MoonIcon } from 'lucide-react';
import { format } from 'date-fns';

interface PanchangData {
  tithi: string;
  tithiNumber: number;
  nakshatra: string;
  yoga: string;
  sunrise: Date;
  sunset: Date;
  moonrise: Date;
  moonset: Date;
  rahu: string;
  yamaghanta: string;
  abhijit: string;
}

interface PanchangTabProps {
  panchangData: (PanchangData & { accurateData: any }) | null;
  selectedDate: Date;
  language: 'sanskrit' | 'english';
}

const PanchangTab = ({ panchangData, selectedDate, language }: PanchangTabProps) => {
  const texts = {
    sanskrit: {
      accuratePanchang: 'पंचांग विवरण',
      tithi: 'तिथि',
      nakshatra: 'नक्षत्र',
      yoga: 'योग',
      sunriseSunset: 'सूर्योदय/अस्त',
      moonriseMoonset: 'चंद्रोदय/अस्त',
      rahuKaal: 'राहु काल',
      yamaghanta: 'यमघंटा',
      abhijit: 'अभिजित'
    },
    english: {
      accuratePanchang: 'Panchang Details',
      tithi: 'Tithi',
      nakshatra: 'Nakshatra',
      yoga: 'Yoga',
      sunriseSunset: 'Sunrise/Sunset',
      moonriseMoonset: 'Moonrise/Moonset',
      rahuKaal: 'Rahu Kaal',
      yamaghanta: 'Yamaghanta',
      abhijit: 'Abhijit'
    }
  };

  const t = texts[language];

  if (!panchangData) return null;

  return (
    <Card className="bg-gradient-to-r from-yellow-50 to-saffron-50 border-saffron-200">
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
  );
};

export default PanchangTab;
