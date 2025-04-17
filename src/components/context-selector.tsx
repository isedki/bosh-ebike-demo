import { useState, useRef, useEffect } from 'react';
import { FaGlobe, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';

interface LocaleSelectorProps {
  onLanguageChange: (locale: 'en' | 'de' | 'fr' | 'it') => void;
  onCountryChange: (country: 'france' | 'germany') => void;
  initialLanguage?: 'en' | 'de' | 'fr' | 'it';
  initialCountry?: 'france' | 'germany';
}

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  className?: string;
}

function CustomDropdown({ options, value, onChange, icon, className = '' }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-10 pr-8 py-2 border rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CC0000] cursor-pointer transition-colors"
      >
        <div className="absolute left-3 text-gray-500">
          {icon}
        </div>
        <span>{selectedOption?.label}</span>
        <div className="absolute right-3 text-gray-500">
          <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer transition-colors ${
                value === option.value ? 'bg-red-50 text-[#CC0000]' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ContextSelector({
  onLanguageChange,
  onCountryChange,
  initialLanguage = 'en',
  initialCountry = 'france'
}: LocaleSelectorProps) {
  const [locale, setLocale] = useState<'en' | 'de' | 'fr' | 'it'>(initialLanguage);
  const [selectedCountry, setSelectedCountry] = useState<'france' | 'germany'>(initialCountry);

  const handleLanguageChange = (value: string) => {
    const newLocale = value as 'en' | 'de' | 'fr' | 'it';
    setLocale(newLocale);
    onLanguageChange(newLocale);
  };

  const handleCountryChange = (value: string) => {
    const newCountry = value as 'france' | 'germany';
    setSelectedCountry(newCountry);
    onCountryChange(newCountry);
  };

  const languageOptions: DropdownOption[] = [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
  ];

  const countryOptions: DropdownOption[] = [
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
  ];

  return (
    <div className="flex justify-center gap-4 pb-6 md:pt-6 md:absolute top-0 left-[50%] md:translate-x-[-50%] z-20">
      <CustomDropdown
        options={languageOptions}
        value={locale}
        onChange={handleLanguageChange}
        icon={<FaGlobe />}
      />
      <CustomDropdown
        options={countryOptions}
        value={selectedCountry}
        onChange={handleCountryChange}
        icon={<FaMapMarkerAlt />}
      />
    </div>
  );
}