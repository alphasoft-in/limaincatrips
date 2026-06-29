import React, { useState } from 'react';

interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title, subtitle }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section className="py-16 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {subtitle && (
              <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-brand-primary">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 break-inside-avoid"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.url}
                alt={img.title || `Gallery image ${index + 1}`}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                {img.title && (
                  <h3 className="text-white font-display font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                  </h3>
                )}
                {img.description && (
                  <p className="text-gray-200 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {img.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 bg-black/30 hover:bg-black/60 p-2 md:p-3 rounded-full backdrop-blur-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = images.findIndex(img => img.id === selectedImage.id);
              setSelectedImage(currentIndex > 0 ? images[currentIndex - 1] : images[images.length - 1]);
            }}
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 bg-black/30 hover:bg-black/60 p-2 md:p-3 rounded-full backdrop-blur-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = images.findIndex(img => img.id === selectedImage.id);
              setSelectedImage(currentIndex < images.length - 1 ? images[currentIndex + 1] : images[0]);
            }}
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="max-w-5xl w-full max-h-[90vh] p-4 flex flex-col items-center justify-center relative" onClick={e => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title || 'Selected image'}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            {(selectedImage.title || selectedImage.description) && (
              <div className="text-center mt-6">
                {selectedImage.title && <h3 className="text-white font-bold text-2xl">{selectedImage.title}</h3>}
                {selectedImage.description && <p className="text-gray-300 mt-2 max-w-2xl mx-auto">{selectedImage.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
