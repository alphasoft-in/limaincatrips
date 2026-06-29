import React from 'react';

export interface TourCardData {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  priceLabel: string;
  badges: string[];
  destination?: string;
}

interface FeaturedToursProps {
  tours: TourCardData[];
  lang: 'es' | 'en';
  translations: {
    sectionTitle: string;
    sectionSubtitle: string;
    detailsBtn: string;
  };
}

const FeaturedTours: React.FC<FeaturedToursProps> = ({ tours, lang, translations }) => {
  const getTourLink = (tour: TourCardData) => {
    const dest = tour.destination || 'tours';
    return lang === 'en' ? `/en/${dest}/${tour.id}` : `/${dest}/${tour.id}`;
  };

  return (
    <section id="tours" className="pt-12 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">
            {translations.sectionTitle}
          </span>
          <h2 className="mt-2 text-3xl md:text-5xl font-display font-bold text-brand-primary">
            {translations.sectionSubtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div 
              key={tour.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={tour.heroImage} 
                  alt={tour.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {tour.badges.length > 0 && (
                  <div className="absolute top-4 left-4 bg-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {tour.badges[0]}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-display font-bold text-white mb-1 line-clamp-1">{tour.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-1">{tour.subtitle}</p>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-end">

                <a 
                  href={getTourLink(tour)}
                  className="block w-full text-center py-3 px-4 bg-brand-light text-brand-primary hover:bg-brand-primary hover:text-white font-semibold rounded-xl transition-colors duration-300"
                >
                  {translations.detailsBtn}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
