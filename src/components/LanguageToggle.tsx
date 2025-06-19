
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { LanguagesIcon } from 'lucide-react';

interface LanguageToggleProps {
  language: 'sanskrit' | 'english';
  onLanguageChange: (language: 'sanskrit' | 'english') => void;
}

const LanguageToggle = ({ language, onLanguageChange }: LanguageToggleProps) => {
  const texts = {
    sanskrit: { language: 'भाषा' },
    english: { language: 'Language' }
  };

  const t = texts[language];

  return (
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
              onCheckedChange={(checked) => onLanguageChange(checked ? 'sanskrit' : 'english')}
            />
            <span className={`text-sm ${language === 'sanskrit' ? 'font-bold text-blue-800' : 'text-blue-600'}`}>
              हिंदी
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageToggle;
