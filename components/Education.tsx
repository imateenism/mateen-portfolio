import React from 'react';
import SectionTitle from './ui/SectionTitle';
import { EDUCATION } from '../constants';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Education: React.FC = () => {
    const { ref, isVisible } = useScrollReveal();
  
    return (
      <section className="py-24 bg-transparent transition-colors duration-300">
        <div className="container mx-auto px-6">
          <SectionTitle title="Education" subtitle="Academic Background" />
          
          <div ref={ref} className="max-w-4xl mx-auto space-y-6">
             {EDUCATION.map((edu, idx) => (
                <div 
                    key={idx}
                    className={`flex flex-col md:flex-row gap-6 p-6 rounded-2xl glass bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                >
                    <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <GraduationCap size={28} />
                        </div>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.institution}</h3>
                        <p className="text-lg text-cyan-600 dark:text-cyan-400 font-medium mb-2">{edu.degree}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} /> {edu.period}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin size={14} /> {edu.location}
                            </span>
                        </div>
                    </div>
                </div>
             ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Education;