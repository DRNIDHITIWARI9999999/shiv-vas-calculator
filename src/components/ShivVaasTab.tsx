
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
      tithi: 'तिथि',
      specificTime: 'विशिष्ट समय',
      shastricStatement: 'एकेन वासः कैलाशे द्वितीये गौरी सन्निधौ ।  तृतीये वृषभारुढ़ः सभायां च चतुष्टये । पंचमे भोजने चैव क्रीड़ायां च रसात्मके ।  श्मशाने सप्तशेषे च शिववासः उदीरितः ।।',
      formulaTitle: 'देवर्षि नारद जी द्वारा साझा किए गए सूत्र के अनुसार'
    },
    english: {
      shivVaasDetails: 'Shiv Vaas Details',
      tithiDetails: 'Tithi Details',
      sunriseTime: 'Sunrise Time',
      tithi: 'Tithi',
      specificTime: 'Specific Time',
      shastricStatement: 'एकेन वासः कैलाशे द्वितीये गौरी सन्निधौ ।  तृतीये वृषभारुढ़ः सभायां च चतुष्टये । पंचमे भोजने चैव क्रीड़ायां च रसात्मके ।  श्मशाने सप्तशेषे च शिववासः उदीरितः ।।',
      formulaTitle: 'By applying the formula shared by Devarshi Narad Ji'
    }
  };

  // Shastric statements for each Shiv Vaas location
  const shastricStatements = {
    1: {
      sanskrit: 'कैलाश वासी शिव का अनुष्ठान करने से सुख प्राप्ति होती है।',
      english: 'Performing rituals when Shiva resides at Kailash brings happiness and fulfillment.'
    },
    2: {
      sanskrit: 'गौरी-सानिध्य में रहने पर सुख-सम्पदा की प्राप्ति होती है।',
      english: 'When in the company of Gauri, one attains happiness and prosperity.'
    },
    3: {
      sanskrit: 'वृषारुढ़ शिव की विशेष उपासना से अभीष्ट की सिद्धि होती है।',
      english: 'Special worship of Shiva riding the bull fulfills desired objectives.'
    },
    4: {
      sanskrit: 'सभासद शिव पूजन से संताप होता है।',
      english: 'Worship of Shiva in assembly causes distress and suffering.'
    },
    5: {
      sanskrit: 'भोजन करते हुए शिव की आराधना पीड़ादायी है।',
      english: 'Worship of Shiva while He is eating causes pain and trouble.'
    },
    6: {
      sanskrit: 'क्रीड़ारत शिवाराधन भी कष्टकारी है।',
      english: 'Worship of Shiva while He is at play also causes difficulties.'
    },
    7: {
      sanskrit: 'श्मशानवासी शिवाराधन मरण या मरण तुल्य कष्ट देता है।',
      english: 'Worship of Shiva residing in cremation ground brings death or death-like suffering.'
    }
  };

  const t = texts[language];

  if (!shivVaasData) return null;

  const currentStatement = shastricStatements[shivVaasData.shivVaasIndex as keyof typeof shastricStatements];

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
          {/* Formula Section */}
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h4 className="font-semibold mb-3 text-indigo-800 flex items-center gap-2">
              <span className="text-lg">📖</span>
              {t.formulaTitle}:
            </h4>
            <div className="bg-white p-3 rounded border border-indigo-100 mb-3">
              <p className="text-indigo-900 font-medium text-center leading-relaxed">
                "तिथिं च द्विगुणी कृत्वा पुनः पञ्च समन्वितम । सप्तभिस्तुहरेद्भागम शेषं शिव वास उच्यते ।।"
              </p>
            </div>
            <p className="text-indigo-700 font-bold text-center">
              Shiv Vaas is, <strong>{shivVaasData.shivVaasIndex}</strong> - {language === 'sanskrit' ? shivVaasData.location.sanskrit : shivVaasData.location.english}
            </p>
          </div>

          <div className={`text-center p-4 rounded-lg ${shivVaasData.shivVaasIndex === 7 ? 'bg-red-100' : 'bg-green-100'}`}>
            <h3 className={`text-xl font-bold mb-2 ${shivVaasData.shivVaasIndex === 7 ? 'text-red-800' : 'text-green-800'}`}>
              {language === 'sanskrit' ? shivVaasData.location.sanskrit : shivVaasData.location.english}
            </h3>
            <p className={shivVaasData.shivVaasIndex === 7 ? 'text-red-700' : 'text-green-700'}>
              {language === 'sanskrit' ? shivVaasData.location.significance.sanskrit : shivVaasData.location.significance.english}
            </p>
          </div>

          {/* Shastric Statement Section - moved here, just below the abode */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-semibold mb-2 text-amber-800 flex items-center gap-2">
              <span className="text-lg">📜</span>
              {t.shastricStatement}
            </h4>
            <p className="text-amber-700 italic leading-relaxed">
              {currentStatement[language]}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ShivVaasTab;
