import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface DirectionalTextProps {
  children: React.ReactNode;
  className?: string;
}

const DirectionalText = ({ children, className }: DirectionalTextProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div 
      className={cn(
        'w-full',
        isRTL ? 'text-right' : 'text-left',
        className
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {children}
    </div>
  );
};

export default DirectionalText;
