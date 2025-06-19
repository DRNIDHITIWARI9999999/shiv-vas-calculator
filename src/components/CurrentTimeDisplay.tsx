
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface CurrentTimeDisplayProps {
  currentTime: Date;
  pujaTime: { time: string; significance: string };
  language: 'sanskrit' | 'english';
}

const CurrentTimeDisplay = ({ currentTime, pujaTime, language }: CurrentTimeDisplayProps) => {
  const texts = {
    sanskrit: {
      currentTime: 'वर्तमान समय',
      pujaTime: 'पूजा काल'
    },
    english: {
      currentTime: 'Current Time',
      pujaTime: 'Puja Time'
    }
  };

  const t = texts[language];

  return (
    <Card className="mb-6 bg-gradient-to-r from-temple-100 to-saffron-100 border-saffron-200">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-blue-600">{t.currentTime}</p>
            <p className="text-lg font-bold text-orange-800">{format(currentTime, 'HH:mm:ss')}</p>
            <p className="text-sm text-blue-600">{format(currentTime, 'dd/MM/yyyy')}</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">{t.pujaTime}</p>
            <p className="text-lg font-bold text-orange-800">{pujaTime.time}</p>
            <p className="text-xs text-blue-600">{pujaTime.significance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentTimeDisplay;
