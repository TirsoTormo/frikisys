import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Sidebar, ArticleGrid, ArticleViewer, Footer } from './components';
import { Article, CodeBlock } from './components';
import Landing from './components/Landing';
import { 
  allArticleCards, 
  getArticleById, 
  contentToMarkdown,
  contentToCodeBlocks,
  ArticleContent 
} from './utils/contentLoader';

type View = 'home' | 'article' | 'legal';
type LegalPage = 'licencia' | 'privacidad' | 'terminos' | null;

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('linux');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAISkills, setShowAISkills] = useState(false);
  const [legalPage, setLegalPage] = useState<LegalPage>(null);
  const [showLanding, setShowLanding] = useState(true); // Track if landing is shown
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top when view changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [currentView, selectedArticleId]);

  // Handle landing navigation - CTA buttons
  const handleNavigateToSection = (category: string) => {
    setActiveCategory(category);
    setShowLanding(false); // Hide landing, show article grid
    setCurrentView('home');
  };

  const handleLandingArticleClick = (articleId: string) => {
    const article = allArticleCards.find((a) => a.id === articleId);
    if (article) {
      setSelectedArticleId(articleId);
      setCurrentView('article');
    }
  };

  // Get featured articles (top 3)
  const featuredArticles = allArticleCards.slice(0, 3);

  // Get articles based on category or search
  const getDisplayedArticles = (): Article[] => {
    let articles = allArticleCards;
    
    // Filter by category if not searching
    if (!searchQuery && activeCategory) {
      const categoryName = activeCategory === 'linux' ? 'Linux' : 'Virtualización';
      articles = articles.filter(a => a.category === categoryName);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      articles = allArticleCards.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return articles;
  };

  const handleArticleClick = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentView('article');
  };

  const handleBackToHome = () => {
    setSelectedArticleId(null);
    setCurrentView('home');
  };

  const handleLogoClick = () => {
    setCurrentView('home');
    setSelectedArticleId(null);
    setShowAISkills(false);
    setShowLanding(true); // Reset to landing on logo click
    setSearchQuery(''); // Clear search on logo click
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setShowLanding(false); // Hide landing when searching
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowLanding(false); // Hide landing when selecting category from sidebar
  };

  const handleLegalClick = (section: string) => {
    if (section === 'Licencia MIT' || section === 'Licencia') {
      setLegalPage('licencia');
    } else if (section === 'Privacidad') {
      setLegalPage('privacidad');
    } else if (section === 'Términos') {
      setLegalPage('terminos');
    }
    setCurrentView('legal');
  };

  const handleBackFromLegal = () => {
    setLegalPage(null);
    setCurrentView('home');
  };

  // Get selected article content for viewing
  const getSelectedArticleContent = (): { article: ArticleContent; markdown: string; codeBlocks: CodeBlock[] } | null => {
    if (!selectedArticleId) return null;
    const article = getArticleById(selectedArticleId);
    if (!article) return null;
    return {
      article,
      markdown: contentToMarkdown(article.contenido),
      codeBlocks: contentToCodeBlocks(article.contenido),
    };
  };

  return (
    <div className="min-h-screen bg-base-bg flex flex-col">
      {/* Navbar */}
      <Navbar onSearch={handleSearch} onLogoClick={handleLogoClick} />

      {/* Sidebar */}
      <Sidebar
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content - scrolling container */}
      <main
        ref={mainContentRef}
        className={`flex-1 pt-16 pb-16 transition-all duration-300 overflow-y-auto h-[calc(100vh-64px)] ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div className="p-6 max-w-7xl mx-auto">
          {showAISkills ? (
            <>
              {/* AI Skills Section */}
              <div className="mb-8">
                <button
                  onClick={() => setShowAISkills(false)}
                  className="flex items-center gap-2 mb-6 text-text-secondary hover:text-text-primary transition-colors group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-mono text-sm">Volver</span>
                </button>
                
                <div className="pixel-separator mb-6">
                  <h1 className="font-mono text-3xl md:text-4xl font-bold text-text-primary px-4 flex items-center gap-3">
                    <span className="text-accent animate-pulse">⚡</span>
                    AI Skills
                  </h1>
                </div>
                <p className="font-mono text-text-secondary max-w-2xl mx-auto mb-8 text-center">
                  Commands powered by AI. Type a SysAdmin task and get instant help.
                </p>

                {/* AI Input */}
                <div className="max-w-3xl mx-auto">
                  <div className="bg-base-card border border-base-border rounded-pixel p-6 shadow-pixel-md">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Ej: '¿Cómo configuro un firewall en Linux?'"
                          className="w-full h-12 px-4 pl-12 bg-base-bg border border-base-border rounded-pixel font-mono text-sm text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="square" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <button className="px-6 h-12 bg-accent hover:bg-accent-hover text-base-bg font-mono text-sm font-semibold rounded-pixel transition-colors">
                        Ask AI
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { icon: '🛡️', title: 'Hardening', desc: 'Seguridad del sistema' },
                      { icon: '📊', title: 'Monitoring', desc: 'Monitoreo y alertas' },
                      { icon: '🔧', title: 'Troubleshooting', desc: 'Diagnóstico rápido' },
                    ].map((skill) => (
                      <button
                        key={skill.title}
                        className="p-4 bg-base-card border border-base-border rounded-pixel hover:border-accent hover:shadow-pixel-sm transition-all group text-left"
                      >
                        <div className="text-2xl mb-2">{skill.icon}</div>
                        <h3 className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                          {skill.title}
                        </h3>
                        <p className="font-mono text-xs text-text-muted">{skill.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Fun pixel decoration */}
                  <div className="mt-8 flex justify-center gap-2">
                    <div className="w-3 h-3 bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-3 h-3 bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-3 h-3 bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </>
          ) : currentView === 'home' ? (
            showLanding && !searchQuery ? (
              <Landing
                onNavigateToSection={handleNavigateToSection}
                onArticleClick={handleLandingArticleClick}
                featuredArticles={featuredArticles}
              />
            ) : (
              <ArticleGrid
                articles={getDisplayedArticles()}
                onArticleClick={handleArticleClick}
                title={searchQuery ? `Resultados para "${searchQuery}"` : 'Artículos'}
                emptyMessage={searchQuery ? 'No se encontraron resultados' : 'No hay artículos'}
                columns={3}
              />
            )
          ) : currentView === 'legal' ? (
            <>
              {/* Legal Pages */}
              <div className="max-w-3xl mx-auto">
                <button
                  onClick={handleBackFromLegal}
                  className="flex items-center gap-2 mb-6 text-text-secondary hover:text-text-primary transition-colors group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-mono text-sm">Volver</span>
                </button>

                {legalPage === 'licencia' && (
                  <article className="bg-base-card border border-base-border rounded-pixel p-8">
                    <h1 className="font-mono text-2xl font-bold text-text-primary mb-6 pb-4 border-b border-base-border">
                      Licencia MIT
                    </h1>
                    <div className="prose prose-invert max-w-none space-y-4">
                      <p className="font-mono text-sm text-text-secondary">
                        Copyright (c) {new Date().getFullYear()} Frikisys
                      </p>
                      <p className="font-mono text-sm text-text-secondary">
                        Por la presente se concede permiso, sin cargo, a cualquier persona que obtenga una copia de este software...
                      </p>
                      <div className="bg-base-bg p-4 rounded-pixel border border-base-border font-mono text-xs text-text-muted overflow-x-auto">
{`MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.`}
                      </div>
                    </div>
                  </article>
                )}

                {legalPage === 'privacidad' && (
                  <article className="bg-base-card border border-base-border rounded-pixel p-8">
                    <h1 className="font-mono text-2xl font-bold text-text-primary mb-6 pb-4 border-b border-base-border">
                      Política de Privacidad
                    </h1>
                    <div className="space-y-6">
                      <section>
                        <h2 className="font-mono text-lg font-semibold text-text-primary mb-2">Datos que recopilamos</h2>
                        <p className="font-mono text-sm text-text-secondary">
                          Frikisys no recopila datos personales. Solo almacenamos localmente tus preferencias de navegación.
                        </p>
                      </section>
                      <section>
                        <h2 className="font-mono text-lg font-semibold text-text-primary mb-2">Cookies</h2>
                        <p className="font-mono text-sm text-text-secondary">
                          Utilizamos cookies técnicas esenciales para el funcionamiento del sitio. No rastreamos tu actividad.
                        </p>
                      </section>
                      <section>
                        <h2 className="font-mono text-lg font-semibold text-text-primary mb-2">Contacto</h2>
                        <p className="font-mono text-sm text-text-secondary">
                          Para cualquier consulta sobre privacidad: privacy@frikisys.dev
                        </p>
                      </section>
                    </div>
                  </article>
                )}

                {legalPage === 'terminos' && (
                  <article className="bg-base-card border border-base-border rounded-pixel p-8">
                    <h1 className="font-mono text-2xl font-bold text-text-primary mb-6 pb-4 border-b border-base-border">
                      Términos de Servicio
                    </h1>
                    <div className="space-y-6">
                      <section>
                        <h2 className="font-mono text-lg font-semibold text-text-primary mb-2">Uso aceptable</h2>
                        <p className="font-mono text-sm text-text-secondary">
                          Frikisys es una wiki de documentación técnica. El contenido es para fines educativos y profesionales.
                        </p>
                      </section>
                      <section>
                        <h2 className="font-mono text-lg font-semibold text-text-primary mb-2">Contenido</h2>
                        <p className="font-mono text-sm text-text-secondary">
                          El contenido de Frikisys se proporciona "tal cual". No garantizamos la exactitud completa de la información.
                        </p>
                      </section>
                      <section>
                        <h2 className="font-mono text-lg font-semibold text-text-primary mb-2">Contribuciones</h2>
                        <p className="font-mono text-sm text-text-secondary">
                          Las contribuciones son bienvenidas bajo licencia MIT. Al contribuir aceptas que tu trabajo sea publicado bajo esta licencia.
                        </p>
                      </section>
                    </div>
                  </article>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Article Viewer */}
              {(() => {
                const content = getSelectedArticleContent();
                if (!content) return null;
                return (
                  <ArticleViewer
                    title={content.article.titulo}
                    category={content.article.categoria === 'linux' ? 'Linux' : 'Virtualización'}
                    content={content.markdown}
                    codeBlocks={content.codeBlocks}
                    tags={content.article.contenido
                      .filter(b => b.tipo === 'comando')
                      .slice(0, 5)
                      .map((_, i) => `tema-${i + 1}`)}
                    onBack={handleBackToHome}
                  />
                );
              })()}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer version="0.1.0" onShowAISkills={() => setShowAISkills(true)} onLegalClick={handleLegalClick} />
    </div>
  );
}

export default App;
