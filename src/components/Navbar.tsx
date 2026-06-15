import React, { useState } from 'react';

interface NavbarProps {
  onSearch?: (query: string) => void;
  onLogoClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onLogoClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
      onSearch?.('');
    }
  };

  const handleLogoClick = () => {
    onLogoClick?.();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-base-card border-b border-base-border z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            {/* Pixel art terminal icon */}
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              className="pixel-icon"
            >
              <rect x="2" y="4" width="28" height="24" fill="#1a1a1a" stroke="#6b7280" strokeWidth="2"/>
              <rect x="6" y="8" width="4" height="4" fill="#6b7280"/>
              <rect x="12" y="8" width="4" height="4" fill="#6b7280"/>
              <rect x="18" y="8" width="4" height="4" fill="#6b7280"/>
              <rect x="6" y="14" width="14" height="4" fill="#404040"/>
              <rect x="6" y="20" width="8" height="4" fill="#404040"/>
            </svg>
          </div>
          <span className="font-mono text-xl font-bold text-text-primary tracking-tight">
            Frikisys
          </span>
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar artículos, comandos, configuraciones..."
              className="w-full h-10 px-4 pl-10 bg-base-bg border border-base-border rounded-pixel font-mono text-sm text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
            />
            {/* Search icon */}
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {/* Pixel decoration */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5">
              <div className="w-1 h-1 bg-pixel-dark"/>
              <div className="w-1 h-1 bg-pixel-light"/>
              <div className="w-1 h-1 bg-pixel-dark"/>
            </div>
          </div>
        </form>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Contribuir button */}
          <a
            href="https://github.com/TirsoTormo/frikisys/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-base-hover rounded transition-colors border border-base-border"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span className="font-mono text-sm">Contribuir</span>
          </a>
          
          {/* GitHub link */}
          <a
            href="https://github.com/TirsoTormo/frikisys"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-base-hover rounded transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
