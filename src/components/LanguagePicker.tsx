import React from 'react';
import { languages } from '../i18n/ui';

interface LanguagePickerProps {
  lang: 'es' | 'en';
  isScrolled: boolean;
  currentPath: string;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ lang, isScrolled, currentPath }) => {
  // Determine target paths for language switching
  // If currentPath is /en/tours/cusco, switching to es means /tours/cusco
  // If currentPath is /tours/cusco, switching to en means /en/tours/cusco
  
  const getPathForLang = (targetLang: string) => {
    // Remove /en if it's there
    const pathWithoutLang = currentPath.startsWith('/en/') || currentPath === '/en' 
      ? currentPath.replace(/^\/en/, '') 
      : currentPath;
      
    // Default to / if empty
    const normalizedPath = pathWithoutLang === '' ? '/' : pathWithoutLang;
      
    if (targetLang === 'en') {
      return `/en${normalizedPath === '/' ? '' : normalizedPath}`;
    }
    return normalizedPath;
  };

  return (
    <div className="flex items-center space-x-2">
      {Object.entries(languages).map(([l, label]) => {
        const isActive = lang === l;
        return (
          <a
            key={l}
            href={getPathForLang(l)}
            className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
              isActive 
                ? 'bg-brand-secondary text-white' 
                : isScrolled 
                  ? 'text-gray-600 hover:text-brand-primary' 
                  : 'text-gray-200 hover:text-white'
            }`}
          >
            {l.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
};

export default LanguagePicker;
