
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { InfoIcon, BookOpenIcon, CalculatorIcon } from 'lucide-react';
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
    result: {
      sanskrit: string;
      english: string;
    };
  };
  sunriseTime: Date;
  tithiDetails: {
    name: string;
    number: number;
    paksha: string;
  };
  formula?: string;
  traditionalContext?: string;
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
      activities: 'अनुकूल/अनुचित कार्य',
      tithi: 'तिथि',
      specificTime: 'विशिष्ट समय',
      calculation: 'गणना विधि',
      traditionalWisdom: 'शास्त्रीय महत्व',
      result: 'फल'
    },
    english: {
      shivVaasDetails: 'Shiv Vaas Details',
      tithiDetails: 'Tithi Details',
      sunriseTime: 'Sunrise Time',
      activities: 'Recommended/Avoided Activities',
      tithi: 'Tithi',
      specificTime: 'Specific Time',
      calculation: 'Calculation Method',
      traditionalWisdom: 'Traditional Significance',
      result: 'Result'
    }
  };

  const t = texts[language];

  if (!shivVaasData) return null;

  // Determine card styling based on auspiciousness
  const isAuspicious = [1, 2, 3].includes(shivVaasData.shivVaasIndex);
  const isInauspicious = [4, 5, 6, 7].includes(shivVaasData.shivVaasIndex);
  
  const cardStyle = isAuspicious ? 
    'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
    isInauspicious ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' :
    'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';

  return (
    <Card className={cardStyle}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔱</span>
          {t.shivVaasDetails}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Traditional Context */}
          {shivVaasData.traditionalContext && (
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-800">
                <BookOpenIcon className="w-4 h-4" />
                {t.traditionalWisdom}
              </h4>
              <p className="text-blue-700 text-sm leading-relaxed">
                {shivVaasData.traditionalContext}
              </p>
            </div>
          )}

          {/* Calculation Formula */}
          {shivVaasData.formula && (
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-purple-800">
                <CalculatorIcon className="w-4 h-4" />
                {t.calculation}
              </h4>
              <p className="text-purple-700 font-mono text-sm">
                {shivVaasData.formula}
              </p>
              <p className="text-purple-600 text-xs mt-1">
                {language === 'sanskrit' ? 
                  'तिथिं च द्विगुणी कृत्वा पुनः पञ्च समन्वितम् । सप्तभिस्तुहरेद्भागम शेषं शिव वास उच्यते ।।' :
                  'Tithi × 2 + 5, divided by 7, remainder indicates Shiv Vaas location'
                }
              </p>
            </div>
          )}

          {/* Current Shiv Vaas Location */}
          <div className={`text-center p-6 rounded-lg ${
            isAuspicious ? 'bg-green-100' : 
            isInauspicious ? 'bg-red-100' : 'bg-yellow-100'
          }`}>
            <h3 className={`text-2xl font-bold mb-2 ${
              isAuspicious ? 'text-green-800' : 
              isInauspicious ? 'text-red-800' : 'text-yellow-800'
            }`}>
              {language === 'sanskrit' ? shivVaasData.location.sanskrit : shivVaasData.location.english}
            </h3>
            <p className={`text-lg font-semibold mb-2 ${
              isAuspicious ? 'text-green-700' : 
              isInauspicious ? 'text-red-700' : 'text-yellow-700'
            }`}>
              {t.result}: {shivVaasData.location.result[language]}
            </p>
            <p className={
              isAuspicious ? 'text-green-600' : 
              isInauspicious ? 'text-red-600' : 'text-yellow-600'
            }>
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
              {t.activities}:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {(language === 'sanskrit' ? shivVaasData.location.activities.sanskrit : shivVaasData.location.activities.english).map((activity, index) => (
                <li key={index} className={
                  isAuspicious ? 'text-green-700' : 
                  isInauspicious ? 'text-red-700' : 'text-yellow-700'
                }>
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
