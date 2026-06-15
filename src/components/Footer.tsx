import React from 'react';

export interface FooterProps {
  version?: string;
  onLinkClick?: (section: string) => void;
  onShowAISkills?: () => void;
  onLegalClick?: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ version = '0.1.0', onLinkClick, onShowAISkills, onLegalClick }) => {
  const currentYear = new Date().getFullYear();

  const links = {
    recursos: [
      { label: 'Documentación', href: '#' },
      { label: 'Comandos', href: '#' },
      { label: 'Cheatsheets', href: '#' },
    ],
    comunidad: [
      { label: 'GitHub', href: 'https://github.com/TirsoTormo/frikisys', icon: '💻', external: true },
      { label: 'Contribuir', href: 'https://github.com/TirsoTormo/frikisys/blob/main/CONTRIBUTING.md', icon: '🤝', external: true },
    ],
    legal: [
      { label: 'Licencia MIT', href: '#', icon: '📜' },
      { label: 'Privacidad', href: '#', icon: '🔒' },
      { label: 'Términos', href: '#', icon: '📋' },
    ],
  };

  return (
    <footer className="bg-base-card border-t-2 border-base-border mt-auto">
      {/* Top accent line with pixel decoration */}
      <div className="h-1 bg-gradient-to-r from-[#6b7280] via-[#9ca3af] to-[#6b7280]" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand section with more color */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 32 32" 
                  className="pixel-icon"
                >
                  <rect x="2" y="4" width="28" height="24" fill="#1a1a1a" stroke="#6b7280" strokeWidth="2"/>
                  <rect x="6" y="8" width="4" height="4" fill="#6b7280"/>
                  <rect x="12" y="8" width="4" height="4" fill="#9ca3af"/>
                  <rect x="18" y="8" width="4" height="4" fill="#6b7280"/>
                  <rect x="6" y="14" width="14" height="4" fill="#404040"/>
                  <rect x="6" y="20" width="8" height="4" fill="#6b7280"/>
                </svg>
                {/* Pixel glow effect */}
                <div className="absolute inset-0 blur-sm bg-accent/20 -z-10" />
              </div>
              <span className="font-mono text-lg font-bold text-text-primary">
                Frikisys
              </span>
            </div>
            <p className="font-mono text-xs text-text-muted leading-relaxed mb-4">
              Wiki de SysAdmin y SysOps en español. 
              Documentación práctica para profesionales.
            </p>
            
            {/* AI Skills button */}
            <button
              onClick={onShowAISkills}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#6b7280]/20 to-[#9ca3af]/20 border border-accent/30 rounded-pixel hover:border-accent hover:shadow-pixel-sm transition-all group"
            >
              <span className="text-accent group-hover:animate-pulse">⚡</span>
              <span className="font-mono text-xs text-text-secondary group-hover:text-text-primary transition-colors">
                AI Skills
              </span>
            </button>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
              <span className="text-accent">▸</span> Recursos
            </h3>
            <ul className="space-y-2">
              {links.recursos.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onLinkClick?.(link.label)}
                    className="font-mono text-xs text-text-muted hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
              <span className="text-accent">▸</span> Comunidad
            </h3>
            <ul className="space-y-2">
              {links.comunidad.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="font-mono text-xs text-text-muted hover:text-accent transition-colors flex items-center gap-2 group no-underline"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{link.icon}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Now complete with 3 functional pages */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
              <span className="text-accent">▸</span> Legal
            </h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onLegalClick?.(link.label)}
                    className="font-mono text-xs text-text-muted hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{link.icon}</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar with pixel decoration */}
        <div className="pt-6 border-t border-base-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright with gradient text */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-text-muted">
                © {currentYear} <span className="text-text-secondary">Frikisys</span>. Todos los derechos reservados.
              </span>
            </div>

            {/* Version and pixel decoration */}
            <div className="flex items-center gap-4">
              {/* Animated pixel art decoration */}
              <div className="hidden md:flex items-center gap-1">
                <div className="w-1 h-1 bg-[#6b7280] rounded-sm animate-pulse" />
                <div className="w-1 h-1 bg-[#9ca3af] rounded-sm animate-pulse" style={{ animationDelay: '100ms' }} />
                <div className="w-1 h-1 bg-[#6b7280] rounded-sm animate-pulse" style={{ animationDelay: '200ms' }} />
                <div className="w-1 h-1 bg-[#9ca3af] rounded-sm animate-pulse" style={{ animationDelay: '300ms' }} />
                <div className="w-1 h-1 bg-[#6b7280] rounded-sm animate-pulse" style={{ animationDelay: '400ms' }} />
              </div>
              
              <span className="font-mono text-xs px-2 py-1 bg-base-bg border border-base-border rounded-sm text-text-muted">
                v{version}
              </span>

              {/* Animated pixel art decoration */}
              <div className="hidden md:flex items-center gap-1">
                <div className="w-1 h-1 bg-[#6b7280] rounded-sm animate-pulse" style={{ animationDelay: '400ms' }} />
                <div className="w-1 h-1 bg-[#9ca3af] rounded-sm animate-pulse" style={{ animationDelay: '300ms' }} />
                <div className="w-1 h-1 bg-[#6b7280] rounded-sm animate-pulse" style={{ animationDelay: '200ms' }} />
                <div className="w-1 h-1 bg-[#9ca3af] rounded-sm animate-pulse" style={{ animationDelay: '100ms' }} />
                <div className="w-1 h-1 bg-[#6b7280] rounded-sm animate-pulse" style={{ animationDelay: '0ms' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;