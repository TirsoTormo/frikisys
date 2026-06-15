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

// Categories data
const categories = [
  { id: 'linux', name: 'Linux', icon: 'tux', color: '#FCC624', description: 'Comandos, permisos, procesos y troubleshooting' },
  { id: 'virtualizacion', name: 'Virtualización', icon: 'server', color: '#2684FF', description: 'Docker, KVM, LXC, VMware y más' },
  { id: 'redes', name: 'Redes', icon: 'network', color: '#00E676', description: 'DNS, firewall, VPN y tcpdump' },
  { id: 'seguridad', name: 'Seguridad', icon: 'shield', color: '#FF5722', description: 'Hardening, fail2ban y auditoría' },
  { id: 'bases-de-datos', name: 'Bases de Datos', icon: 'database', color: '#9C27B0', description: 'PostgreSQL, MySQL, MongoDB y Redis' },
  { id: 'cloud', name: 'Cloud', icon: 'cloud', color: '#00BCD4', description: 'AWS, Kubernetes, Terraform y CI/CD' },
];

// Category icons as SVG components
const CategoryIcon: React.FC<{ icon: string; color: string }> = ({ icon, color }) => {
  const icons: Record<string, React.ReactNode> = {
    tux: (
      <svg viewBox="0 0 24 24" fill={color} className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    server: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-8 h-8">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    network: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-8 h-8">
        <circle cx="12" cy="5" r="3"/>
        <circle cx="5" cy="19" r="3"/>
        <circle cx="19" cy="19" r="3"/>
        <line x1="12" y1="8" x2="5" y2="16"/>
        <line x1="12" y1="8" x2="19" y2="16"/>
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    database: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-8 h-8">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-8 h-8">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
      </svg>
    ),
  };
  
  return <>{icons[icon]}</>;
};

// Terminal preview component
const TerminalPreview: React.FC = () => {
  const [activeLine, setActiveLine] = useState(0);
  
  const lines = [
    { cmd: '$', text: 'cat /etc/os-release', delay: 0 },
    { cmd: '', text: 'NAME="Ubuntu"', delay: 300 },
    { cmd: '', text: 'VERSION="22.04.3 LTS (Jammy Jellyfish)"', delay: 400 },
    { cmd: '', text: 'ID=ubuntu', delay: 500 },
    { cmd: '$', text: 'docker ps', delay: 800 },
    { cmd: '', text: 'CONTAINER ID   IMAGE      STATUS', delay: 1100 },
    { cmd: '', text: 'a1b2c3d4e5f6   nginx      Up 2 hours', delay: 1200 },
    { cmd: '$', text: 'htop', delay: 1600 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine(prev => prev < lines.length - 1 ? prev + 1 : prev);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#30363d] overflow-hidden shadow-2xl">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"/>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"/>
        <div className="w-3 h-3 rounded-full bg-[#27c93f]"/>
        <span className="ml-4 font-mono text-xs text-[#8b949e]">frikisys ~ bash</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm space-y-1">
        {lines.slice(0, activeLine + 1).map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            {line.cmd && <span className="text-accent">{line.cmd}</span>}
            <span className={line.cmd ? 'text-[#e6edf3]' : 'text-[#8b949e]'}>
              {line.text}
            </span>
          </div>
        ))}
        {activeLine < lines.length - 1 && (
          <div className="inline-block w-2 h-4 bg-accent animate-pulse ml-2"/>
        )}
      </div>
    </div>
  );
};

// Feature card component
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-4 bg-base-card border border-base-border rounded-pixel hover:border-accent transition-colors group cursor-pointer">
    <div className="mb-3 text-accent group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="font-mono text-sm font-semibold text-text-primary mb-1">{title}</h3>
    <p className="font-mono text-xs text-text-muted">{description}</p>
  </div>
);

