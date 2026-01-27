import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log('Current language:', i18n.language);
  }, [i18n.language]);

  const changeLanguage = async (lng: string) => {
    console.log('Changing language to:', lng);
    await i18n.changeLanguage(lng);
    console.log('Language changed to:', i18n.language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage('ar')}>
          العربية
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;