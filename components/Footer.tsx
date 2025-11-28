import React from 'react';
import { PERSONAL_DETAILS } from '../constants';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()} <span className="font-bold text-slate-900 dark:text-white">{PERSONAL_DETAILS.name}</span>. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
            <a href={PERSONAL_DETAILS.github} className="text-slate-500 hover:text-cyan-500 transition-colors">
                <Github size={20} />
            </a>
            <a href={PERSONAL_DETAILS.linkedin} className="text-slate-500 hover:text-cyan-500 transition-colors">
                <Linkedin size={20} />
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;