const Landing: React.FC<LandingProps> = ({ onNavigateToSection, onArticleClick, featuredArticles }) => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>,
      title: 'Comandos verificados',
      description: 'Cada comando está probado en entornos reales'
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
      title: 'Actualizado',
      description: 'Contenido mantenido por la comunidad'
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
      title: '100% Español',
      description: 'Documentación en tu idioma'
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
      title: 'Código abierto',
      description: 'Edita y contribuye en GitHub'
    },
  ];

  return (
    <div className="min-h-full py-8 px-4">
      {/* Hero Section */}
      <section className={`text-center mb-16 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Title */}
        <h1 className="font-mono text-4xl md:text-6xl font-bold text-text-primary mb-4">
          <span className="bg-gradient-to-r from-accent to-[#00E5FF] bg-clip-text text-transparent">
            Frikisys
          </span>
        </h1>
        
        <p className="font-mono text-lg md:text-xl text-text-secondary mb-2">
          Wiki de SysAdmin & SysOps en español
        </p>
        
        <p className="font-mono text-sm text-text-muted max-w-xl mx-auto mb-8">
          Comandos que funcionan. Guías que ahorran horas. Troubleshooting real.
        </p>

        {/* Terminal Preview */}
        <div className="max-w-2xl mx-auto mb-10">
          <TerminalPreview />
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onNavigateToSection('linux')}
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-base-bg font-mono text-sm font-semibold rounded-pixel transition-all hover:shadow-pixel-md cursor-pointer"
          >
            Empezar a explorar
          </button>
          <a
            href="https://github.com/TirsoTormo/frikisys"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-base-card border border-accent text-text-primary font-mono text-sm font-semibold rounded-pixel transition-all hover:border-accent-hover hover:shadow-pixel-md cursor-pointer"
          >
            Ver en GitHub
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-16">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center p-4 bg-base-card border border-base-border rounded-pixel">
            <div className="font-mono text-3xl md:text-4xl font-bold text-accent">42</div>
            <div className="font-mono text-xs text-text-muted mt-1">artículos</div>
          </div>
          <div className="text-center p-4 bg-base-card border border-base-border rounded-pixel">
            <div className="font-mono text-3xl md:text-4xl font-bold text-accent">6</div>
            <div className="font-mono text-xs text-text-muted mt-1">categorías</div>
          </div>
          <div className="text-center p-4 bg-base-card border border-base-border rounded-pixel">
            <div className="font-mono text-3xl md:text-4xl font-bold text-accent">100%</div>
            <div className="font-mono text-xs text-text-muted mt-1">español</div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mb-16">
        <div className="pixel-separator mb-6">
          <h2 className="font-mono text-xl font-bold text-text-primary px-4">
            Explorar por categoría
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigateToSection(cat.id)}
              className="group p-5 bg-base-card border border-base-border rounded-pixel hover:border-[var(--accent)] transition-all text-left cursor-pointer"
              style={{ '--accent': cat.color } as React.CSSProperties}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CategoryIcon icon={cat.icon} color={cat.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="font-mono text-xs text-text-muted leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <svg className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-16">
        <div className="pixel-separator mb-6">
          <h2 className="font-mono text-xl font-bold text-text-primary px-4">
            Por qué Frikisys
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-16">
          <div className="pixel-separator mb-6">
            <h2 className="font-mono text-xl font-bold text-text-primary px-4">
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
      )}

      {/* CTA Final */}
      <section className="text-center py-8 px-4 bg-base-card border border-base-border rounded-pixel">
        <h2 className="font-mono text-lg font-semibold text-text-primary mb-2">
          ¿Falta algo?
        </h2>
        <p className="font-mono text-sm text-text-muted mb-4">
          Ayúdanos a hacer Frikisys mejor. Abre un issue o envía un PR.
        </p>
        <a
          href="https://github.com/TirsoTormo/frikisys/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-base-bg font-mono text-sm font-semibold rounded-pixel transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Contribuir en GitHub
        </a>
      </section>

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
