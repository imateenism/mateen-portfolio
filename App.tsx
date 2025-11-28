
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GalaxyBackground from './components/ui/GalaxyBackground';
import FloatingContact from './components/FloatingContact';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setDarkMode(false);
    } else {
        setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen flex flex-col relative overflow-x-hidden">
      
      {/* Centralized Animated Background */}
      <GalaxyBackground darkMode={darkMode} />

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      
      <FloatingContact />
      <Footer />
    </div>
  );
};

export default App;
