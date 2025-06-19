
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GlobeIcon, MapPinIcon } from 'lucide-react';
import LocationSearch from './LocationSearch';

interface LocationInputProps {
  location: { latitude: number; longitude: number; city: string };
  language: 'sanskrit' | 'english';
  isGettingLocation: boolean;
  onLocationSelect: (location: { latitude: number; longitude: number; city: string }) => void;
  onGetCurrentLocation: () => void;
}

const LocationInput = ({
  location,
  language,
  isGettingLocation,
  onLocationSelect,
  onGetCurrentLocation
}: LocationInputProps) => {
  const texts = {
    sanskrit: {
      location: 'स्थान',
      currentLocation: 'वर्तमान स्थान',
      gettingLocation: 'स्थान प्राप्त कर रहे हैं...'
    },
    english: {
      location: 'Location',
      currentLocation: 'Current Location',
      gettingLocation: 'Getting location...'
    }
  };

  const t = texts[language];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GlobeIcon className="w-5 h-5" />
          {t.location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>{language === 'sanskrit' ? 'शहर' : 'City'}: {location.city}</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <LocationSearch 
                onLocationSelect={onLocationSelect}
                language={language}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onGetCurrentLocation}
              disabled={isGettingLocation}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <MapPinIcon className="w-4 h-4" />
              {isGettingLocation ? t.gettingLocation : t.currentLocation}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-xs text-blue-600">
              {language === 'sanskrit' ? 'अक्षांश' : 'Latitude'}: {location.latitude.toFixed(4)}
            </div>
            <div className="text-xs text-blue-600">
              {language === 'sanskrit' ? 'देशांतर' : 'Longitude'}: {location.longitude.toFixed(4)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationInput;
