
import React, { useState } from 'react';
import { Download, ArrowRight, Github, Linkedin, Mail, Loader2 } from 'lucide-react';
import { PERSONAL_DETAILS } from '../constants';
import { useTypewriter } from '../hooks/useTypewriter';
import { jsPDF } from 'jspdf';

const Hero: React.FC = () => {
  // Multiple taglines for the looping typewriter
  const typeWriterText = useTypewriter([
    "Building Secure & Scalable Web Applications.",
    "Specializing in Robust Backend Solutions.",
    "Crafting Seamless User Experiences.",
    "Specialized in Laravel, PHP & MySQL.",
    "Transforming Ideas into Digital Reality."
  ], 40, 2000);

  const [isGenerating, setIsGenerating] = useState(false);

  // Smooth scroll handler
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const generateResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let yPos = 20;
        const leftMargin = 20;
        const rightMargin = 20;
        const contentWidth = pageWidth - leftMargin - rightMargin;

        // Helper for centered text
        const centerText = (text: string, y: number) => {
            const textWidth = doc.getTextWidth(text);
            const x = (pageWidth - textWidth) / 2;
            doc.text(text, x, y);
        };

        // --- Header ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(6, 182, 212); // Cyan-500
        centerText(PERSONAL_DETAILS.name, yPos);
        yPos += 8;

        doc.setFontSize(14);
        doc.setTextColor(100, 116, 139); // Slate-500
        centerText(PERSONAL_DETAILS.role, yPos);
        yPos += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105); // Slate-600
        centerText(`${PERSONAL_DETAILS.email} | ${PERSONAL_DETAILS.phone} | ${PERSONAL_DETAILS.location}`, yPos);
        yPos += 15;

        // --- Line Separator ---
        doc.setDrawColor(226, 232, 240); // Slate-200
        doc.setLineWidth(0.5);
        doc.line(leftMargin, yPos, pageWidth - rightMargin, yPos);
        yPos += 10;

        // --- Summary ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42); // Slate-900
        doc.text("Summary", leftMargin, yPos);
        yPos += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(51, 65, 85); // Slate-700
        const splitSummary = doc.splitTextToSize(PERSONAL_DETAILS.about, contentWidth);
        doc.text(splitSummary, leftMargin, yPos);
        yPos += (splitSummary.length * 5) + 10;

        // --- Experience ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42);
        doc.text("Professional Experience", leftMargin, yPos);
        yPos += 8;

        const { EXPERIENCE, SKILL_CATEGORIES, EDUCATION } = await import('../constants');

        EXPERIENCE.forEach((exp) => {
            // Check for page break
            if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }

            // Role
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(6, 182, 212); // Cyan
            doc.text(exp.role, leftMargin, yPos);
            
            // Date (Right aligned)
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(15, 23, 42);
            const dateWidth = doc.getTextWidth(exp.period);
            doc.text(exp.period, pageWidth - rightMargin - dateWidth, yPos);
            yPos += 5;

            // Company
            doc.setFont("helvetica", "italic");
            doc.setFontSize(11);
            doc.setTextColor(71, 85, 105);
            doc.text(exp.company, leftMargin, yPos);
            yPos += 6;

            // Description
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(51, 65, 85);
            
            exp.description.forEach(desc => {
                const bullet = `• ${desc}`;
                const splitDesc = doc.splitTextToSize(bullet, contentWidth - 5);
                
                if (yPos + (splitDesc.length * 5) > pageHeight - 20) {
                    doc.addPage(); 
                    yPos = 20;
                }
                
                doc.text(splitDesc, leftMargin + 2, yPos);
                yPos += (splitDesc.length * 5);
            });
            yPos += 8;
        });

        // --- Skills ---
        if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42);
        doc.text("Technical Skills", leftMargin, yPos);
        yPos += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        
        SKILL_CATEGORIES.forEach(cat => {
            if (yPos > pageHeight - 20) { doc.addPage(); yPos = 20; }

            const skillNames = cat.skills.map(s => s.name).join(", ");
            
            doc.setFont("helvetica", "bold");
            doc.text(cat.title + ":", leftMargin, yPos);
            
            doc.setFont("helvetica", "normal");
            const titleWidth = doc.getTextWidth(cat.title + ": ");
            
            const splitSkills = doc.splitTextToSize(skillNames, contentWidth - titleWidth);
            doc.text(splitSkills, leftMargin + titleWidth, yPos);
            
            yPos += (splitSkills.length * 5) + 2;
        });

        yPos += 8;

        // --- Education ---
        if (yPos > pageHeight - 40) { doc.addPage(); yPos = 20; }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42);
        doc.text("Education", leftMargin, yPos);
        yPos += 8;

        EDUCATION.forEach(edu => {
             if (yPos > pageHeight - 25) { doc.addPage(); yPos = 20; }

             doc.setFont("helvetica", "bold");
             doc.setFontSize(11);
             doc.text(edu.degree, leftMargin, yPos);
             
             doc.setFont("helvetica", "normal");
             const dateWidth = doc.getTextWidth(edu.period);
             doc.text(edu.period, pageWidth - rightMargin - dateWidth, yPos);
             yPos += 5;
             
             doc.setTextColor(71, 85, 105);
             doc.text(`${edu.institution}, ${edu.location}`, leftMargin, yPos);
             doc.setTextColor(15, 23, 42);
             yPos += 8;
        });

        doc.save("Mateenur_Rehman_Resume.pdf");

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Could not generate resume. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-4 order-2 md:order-1 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-2 animate-fade-in-up">
            Available for Projects
          </div>
          
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-700 dark:text-slate-300">
              Hi, I'm
            </h2>
            {/* Enhanced Name Animation with Flowing Gradient */}
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-[length:200%_auto] animate-gradient-x pb-2 drop-shadow-sm">
              Mateen.
            </h1>
          </div>

          <div className="h-20 md:h-24 pt-2">
            <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
              {typeWriterText}
              <span className="animate-blink text-cyan-500 font-bold ml-1">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6">
            <a 
              href="#projects" 
              onClick={scrollToProjects}
              className="px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              View My Work <ArrowRight size={20} />
            </a>
            <button 
              type="button"
              onClick={generateResume}
              disabled={isGenerating}
              className="px-8 py-3.5 rounded-full glass border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
              {isGenerating ? (
                  <>Generating... <Loader2 size={20} className="animate-spin" /></>
              ) : (
                  <>Download Resume <Download size={20} /></>
              )}
            </button>
          </div>

          <div className="flex gap-6 justify-center md:justify-start pt-6 items-center flex-wrap">
             {/* Social Links */}
            {[
              { icon: Linkedin, href: PERSONAL_DETAILS.linkedin },
              { icon: Github, href: PERSONAL_DETAILS.github },
              { icon: Mail, href: `mailto:${PERSONAL_DETAILS.email}` }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300"
              >
                <social.icon size={24} />
              </a>
            ))}

            {/* Separator */}
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 md:order-2 flex justify-center relative">
            <div className="relative w-64 h-64 md:w-96 md:h-96 animate-float z-10">
               {/* Decorative Ring */}
               <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 dark:border-cyan-400/30 scale-105 animate-[spin_10s_linear_infinite]" />
               
               <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-2xl shadow-cyan-500/20 bg-slate-800 relative z-20">
                  <img 
                    src={PERSONAL_DETAILS.profileImage} 
                    alt="Mateenur Rehman" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  />
               </div>
            </div>
            
            {/* Background Abstract Shapes behind image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl -z-0" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
