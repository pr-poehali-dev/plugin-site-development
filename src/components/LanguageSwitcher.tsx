import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
      title={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    >
      <Icon name="Languages" size={18} />
      <span className="text-sm font-medium">{language === 'ru' ? 'RU' : 'EN'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
