
import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';

interface ShivVaasHeaderProps {
  onMenuClick: () => void;
  language: 'sanskrit' | 'english';
}

const ShivVaasHeader = ({ onMenuClick, language }: ShivVaasHeaderProps) => {
  const texts = {
    sanskrit: {
      title: 'शिव वास कैलकुलेटर',
      menu: 'मेन्यू'
    },
    english: {
      title: 'Shiv Vaas Calculator',
      menu: 'Menu'
    }
  };

  const t = texts[language];

  return (
    <div className="flex justify-between items-center mb-6">
      <Button
        variant="outline"
        size="sm"
        onClick={onMenuClick}
        className="flex items-center gap-2"
      >
        <MenuIcon className="w-4 h-4" />
        {t.menu}
      </Button>
      
      <div className="text-center flex-1">
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Left Symbol - Om with Ganesha Mantra */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-r from-saffron-500 to-orange-600 rounded-full mb-2 animate-shine">
              <span className="text-lg text-white">🕉️</span>
              <p className="text-[8px] text-white sanskrit-text leading-tight px-1">
                ॐ गं गणपतये नमः
              </p>
            </div>
          </div>

          {/* Center Symbol - Om */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-r from-saffron-500 to-orange-600 rounded-full mb-2 animate-shine">
              <span className="text-lg text-white">🕉️</span>
              <p className="text-[8px] text-white sanskrit-text leading-tight px-1">
                ॐ नमः शिवाय
              </p>
            </div>
          </div>

          {/* Right Symbol - Om with Bhairava Mantra */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-r from-saffron-500 to-orange-600 rounded-full mb-2 animate-shine">
              <span className="text-lg text-white">🕉️</span>
              <p className="text-[8px] text-white sanskrit-text leading-tight px-1">
                Batuk Bhairavaye Namah
              </p>
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700">{t.title}</h1>
      </div>
      
      <div className="w-16" />
    </div>
  );
};

export default ShivVaasHeader;
