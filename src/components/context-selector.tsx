import { useState } from 'react';

interface LocaleSelectorProps {
  onLanguageChange: (locale: 'en' | 'de' | 'fr' | 'it') => void;
  onCountryChange: (country: 'fr' | 'de') => void;
  initialLanguage?: 'en' | 'de' | 'fr' | 'it';
  initialCountry?: 'fr' | 'de';
}

export function ContextSelector({
  onLanguageChange,
  onCountryChange,
  initialLanguage = 'en',
  initialCountry = 'de'
}: LocaleSelectorProps) {
  const [locale, setLocale] = useState<'en' | 'de' | 'fr' | 'it'>(initialLanguage);
  const [selectedCountry, setSelectedCountry] = useState<'fr' | 'de'>(initialCountry);

  const handleLanguageChange = (value: string) => {
    const newLocale = value as 'en' | 'de' | 'fr' | 'it';
    setLocale(newLocale);
    onLanguageChange(newLocale);
  };

  const handleCountryChange = (value: string) => {
    const newCountry = value as 'fr' | 'de';
    setSelectedCountry(newCountry);
    onCountryChange(newCountry);
  };

  return (
    <>
      <div className="text-center py-4">
        <label className="mr-2 font-medium">Select Language:</label>
        <select
          value={locale}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
        </select>
      </div>
      <div className="text-center py-4">
        <label className="mr-2 font-medium">Select Country:</label>
        <select
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="de">Germany</option>
          <option value="fr">France</option>
        </select>
      </div>
    </>
  );
}