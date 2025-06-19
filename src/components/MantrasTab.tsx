
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface MantrasTabProps {
  language: 'sanskrit' | 'english';
}

const MantrasTab = ({ language }: MantrasTabProps) => {
  const texts = {
    sanskrit: {
      shivaMantras: 'शिव मंत्र',
      mahamrityunjaya: 'महामृत्युंजय मंत्र',
      panchakshar: 'शिव पञ्चाक्षर मंत्र',
      harHarMahadev: 'हर हर महादेव मंत्र'
    },
    english: {
      shivaMantras: 'Shiva Mantras',
      mahamrityunjaya: 'Mahamrityunjaya Mantra',
      panchakshar: 'Shiva Panchakshar Mantra',
      harHarMahadev: 'Har Har Mahadev Mantra'
    }
  };

  const t = texts[language];

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-center text-xl text-purple-800">{t.shivaMantras}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 text-center">
          <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-saffron-400">
            <h4 className="font-semibold mb-4 text-saffron-800 text-lg">{t.mahamrityunjaya}</h4>
            <p className="text-blue-700 text-base leading-relaxed mb-4">
              ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।<br/>
              उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥
            </p>
            <p className="text-gray-600 text-sm italic">
              {language === 'sanskrit' 
                ? 'महामृत्युंजय मंत्र मृत्यु पर विजय दिलाता है और स्वास्थ्य एवं दीर्घायु प्रदान करता है।'
                : 'The Mahamrityunjaya Mantra conquers death and grants health and longevity.'
              }
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-orange-400">
            <h4 className="font-semibold mb-4 text-orange-800 text-lg">{t.panchakshar}</h4>
            <p className="text-blue-700 text-2xl font-semibold mb-4">
              ॐ नमः शिवाय
            </p>
            <p className="text-gray-600 text-sm italic">
              {language === 'sanskrit' 
                ? 'पञ्चाक्षर मंत्र शिव का सबसे पवित्र मंत्र है जो मोक्ष प्रदान करता है।'
                : 'The Panchakshar Mantra is the most sacred mantra of Shiva that grants liberation.'
              }
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-red-400">
            <h4 className="font-semibold mb-4 text-red-800 text-lg">{t.harHarMahadev}</h4>
            <p className="text-blue-700 text-2xl font-semibold mb-4">
              हर हर महादेव 🙏
            </p>
            <p className="text-gray-600 text-sm italic">
              {language === 'sanskrit' 
                ? 'हर हर महादेव का जाप भगवान शिव की जय-जयकार है और सभी कष्टों का हरण करता है।'
                : 'Har Har Mahadev is a victory chant for Lord Shiva that removes all sufferings.'
              }
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-indigo-400">
            <h4 className="font-semibold mb-4 text-indigo-800 text-lg">
              {language === 'sanskrit' ? 'शिव गायत्री मंत्र' : 'Shiva Gayatri Mantra'}
            </h4>
            <p className="text-blue-700 text-base leading-relaxed mb-4">
              ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि।<br/>
              तन्नो रुद्रः प्रचोदयात्॥
            </p>
            <p className="text-gray-600 text-sm italic">
              {language === 'sanskrit' 
                ? 'शिव गायत्री मंत्र ज्ञान और आध्यात्मिक शक्ति प्रदान करता है।'
                : 'The Shiva Gayatri Mantra grants wisdom and spiritual power.'
              }
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-teal-400">
            <h4 className="font-semibold mb-4 text-teal-800 text-lg">
              {language === 'sanskrit' ? 'शिव आरती' : 'Shiva Aarti'}
            </h4>
            <p className="text-blue-700 text-sm leading-relaxed mb-4">
              जय शिव ओंकारा, हर हर ओंकारा।<br/>
              ब्रह्मा विष्णु सदाशिव, अर्धांगी धारा॥<br/>
              एकानन चतुरानन पंचानन राजे।<br/>
              हंसासन गरुड़ासन वृषवाहन साजे॥
            </p>
            <p className="text-gray-600 text-sm italic">
              {language === 'sanskrit' 
                ? 'शिव आरती भगवान शिव की स्तुति और आराधना के लिए गायी जाती है।'
                : 'Shiva Aarti is sung for the praise and worship of Lord Shiva.'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MantrasTab;
