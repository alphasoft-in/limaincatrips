import React, { useState, useEffect } from 'react';
import { useTranslations, useTranslatedPath } from '../i18n/utils';
import LanguagePicker from './LanguagePicker.tsx';

interface NavbarProps {
  solid?: boolean;
  currentPath?: string;
  lang?: 'es' | 'en';
}

const Navbar: React.FC<NavbarProps> = ({ solid = false, currentPath = '/', lang = 'es' }) => {
  const [isScrolled, setIsScrolled] = useState(solid);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSelvaOpen, setIsSelvaOpen] = useState(false);
  
  const t = useTranslations(lang);
  const translatePath = useTranslatedPath(lang);
  
  useEffect(() => {
    if (solid) return; // If always solid, no need to update on scroll
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [solid]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const matchesPath = (target: string) => {
    if (currentPath === target || currentPath === `${target}/`) return true;
    if (currentPath.startsWith(`${target}/`)) return true;
    
    const enTarget = `/en${target}`;
    if (currentPath === enTarget || currentPath === `${enTarget}/`) return true;
    if (currentPath.startsWith(`${enTarget}/`)) return true;
    
    return false;
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/' || currentPath === '/en/';

    if (path === '/selva') {
      return matchesPath(`/iquitos`) || 
             matchesPath(`/tarapoto`) || 
             matchesPath(`/selva-central`) || 
             matchesPath(`/pacaya-samiria`);
    }
    
    return matchesPath(path);
  };

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    const baseClasses = "font-medium transition-colors relative";
    
    if (active) {
      return `${baseClasses} text-brand-secondary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brand-secondary`;
    }
    
    return `${baseClasses} hover:text-brand-secondary ${isScrolled ? 'text-gray-700' : 'text-gray-100'}`;
  };

  const getMobileLinkClasses = (path: string) => {
    const active = isActive(path);
    return `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
      active 
        ? 'text-brand-secondary bg-brand-light/50 font-bold' 
        : 'text-gray-800 hover:text-brand-secondary hover:bg-gray-50'
    }`;
  };

  const getDropdownItemClasses = (path: string) => {
    const active = matchesPath(path);
    return `block px-4 py-2 text-sm border-b border-gray-50 last:border-b-0 transition-colors ${
      active ? 'text-brand-secondary bg-brand-light font-semibold' : 'text-gray-700 hover:bg-brand-light hover:text-brand-secondary'
    }`;
  };

  const getMobileDropdownItemClasses = (path: string) => {
    const active = matchesPath(path);
    return `block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      active ? 'text-brand-secondary bg-brand-light/30 font-bold' : 'text-gray-600 hover:text-brand-secondary hover:bg-gray-50'
    }`;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href={translatePath('/')} className="block">
              <img 
                src="/logo-trimmed.png" 
                alt="Lima Inca TRIPS" 
                className={`h-12 w-auto object-contain drop-shadow-md transition-all duration-300 ${!isScrolled ? 'brightness-0 invert' : ''}`} 
              />
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">


            
            <div className="relative group">
              <button className={`${getLinkClasses('/selva')} flex items-center`}>
                {t('nav.selva')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                <div className="py-1">
                  <a href={translatePath(`/iquitos`)} className={getDropdownItemClasses(`/iquitos`)}>{t('nav.iquitos')}</a>
                  <a href={translatePath(`/tarapoto`)} className={getDropdownItemClasses(`/tarapoto`)}>{t('nav.tarapoto')}</a>
                  <a href={translatePath(`/selva-central`)} className={getDropdownItemClasses(`/selva-central`)}>{t('nav.selvacentral')}</a>
                  <a href={translatePath(`/pacaya-samiria`)} className={getDropdownItemClasses(`/pacaya-samiria`)}>{t('nav.pacaya')}</a>
                </div>
              </div>
            </div>

            <a href={translatePath(`/cusco`)} className={getLinkClasses(`/cusco`)}>{t('nav.cusco')}</a>
            <a href={translatePath(`/cajamarca`)} className={getLinkClasses(`/cajamarca`)}>{t('nav.cajamarca')}</a>
            <a href={translatePath(`/costa-norte`)} className={getLinkClasses(`/costa-norte`)}>{t('nav.costanorte')}</a>
            <a href={translatePath(`/ica`)} className={getLinkClasses(`/ica`)}>{t('nav.ica')}</a>
            <a href={translatePath(`/chachapoyas`)} className={getLinkClasses(`/chachapoyas`)}>{t('nav.chachapoyas')}</a>
            <a href={translatePath('/gallery')} className={getLinkClasses('/gallery')}>{t('nav.gallery')}</a>


            
            <LanguagePicker lang={lang} isScrolled={isScrolled} currentPath={currentPath} />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguagePicker lang={lang} isScrolled={isScrolled} currentPath={currentPath} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none ${isScrolled ? 'text-brand-primary' : 'text-white'}`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <span className="text-xl font-display font-bold text-brand-primary">{t('nav.menu')}</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 -mr-2 text-gray-500 hover:text-brand-primary focus:outline-none"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">


          
          <div className="my-2">
            <button 
              onClick={() => setIsSelvaOpen(!isSelvaOpen)}
              className={`w-full text-left flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive('/selva') ? 'text-brand-secondary bg-brand-light/50 font-bold' : 'text-gray-800 hover:text-brand-secondary hover:bg-gray-50'}`}
            >
              <span>{t('nav.selva')}</span>
              <svg className={`w-5 h-5 transform transition-transform duration-200 ${isSelvaOpen ? 'rotate-180 text-brand-secondary' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSelvaOpen ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
              <div className="pl-4 pr-2 py-2 space-y-1 border-l-2 border-brand-secondary/30 ml-4">
                <a href={translatePath(`/iquitos`)} className={getMobileDropdownItemClasses(`/iquitos`)} onClick={() => setIsMenuOpen(false)}>{t('nav.iquitos')}</a>
                <a href={translatePath(`/tarapoto`)} className={getMobileDropdownItemClasses(`/tarapoto`)} onClick={() => setIsMenuOpen(false)}>{t('nav.tarapoto')}</a>
                <a href={translatePath(`/selva-central`)} className={getMobileDropdownItemClasses(`/selva-central`)} onClick={() => setIsMenuOpen(false)}>{t('nav.selvacentral')}</a>
                <a href={translatePath(`/pacaya-samiria`)} className={getMobileDropdownItemClasses(`/pacaya-samiria`)} onClick={() => setIsMenuOpen(false)}>{t('nav.pacaya')}</a>
              </div>
            </div>
          </div>

          <a href={translatePath(`/cusco`)} className={getMobileLinkClasses(`/cusco`)} onClick={() => setIsMenuOpen(false)}>{t('nav.cusco')}</a>
          <a href={translatePath(`/cajamarca`)} className={getMobileLinkClasses(`/cajamarca`)} onClick={() => setIsMenuOpen(false)}>{t('nav.cajamarca')}</a>
          <a href={translatePath(`/costa-norte`)} className={getMobileLinkClasses(`/costa-norte`)} onClick={() => setIsMenuOpen(false)}>{t('nav.costanorte')}</a>
          <a href={translatePath(`/ica`)} className={getMobileLinkClasses(`/ica`)} onClick={() => setIsMenuOpen(false)}>{t('nav.ica')}</a>
          <a href={translatePath(`/chachapoyas`)} className={getMobileLinkClasses(`/chachapoyas`)} onClick={() => setIsMenuOpen(false)}>{t('nav.chachapoyas')}</a>
          <a href={translatePath('/gallery')} className={getMobileLinkClasses('/gallery')} onClick={() => setIsMenuOpen(false)}>{t('nav.gallery')}</a>
        </div>
        

      </div>
    </nav>
  );
};

export default Navbar;
