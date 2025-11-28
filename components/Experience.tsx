import React from 'react';
import SectionTitle from './ui/SectionTitle';
import { EXPERIENCE } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Briefcase, Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-transparent transition-colors duration-300 relative">
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title="Professional Journey" subtitle="My Career Path" />
        
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Gradient Line */}
          {/* Mobile: Left aligned | Desktop: Center aligned */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600 transform md:-translate-x-1/2 opacity-30 dark:opacity-50"></div>
          
          <div className="space-y-12 md:space-y-0">
            {EXPERIENCE.map((item, idx) => (
              <ExperienceCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard: React.FC<{ item: any, index: number }> = ({ item, index }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref} 
      className={`relative flex flex-col md:flex-row items-center md:justify-between ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      
      {/* Spacer for Desktop Layout */}
      <div className="hidden md:block w-5/12"></div>
      
      {/* Timeline Node */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        {/* Glow Effect */}
        <div className="absolute w-12 h-12 bg-cyan-500/20 rounded-full animate-pulse-glow blur-md"></div>
        {/* Icon Container */}
        <div className="relative z-10 w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 border-2 border-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
           <Briefcase size={16} className="text-cyan-600 dark:text-cyan-400" />
        </div>
      </div>
      
      {/* Content Card */}
      {/* Mobile: Full width with left padding for line | Desktop: 5/12 width */}
      <div 
        className={`w-full pl-20 md:pl-0 md:w-5/12 transition-all duration-1000 transform ${
          isVisible 
            ? 'opacity-100 translate-y-0 translate-x-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="group relative p-6 md:p-8 rounded-2xl glass bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 hover:border-cyan-500/30 shadow-sm hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-300 hover:-translate-y-2">
          
          {/* Decorative Corner Gradient */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-tr-2xl -z-10 group-hover:from-cyan-500/20 transition-all" />

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-xs font-bold border border-cyan-200 dark:border-cyan-800">
               <Calendar size={12} /> {item.period}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {item.role}
          </h3>
          
          <h4 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-6 flex items-center gap-2">
            @ {item.company}
          </h4>
          
          <ul className="space-y-3">
            {item.description.map((desc: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;