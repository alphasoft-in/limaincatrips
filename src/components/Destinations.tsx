import React from 'react';
import { useTranslations, useTranslatedPath } from '../i18n/utils';
import { ui } from '../i18n/ui';

interface DestinationsProps {
  lang?: keyof typeof ui;
}

const Destinations: React.FC<DestinationsProps> = ({ lang = 'es' }) => {
  const t = useTranslations(lang);
  const translatePath = useTranslatedPath(lang);

  const destinations = [
    {
      id: 1,
      nameKey: 'dest.cusco.title' as const,
      location: 'Cusco',
      image: '/destinos/cusco.png',
      descriptionKey: 'dest.cusco.desc' as const,
      link: `/cusco`
    },
    {
      id: 2,
      nameKey: 'dest.selva.title' as const,
      location: 'Amazonas',
      image: '/destinos/selva-central.png',
      descriptionKey: 'dest.selva.desc' as const,
      link: `/selva-central/selva-central-3d-2n`
    },
    {
      id: 3,
      nameKey: 'dest.ica.title' as const,
      location: 'Ica',
      image: '/destinos/nazca.png',
      descriptionKey: 'dest.ica.desc' as const,
      link: `/ica/paracas-huacachina-2d-1n`
    },
    {
      id: 4,
      nameKey: 'dest.cajamarca.title' as const,
      location: 'Cajamarca',
      image: '/destinos/cajamarca.png',
      descriptionKey: 'dest.cajamarca.desc' as const,
      link: `/cajamarca`
    }
  ];

  return (
    <section id="destinations" className="pt-24 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">{t('dest.title')}</span>
          <h2 className="mt-2 text-4xl font-display font-bold text-brand-primary">{t('dest.subtitle')}</h2>
          <div className="mt-4 w-24 h-1 bg-brand-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <a href={translatePath(dest.link)} key={dest.id} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl block">
              <div className="aspect-[4/5] relative">
                <img 
                  src={dest.image} 
                  alt={t(dest.nameKey)} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="inline-flex items-center bg-brand-secondary/90 text-white px-3 py-1 rounded-full mb-3 shadow-lg backdrop-blur-sm">
                  <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{dest.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t(dest.nameKey)}</h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {t(dest.descriptionKey)}
                </p>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href={translatePath('/destinations')} className="inline-flex items-center justify-center px-8 py-3 border-2 border-brand-primary text-brand-primary font-semibold rounded-full hover:bg-brand-primary hover:text-white transition-colors duration-300">
            {t('dest.btn')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
