import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const slidesES = [
  {
    image: "/sliders/ica.png",
    subtitle: "Sol, Arena y Mar",
    titlePre: "Aventura en el Sur:",
    titleHighlight: "Ica y Paracas",
    description: "Sobrevuela las Líneas de Nazca, navega hacia las Islas Ballestas y diviértete en los tubulares del desierto de Huacachina."
  },
  {
    image: "/sliders/lima.png",
    subtitle: "La Ciudad de los Reyes",
    titlePre: "Descubre la Magia de",
    titleHighlight: "Lima",
    description: "Recorre el centro histórico colonial, pasea por el malecón de Miraflores y disfruta de la mejor gastronomía del mundo."
  },
  {
    image: "/sliders/cusco.png",
    subtitle: "El Ombligo del Mundo",
    titlePre: "Explora la Grandeza de",
    titleHighlight: "Cusco",
    description: "Camina por las históricas calles incas, descubre el Valle Sagrado y conquista la maravilla mundial de Machu Picchu."
  },
  {
    image: "/sliders/chachapoyas.png",
    subtitle: "Misterios de los Andes",
    titlePre: "Naturaleza e Historia en",
    titleHighlight: "Chachapoyas",
    description: "Sube a la imponente fortaleza de Kuélap en teleférico y maravíllate frente a la majestuosa catarata de Gocta."
  },
  {
    image: "/sliders/iquitos.png",
    subtitle: "El Corazón de la Amazonía",
    titlePre: "Adéntrate en la Selva de",
    titleHighlight: "Iquitos",
    description: "Navega por el río Amazonas, observa delfines rosados y duerme rodeado del increíble sonido de la selva virgen."
  },
  {
    image: "/sliders/tarapoto.png",
    subtitle: "La Ciudad de las Palmeras",
    titlePre: "Paraíso Tropical en",
    titleHighlight: "Tarapoto",
    description: "Refréscate en cataratas escondidas, relájate en la famosa Laguna Azul y vive la magia verde de nuestra selva alta."
  }
];

const slidesEN = [
  {
    image: "/sliders/ica.png",
    subtitle: "Sun, Sand and Sea",
    titlePre: "Adventure in the South:",
    titleHighlight: "Ica & Paracas",
    description: "Fly over the Nazca Lines, sail to the Ballestas Islands and have fun on the sandboards in the Huacachina desert."
  },
  {
    image: "/sliders/lima.png",
    subtitle: "The City of Kings",
    titlePre: "Discover the Magic of",
    titleHighlight: "Lima",
    description: "Walk through the colonial historic center, stroll along the Miraflores boardwalk and enjoy the best gastronomy in the world."
  },
  {
    image: "/sliders/cusco.png",
    subtitle: "The Navel of the World",
    titlePre: "Explore the Greatness of",
    titleHighlight: "Cusco",
    description: "Walk the historic Inca streets, discover the Sacred Valley and conquer the world wonder of Machu Picchu."
  },
  {
    image: "/sliders/chachapoyas.png",
    subtitle: "Mysteries of the Andes",
    titlePre: "Nature and History in",
    titleHighlight: "Chachapoyas",
    description: "Climb the imposing Kuélap fortress by cable car and marvel at the majestic Gocta waterfall."
  },
  {
    image: "/sliders/iquitos.png",
    subtitle: "The Heart of the Amazon",
    titlePre: "Delve into the Jungle of",
    titleHighlight: "Iquitos",
    description: "Navigate the Amazon River, watch pink dolphins and sleep surrounded by the incredible sound of the virgin jungle."
  },
  {
    image: "/sliders/tarapoto.png",
    subtitle: "The City of Palms",
    titlePre: "Tropical Paradise in",
    titleHighlight: "Tarapoto",
    description: "Cool off in hidden waterfalls, relax in the famous Blue Lagoon and live the green magic of our high jungle."
  }
];

interface HeroProps {
  lang?: 'es' | 'en';
}

const Hero: React.FC<HeroProps> = ({ lang = 'es' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = lang === 'en' ? slidesEN : slidesES;
  const btnExplore = lang === 'en' ? 'Explore Tours' : 'Explorar Tours';
  const btnConsult = lang === 'en' ? 'Consult now' : 'Consultar ahora';
  const whatsappText = lang === 'en' ? 'Hi, I would like to inquire about the tours' : 'Hola, quisiera consultar sobre los tours';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images with Parallax effect */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        let bgTranslate = 'translate-x-0';
        if (index < currentSlide) bgTranslate = '-translate-x-16 md:-translate-x-32';
        if (index > currentSlide) bgTranslate = 'translate-x-16 md:translate-x-32';

        return (
          <div 
            key={`bg-${index}`}
            className={`absolute inset-0 z-0 transition-opacity duration-[1200ms] ease-in-out ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div 
              className={`absolute -inset-[15%] bg-cover bg-center bg-no-repeat transition-all duration-[1200ms] ease-out ${isActive ? 'scale-105 translate-x-0' : `scale-100 ${bgTranslate}`}`}
              style={{ backgroundImage: `url("${slide.image}")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>
        );
      })}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20 w-full h-full flex items-center justify-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          let contentTranslate = 'translate-x-0';
          if (index < currentSlide) contentTranslate = '-translate-x-16';
          if (index > currentSlide) contentTranslate = 'translate-x-16';

          return (
            <div 
              key={`content-${index}`} 
              className={`absolute inset-x-0 flex flex-col items-center justify-center pb-24 transition-all duration-[1200ms] ease-in-out ${
                isActive 
                  ? 'opacity-100 translate-x-0 translate-y-0 pointer-events-auto' 
                  : `opacity-0 ${contentTranslate} pointer-events-none`
              }`}
            >
              <span className="text-white bg-black/40 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full font-bold tracking-widest uppercase text-xs md:text-sm mb-6 inline-block shadow-lg">
                {slide.subtitle}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-xl">
                {slide.titlePre} <br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-yellow-300">{slide.titleHighlight}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
                {slide.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#tours" className="px-8 py-4 bg-brand-secondary text-white font-semibold rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  {btnExplore}
                </a>
                <a href={`https://wa.me/51936976776?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full hover:bg-[#25D366] hover:border-[#25D366] transition-all flex items-center gap-2">
                  <FaWhatsapp className="w-5 h-5" />
                  {btnConsult}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide 
                ? 'w-10 h-2.5 bg-brand-secondary shadow-[0_0_10px_rgba(212,175,55,0.6)]' 
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/90'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a href="#destinations" className="text-white/70 hover:text-white transition-colors" aria-label="Scroll down to destinations">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;
