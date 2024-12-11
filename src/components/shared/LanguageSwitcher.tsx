import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-dark-1 dark:text-light-1 hover:bg-[#fdf2f8] dark:hover:bg-dark-4"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#FFFFFF] dark:bg-dark-2 border border-border dark:border-dark-4">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={`text-dark-1 dark:text-light-1 hover:bg-[#fdf2f8] dark:hover:bg-dark-4 cursor-pointer ${
            i18n.language === 'en' ? 'bg-[#fdf2f8] dark:bg-dark-3' : ''
          }`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('ar')}
          className={`text-dark-1 dark:text-light-1 hover:bg-[#fdf2f8] dark:hover:bg-dark-4 cursor-pointer ${
            i18n.language === 'ar' ? 'bg-[#fdf2f8] dark:bg-dark-3' : ''
          }`}
        >
          عربي
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
