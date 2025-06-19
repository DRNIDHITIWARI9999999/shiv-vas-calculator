
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { format } from 'date-fns';

interface DateTimeInputProps {
  selectedDate: Date;
  specificTime: Date | null;
  useSpecificTime: boolean;
  language: 'sanskrit' | 'english';
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (timeString: string) => void;
  onUseSpecificTimeChange: (checked: boolean) => void;
}

const DateTimeInput = ({
  selectedDate,
  specificTime,
  useSpecificTime,
  language,
  onDateChange,
  onTimeChange,
  onUseSpecificTimeChange
}: DateTimeInputProps) => {
  const texts = {
    sanskrit: {
      dateSelection: 'तिथि चयन',
      specificTime: 'विशिष्ट समय',
      useSpecificTimeLabel: 'विशिष्ट समय का उपयोग करें',
      specificTimeHelper: 'सूर्योदय के बजाय विशिष्ट समय पर तिथि की गणना'
    },
    english: {
      dateSelection: 'Date Selection',
      specificTime: 'Specific Time',
      useSpecificTimeLabel: 'Use Specific Time',
      specificTimeHelper: 'Calculate tithi at specific time instead of sunrise'
    }
  };

  const t = texts[language];

  return (
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
          onChange={onDateChange}
          className="mb-4"
          min="1900-01-01"
          max="2100-12-31"
        />
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={useSpecificTime}
              onCheckedChange={onUseSpecificTimeChange}
            />
            <Label className="text-sm">{t.useSpecificTimeLabel}</Label>
          </div>
          
          {useSpecificTime && (
            <div>
              <Label className="text-xs text-blue-600 mb-2 block">
                {t.specificTimeHelper}
              </Label>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-blue-500" />
                <Input
                  type="time"
                  onChange={(e) => onTimeChange(e.target.value)}
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
  );
};

export default DateTimeInput;
