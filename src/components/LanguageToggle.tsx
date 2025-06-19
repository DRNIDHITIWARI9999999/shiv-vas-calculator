import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { LanguagesIcon } from 'lucide-react';
interface LanguageToggleProps {
  language: 'sanskrit' | 'english';
  onLanguageChange: (language: 'sanskrit' | 'english') => void;
}
const LanguageToggle = ({
  language,
  onLanguageChange
}: LanguageToggleProps) => {
  const texts = {
    sanskrit: {
      narration: 'शिव पूजा, रुद्राभिषेक, या महामृत्युंजय अनुष्ठान जैसे अनुष्ठानों में शिव वास का विचार अत्यधिक महत्वपूर्ण माना जाता है। शास्त्रों के अनुसार, शिव वास उस स्थान को दर्शाता है जहाँ भगवान शिव किसी समय निवास करते हैं और वे क्या कार्य कर रहे हैं, जिससे यह निर्धारित करने में सहायता मिलती है कि वह अवधि आध्यात्मिक/भौतिक रूप से पूजा के लिए उपयुक्त है या नहीं।'
    },
    english: {
      narration: 'In rituals such as Shiva Puja, Rudrabhishek, or Mahamrityunjaya Anushthan, considering Shiv Vaas is considered highly important. As per the scriptures, Shiv Vaas reflects the place where Lord Shiva resides at a given time and what he is engaged in, helping determine whether that period is spiritually/materialistically suitable for worship.'
    }
  };
  const t = texts[language];
  return <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-blue-700 leading-relaxed text-justify font-bold">
              {t.narration}
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <LanguagesIcon className="w-5 h-5 text-blue-600" />
            <div className="flex items-center gap-2">
              <span className={`text-sm ${language === 'english' ? 'font-bold text-blue-800' : 'text-blue-600'}`}>
                English
              </span>
              <Switch checked={language === 'sanskrit'} onCheckedChange={checked => onLanguageChange(checked ? 'sanskrit' : 'english')} />
              <span className={`text-sm ${language === 'sanskrit' ? 'font-bold text-blue-800' : 'text-blue-600'}`}>
                हिंदी
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default LanguageToggle;