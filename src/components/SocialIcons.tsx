import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaTripadvisor } from 'react-icons/fa';

const SocialIcons: React.FC = () => {
  return (
    <div className="flex space-x-5 pt-4">
      <a 
        href="#" 
        className="text-gray-400 hover:text-brand-secondary transition-colors" 
        aria-label="Facebook" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaFacebook className="w-7 h-7" />
      </a>
      <a 
        href="#" 
        className="text-gray-400 hover:text-brand-secondary transition-colors" 
        aria-label="Instagram" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaInstagram className="w-7 h-7" />
      </a>
      <a 
        href="#" 
        className="text-gray-400 hover:text-brand-secondary transition-colors" 
        aria-label="TikTok" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaTiktok className="w-7 h-7" />
      </a>
      <a 
        href="#" 
        className="text-gray-400 hover:text-brand-secondary transition-colors" 
        aria-label="TripAdvisor" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <FaTripadvisor className="w-7 h-7" />
      </a>
    </div>
  );
};

export default SocialIcons;
