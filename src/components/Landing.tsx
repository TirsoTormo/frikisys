import React, { useState, useEffect, useRef } from 'react';
import ArticleCard, { Article } from './ArticleCard';

export interface LandingProps {
  onNavigateToSection: (category: string) => void;
  onArticleClick: (articleId: string) => void;
  featuredArticles: Article[];
}

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000, startOnMount: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnMount) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        },
        { threshold: 0.5 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [startOnMount, hasStarted]);

  useEffect(() => {
    if (!startOnMount && !hasStarted) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted, startOnMount]);

  return { count, ref };
};

// Stat item component
const StatItem: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = '' }) => {
  const { count, ref } = useAnimatedCounter(value, 1500);

  return (
    <div ref={ref} className="flex flex-col items-center p-4">
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-4xl md:text-5xl font-bold text-text-primary tabular-nums">
          {count}
        </span>
        <span className="font-mono text-xl text-accent">{suffix}</span>
      </div>
      <span className="font-mono text-sm text-text-muted mt-1">{label}</span>
      {/* Bouncing pixel decoration */}
      <div className="flex gap-1 mt-2">
        <div className="w-1.5 h-1.5 bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

const Landing: React.FC<LandingProps> = ({ onNavigateToSection, onArticleClick, featuredArticles }) => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = (category: string) => {
    onNavigateToSection(category);
  };

  return (
    <div className="min-h-full py-8 px-4">
      {/* Hero Section */}
      <section 
        className={`text-center mb-16 transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Logo/Title with pixel decoration */}
        <div className="relative inline-block mb-6">
          {/* Pixel corners */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-pixel-dark" />
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-pixel-dark" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pixel-dark" />
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-pixel-dark" />
          
          <h1 className="font-mono text-5xl md:text-6xl font-bold text-text-primary relative">
            <span className="relative z-10">Frikisys</span>
            {/* Glitch effect on hover */}
            <span className="absolute inset-0 text-accent opacity-0 hover:opacity-70 transition-opacity blur-sm">
              Frikisys
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <h2 className="font-mono text-xl md:text-2xl text-accent mb-4">
          La wiki que los SysAdmins merecemos
        </h2>

        {/* Description */}
        <p className="font-mono text-sm md:text-base text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
          Documentación práctica, comandos esenciales y guías de troubleshooting 
          para profesionales de infraestructura Linux y virtualización.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleCTAClick('linux')}
            className="group px-8 py-4 bg-accent hover:bg-accent-hover text-base-bg font-mono text-sm font-semibold rounded-pixel transition-all hover:shadow-pixel-md relative overflow-hidden"
          >
            {/* Pixel decoration */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-pixel-light" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-pixel-light" />
            
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Explorar Linux
            </span>
          </button>

          <button
            onClick={() => handleCTAClick('virtualizacion')}
            className="group px-8 py-4 bg-base-card border-2 border-accent hover:border-accent-hover text-text-primary font-mono text-sm font-semibold rounded-pixel transition-all hover:shadow-pixel-md relative overflow-hidden"
          >
            {/* Pixel decoration */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-accent" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent" />
            
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
              Explorar Virtualización
            </span>
          </button>
        </div>

        {/* Decorative pixel grid */}
        <div className="mt-12 opacity-20">
          <div 
            className="h-px w-full max-w-md mx-auto"
            style={{
              background: 'repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 4px, transparent 4px, transparent 8px)'
            }}
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mb-16">
        <div className="bg-base-card border border-base-border rounded-pixel p-8 shadow-pixel-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatItem value={17} label="artículos" />
            <StatItem value={2} label="categorías" />
            <StatItem value={100} label="% español" suffix="%" />
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="mb-16">
        <div className="pixel-separator mb-8">
          <h2 className="font-mono text-2xl font-bold text-text-primary px-4">
            Artículos destacados
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <div
              key={article.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ArticleCard 
                article={article} 
                onClick={onArticleClick}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-base-border pt-8 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-text-muted">Frikisys</span>
            <span className="font-mono text-xs text-text-muted">v0.1.0</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-text-primary transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>

            <a
              href="/legal/licencia"
              className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Licencia MIT
            </a>
          </div>
        </div>

        {/* Pixel decoration */}
        <div className="flex justify-center gap-1 mt-6 opacity-30">
          <div className="w-2 h-2 bg-accent" />
          <div className="w-2 h-2 bg-accent" />
          <div className="w-2 h-2 bg-accent" />
          <div className="w-2 h-2 bg-accent" />
          <div className="w-2 h-2 bg-accent" />
        </div>
      </footer>

      {/* CSS for fade-in-up animation */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Landing;