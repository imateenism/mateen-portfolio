import React from 'react';
import SectionTitle from './ui/SectionTitle';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PERSONAL_DETAILS } from '../constants';

const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 bg-transparent transition-colors duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle title="About Me" subtitle="Who I Am" />
        
        <div 
          ref={ref}
          className={`max-w-4xl mx-auto text-center space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-white/10 dark:bg-slate-900/60 bg-white/60">
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {PERSONAL_DETAILS.about}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-8">
                <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800">
                📍 {PERSONAL_DETAILS.location}
                </span>
                <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800">
                📞 {PERSONAL_DETAILS.phone}
                </span>
                <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800">
                ✉️ {PERSONAL_DETAILS.email}
                </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {[
              { label: 'Experience', value: '1+ Years' },
              { label: 'Projects', value: '10+' },
              { label: 'Technologies', value: '8+' },
              { label: 'Commitment', value: '100%' }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-100 dark:border-white/5 hover:border-cyan-500/30 transition-all duration-300 group shadow-sm">
                <h4 className="text-3xl font-bold text-cyan-500 mb-1 group-hover:scale-110 transition-transform">{stat.value}</h4>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;