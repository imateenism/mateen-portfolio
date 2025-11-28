
import React, { useState } from 'react';
import { Phone, MessageCircle, Plus } from 'lucide-react';
import { PERSONAL_DETAILS } from '../constants';

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = PERSONAL_DETAILS.phone.replace(/[+\s]/g, '');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
      
      {/* --- Relative Container for the Radial Dial --- */}
      <div className="relative z-50">

        {/* --- 1. WhatsApp Button (Moves UP - 12 o'clock) --- */}
        <div 
            className={`absolute bottom-2 right-1 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isOpen ? '-translate-y-[5.5rem] opacity-100 scale-100 rotate-[0deg]' : 'translate-y-0 opacity-0 scale-0 rotate-[360deg]'
            }`}
        >
            <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-110 transition-transform duration-200"
            >
                <MessageCircle size={24} />
            </a>
        </div>

        {/* --- 2. Call Button (Moves DIAGONAL LEFT - 10 o'clock) --- */}
        <div 
            className={`absolute bottom-1 right-1 transition-all duration-700 delay-100 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isOpen ? '-translate-x-[4rem] -translate-y-[4rem] opacity-100 scale-100 rotate-[0deg]' : 'translate-x-0 translate-y-0 opacity-0 scale-0 rotate-[360deg]'
            }`}
        >
            <a 
                href={`tel:${PERSONAL_DETAILS.phone}`}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-110 transition-transform duration-200"
            >
                <Phone size={24} />
            </a>
        </div>

        {/* --- Main Toggle Button --- */}
        <button 
            onClick={toggleMenu}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-500 z-50 active:scale-95 group"
            aria-label="Contact Menu"
        >
            {/* Ripple Animation (Only when closed) */}
            {!isOpen && (
                <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ripple pointer-events-none"></span>
            )}
            
            {/* Icon Rotation (Anti-Clockwise to X) */}
            <div className={`transform transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${isOpen ? '-rotate-[135deg]' : 'rotate-0'}`}>
                <Plus size={32} />
            </div>
        </button>

      </div>
    </div>
  );
};

export default FloatingContact;
