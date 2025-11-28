
import React, { useState } from 'react';
import SectionTitle from './ui/SectionTitle';
import { PERSONAL_DETAILS } from '../constants';
import { Mail, MapPin, Send, Loader2, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        // Add success handling here
        alert("Message sent successfully!");
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-transparent transition-colors duration-300 relative">
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle title="Get In Touch" subtitle="Contact Me" />
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-8 glass p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              Let's talk about your next <span className="text-cyan-500">project</span>.
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              I'm currently available for freelance projects and open to full-time opportunities.
            </p>
            
            <div className="space-y-6 pt-4">
              <a href={`mailto:${PERSONAL_DETAILS.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Email Me</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-500 transition-colors">{PERSONAL_DETAILS.email}</p>
                </div>
              </a>

              <a href={`tel:${PERSONAL_DETAILS.phone}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Call Me</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-green-500 transition-colors">{PERSONAL_DETAILS.phone}</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Location</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{PERSONAL_DETAILS.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 rounded-3xl glass bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-lg">
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all dark:text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all dark:text-white"
                    placeholder="abc@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  id="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all dark:text-white"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                <textarea 
                  name="message" 
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all resize-none dark:text-white"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
