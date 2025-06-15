
import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { InfoIcon, ShieldIcon, FileTextIcon, HelpCircleIcon, StarIcon, MailIcon, XIcon } from 'lucide-react';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'sanskrit' | 'english';
}

const AppDrawer: React.FC<AppDrawerProps> = ({ isOpen, onClose, language }) => {
  const texts = {
    sanskrit: {
      menu: 'मेन्यू',
      about: 'हमारे बारे में',
      privacy: 'गोपनीयता नीति',
      terms: 'नियम और शर्तें',
      help: 'सहायता',
      rate: 'ऐप को रेट करें',
      contact: 'संपर्क करें',
      close: 'बंद करें'
    },
    english: {
      menu: 'Menu',
      about: 'About Us',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      help: 'Help & Support',
      rate: 'Rate This App',
      contact: 'Contact Us',
      close: 'Close'
    }
  };

  const t = texts[language];

  const menuItems = [
    { icon: InfoIcon, label: t.about, action: () => window.open('/about', '_blank') },
    { icon: ShieldIcon, label: t.privacy, action: () => window.open('/privacy', '_blank') },
    { icon: FileTextIcon, label: t.terms, action: () => window.open('/terms', '_blank') },
    { icon: HelpCircleIcon, label: t.help, action: () => window.open('/help', '_blank') },
    { icon: StarIcon, label: t.rate, action: () => window.open('https://play.google.com/store', '_blank') },
    { icon: MailIcon, label: t.contact, action: () => window.open('mailto:support@shivvaas.app', '_blank') }
  ];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="flex items-center gap-2">
            <span className="text-2xl">🕉️</span>
            {t.menu}
          </DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </DrawerHeader>
        
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-3 h-12"
                onClick={item.action}
              >
                <Icon className="w-5 h-5 text-saffron-600" />
                <span className="text-left">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AppDrawer;
