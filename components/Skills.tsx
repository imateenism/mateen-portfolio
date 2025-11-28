import React from 'react';
import SectionTitle from './ui/SectionTitle';
import { SKILL_CATEGORIES } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Skills: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="py-24 bg-transparent transition-colors duration-300 relative overflow-hidden">
      {/* Background blobs - kept subtle */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-[80px]" />
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title="Technical Expertise" subtitle="My Arsenal" />
        
        <div 
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {SKILL_CATEGORIES.map((category, idx) => (
            <div 
              key={idx}
              className={`p-8 rounded-3xl glass dark:bg-slate-900/60 bg-white/70 border border-slate-200 dark:border-white/10 hover:border-cyan-500/30 transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx}
                    className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
                  >
                    {skill.icon && <skill.icon size={18} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />}
                    <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;