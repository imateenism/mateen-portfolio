import React from 'react';
import SectionTitle from './ui/SectionTitle';
import { PROJECTS } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Github, ExternalLink, Folder } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-transparent transition-colors duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle title="Featured Projects" subtitle="My Work" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: any, index: number }> = ({ project, index }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div 
      ref={ref}
      className={`group rounded-2xl overflow-hidden glass bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image / Banner */}
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2 bg-slate-900/80 backdrop-blur rounded-full text-white hover:text-cyan-400">
            <Github size={18} />
          </a>
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="p-2 bg-slate-900/80 backdrop-blur rounded-full text-white hover:text-cyan-400">
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Folder size={20} className="text-cyan-500" />
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech: string, i: number) => (
            <span 
              key={i} 
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;