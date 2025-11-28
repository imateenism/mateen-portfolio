import React, { useEffect, useRef } from 'react';

interface GalaxyBackgroundProps {
  darkMode: boolean;
}

const GalaxyBackground: React.FC<GalaxyBackgroundProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Ref to track dark mode status inside the animation loop without restarting it
  const isDarkRef = useRef(darkMode);
  
  // Theme interpolation factor: 0 = Light Mode, 1 = Dark Mode
  // We use this to smoothly morph particles between states
  const themeFactor = useRef(darkMode ? 1 : 0);

  useEffect(() => {
    isDarkRef.current = darkMode;
  }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    
    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    window.addEventListener('resize', handleResize);
    
    // Initial dimensions
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const meteors: Meteor[] = [];

    // --- Particle Class (Stars for Dark, Dust for Light) ---
    class Particle {
      x: number;
      y: number;
      baseSize: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      
      // Twinkle properties
      twinklePhase: number;
      twinkleSpeed: number;
      
      // Configuration for Light Mode (Pastel Dust)
      lightColor = { r: 56, g: 189, b: 248 }; // Cyan-400
      lightSizeMult = 4.0; // Much larger for soft bokeh effect
      
      // Configuration for Dark Mode (Stars)
      darkColor = { r: 255, g: 255, b: 255 }; // White
      darkSizeMult = 0.7; // Smaller for distant star feel

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Bias towards smaller base sizes for realism
        this.baseSize = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.15; // Very slow drift
        this.vy = (Math.random() - 0.5) * 0.15;
        this.baseAlpha = Math.random() * 0.6 + 0.2;
        
        // Randomize twinkle
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.002 + 0.0005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(factor: number, time: number) {
        if (!ctx) return;

        // Linear Interpolation (Lerp) for Color
        const r = this.lightColor.r + (this.darkColor.r - this.lightColor.r) * factor;
        const g = this.lightColor.g + (this.darkColor.g - this.lightColor.g) * factor;
        const b = this.lightColor.b + (this.darkColor.b - this.lightColor.b) * factor;

        // Lerp for Size (Stars vs Dust)
        const currentSizeMult = this.lightSizeMult + (this.darkSizeMult - this.lightSizeMult) * factor;
        const currentSize = this.baseSize * currentSizeMult;

        // Alpha Calculation
        let currentAlpha = this.baseAlpha;

        // Light Mode: Particles should be very transparent "dust" (factor near 0)
        // Dark Mode: Particles should be brighter "stars" (factor near 1)
        const visibilityCurve = 0.15 + 0.85 * factor; // 0.15 (Light) -> 1.0 (Dark)
        currentAlpha *= visibilityCurve;

        // Twinkle Effect (Mostly active in Dark Mode)
        if (factor > 0.5) {
            const twinkle = Math.sin(time * this.twinkleSpeed + this.twinklePhase);
            // Twinkle modulates alpha between 70% and 100% of its value
            const twinkleFactor = 0.85 + 0.15 * twinkle; 
            currentAlpha *= twinkleFactor;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${currentAlpha})`;
        ctx.fill();
      }
    }

    // --- Meteor Class (Dark Mode Only) ---
    class Meteor {
      x: number;
      y: number;
      len: number;
      speed: number;
      size: number;
      active: boolean;
      waitTime: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = 0;
        this.len = Math.random() * 80 + 20;
        this.speed = Math.random() * 5 + 5;
        this.size = Math.random() * 1 + 0.5;
        this.active = false;
        this.waitTime = Math.random() * 200;
      }

      reset() {
        this.x = Math.random() * width + 200; 
        this.y = -100;
        this.active = false;
        this.waitTime = Math.random() * 500 + 200; // Random delay between meteors
      }

      update() {
        if (this.active) {
          this.x -= this.speed;
          this.y += this.speed;
          if (this.x < -this.len || this.y > height + this.len) {
            this.reset();
          }
        } else {
          this.waitTime--;
          if (this.waitTime <= 0) {
            this.active = true;
          }
        }
      }

      draw(factor: number) {
        // Only draw meteors if we are mostly in Dark Mode
        if (!ctx || !this.active || factor < 0.5) return;
        
        // Opacity based on theme factor (fade out when switching to light)
        const alpha = (factor - 0.5) * 2; // Normalize 0.5->1 to 0->1

        ctx.save();
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.len, this.y - this.len);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineCap = "round";
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.len, this.y - this.len);
        ctx.stroke();
        ctx.restore();
      }
    }

    const init = () => {
      particles.length = 0;
      meteors.length = 0;
      
      const particleCount = Math.floor((width * height) / 10000); // Responsive density
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      
      for (let i = 0; i < 3; i++) {
        meteors.push(new Meteor());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      const time = Date.now();

      // Smoothly interpolate the theme factor based on current mode
      const targetFactor = isDarkRef.current ? 1 : 0;
      // Easing function: Move 5% towards target per frame
      themeFactor.current += (targetFactor - themeFactor.current) * 0.05;

      ctx.clearRect(0, 0, width, height);
      
      // Draw Particles
      particles.forEach(p => {
        p.update();
        p.draw(themeFactor.current, time);
      });

      // Draw Meteors
      meteors.forEach(m => {
        m.update();
        m.draw(themeFactor.current);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures canvas loop runs continuously

  return (
    <div className="fixed inset-0 -z-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-1000">
      
      {/* --- Ambient Gradients (CSS Layer for Performance) --- */}
      
      {/* Dark Mode: Nebula Gradients */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${darkMode ? 'opacity-100' : 'opacity-0'}`}
      >
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px] animate-blob" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* Light Mode: Pastel Gradients */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${darkMode ? 'opacity-0' : 'opacity-100'}`}
      >
         <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-cyan-200/40 rounded-full blur-[100px] animate-blob mix-blend-multiply" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-pink-200/40 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply" />
      </div>

      {/* --- Detailed Particles (Canvas Layer) --- */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      
    </div>
  );
};

export default GalaxyBackground;