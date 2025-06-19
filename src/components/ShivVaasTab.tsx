
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { InfoIcon } from 'lucide-react';
import { format } from 'date-fns';

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

interface ShivVaasTabProps {
  shivVaasData: AccurateShivVaasData | null;
  specificTime: Date | null;
  useSpecificTime: boolean;
  language: 'sanskrit' | 'english';
}

const ShivVaasTab = ({ shivVaasData, specificTime, useSpecificTime, language }: ShivVaasTabProps) => {
  const texts = {
    sanskrit: {
      shivVaasDetails: 'शिव वास विवरण',
      tithiDetails: 'तिथि विवरण',
      sunriseTime: 'सूर्योदय काल',
      favorableActivities: 'अनुकूल कार्य',
      avoidActivities: 'बचने योग्य कार्य',
      tithi: 'तिथि',
      specificTime: 'विशिष्ट समय'
    },
    english: {
      shivVaasDetails: 'Shiv Vaas Details',
      tithiDetails: 'Tithi Details',
      sunriseTime: 'Sunrise Time',
      favorableActivities: 'Favorable Activities',
      avoidActivities: 'Activities to Avoid',
      tithi: 'Tithi',
      specificTime: 'Specific Time'
    }
  };

  const t = texts[language];

  if (!shivVaasData) return null;

  return (
    <Card className={`${shivVaasData.shivVaasIndex === 7 ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'}`}>
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
  );
};

export default ShivVaasTab;
