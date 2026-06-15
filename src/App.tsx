import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Helmet } from 'react-helmet-async';
import { Navbar, Sidebar, ArticleGrid, ArticleViewer, Footer } from './components';
import { Article, CodeBlock } from './components';
import Landing from './components/Landing';
import { 
  allArticleCards, 
  getArticleById, 
  contentToMarkdown,
  contentToCodeBlocks,
  getTagsForArticle,
  ArticleContent 
} from './utils/contentLoader';
import { usePopularArticles } from './hooks/usePopularArticles';

type View = 'home' | 'article' | 'legal' | 'tag';
type LegalPage = 'licencia' | 'privacidad' | 'terminos' | null;

// Category display names mapping
const categoryDisplayNames: Record<string, string> = {
  linux: 'Linux',
  virtualizacion: 'Virtualización',
  redes: 'Redes',
  seguridad: 'Seguridad',
  'bases-de-datos': 'Bases de Datos',
  cloud: 'Cloud',
};

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Linux');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAISkills, setShowAISkills] = useState(false);
  const [legalPage, setLegalPage] = useState<LegalPage>(null);
  const [showLanding, setShowLanding] = useState(true); // Track if landing is shown
  const [activeTag, setActiveTag] = useState<string | null>(null); // Track active tag filter
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Track popular articles
  const { views, trackView } = usePopularArticles();
  
  // Get popular articles (top 12 by views)
  const popularArticles = allArticleCards
    .map(article => ({
      ...article,
      views: views[article.id] || 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 12);

  // Scroll to top when view changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [currentView, selectedArticleId]);

  // Handle landing navigation - CTA buttons
  const handleNavigateToSection = (category: string) => {
    const categoryMap: Record<string, string> = {
      linux: 'Linux',
      virtualizacion: 'Virtualización',
    };
    setActiveCategory(categoryMap[category] || category);
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

  // Get featured articles (marked as destacado in JSON)
  const featuredArticles = allArticleCards.filter(a => a.destacado).slice(0, 6);

  // Get articles based on category or search
  const getDisplayedArticles = (): Article[] => {
    let articles = allArticleCards;
    
    // Filter by category if not searching
    if (!searchQuery && activeCategory) {
      articles = articles.filter(a => a.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      articles = allArticleCards.filter(a =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query) ||
        a.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (a.contentText && a.contentText.includes(query))
      );
    }
    
    return articles;
  };

  const handleArticleClick = (articleId: string) => {
    trackView(articleId);
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
    setActiveTag(null); // Clear tag filter when searching
    if (query) {
      setShowLanding(false); // Hide landing when searching
      setCurrentView('home');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShowLanding(false); // Hide landing when selecting category from sidebar
    setSearchQuery(''); // Clear search to ensure filtering works
    setActiveTag(null); // Clear tag filter
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    setCurrentView('tag');
    setShowLanding(false);
  };

  const handleBackFromTag = () => {
    setActiveTag(null);
    setCurrentView('home');
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

  // Get dynamic page title and meta
  const getPageMeta = (): { title: string; desc: string; canonical: string; ogType: string; articleData: ArticleContent | null } => {
    const BASE_URL = 'https://frikisys.vercel.app';
    const BASE_TITLE = 'Frikisys - Wiki SysAdmin & SysOps en Español';
    const BASE_DESC = 'Wiki de SysAdmin y SysOps en español. Comandos, tutoriales y guías prácticas para administradores de sistemas Linux y virtualización.';

    if (currentView === 'article' && selectedArticleId) {
      const articleData = getArticleById(selectedArticleId);
      if (articleData) {
        const title = `${articleData.titulo} | Frikisys`;
        const desc = articleData.descripcion;
        const canonical = `${BASE_URL}/articulo/${selectedArticleId}`;
        return { title, desc, canonical, ogType: 'article', articleData };
      }
    }
    if (activeTag) {
      return { title: `#${activeTag} | Frikisys`, desc: `Artículos sobre ${activeTag}`, canonical: `${BASE_URL}/tag/${activeTag}`, ogType: 'website', articleData: null };
    }
    if (currentView === 'legal') {
      const titles: Record<string, string> = { licencia: 'Licencia MIT', privacidad: 'Política de Privacidad', terminos: 'Términos de Servicio' };
      return { title: `${titles[legalPage!] || 'Legal'} | Frikisys`, desc: BASE_DESC, canonical: `${BASE_URL}/legal/${legalPage}`, ogType: 'website', articleData: null };
    }
    return { title: BASE_TITLE, desc: BASE_DESC, canonical: BASE_URL, ogType: 'website', articleData: null };
  };

  const meta = getPageMeta();

  // JSON-LD for articles
  const jsonLd = meta.articleData ? {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: meta.articleData.titulo,
    description: meta.articleData.descripcion,
    author: { '@type': 'Person', name: 'TirsoTormo' },
    datePublished: '2024-01-01',
    publisher: { '@type': 'Organization', name: 'Frikisys', url: 'https://frikisys.vercel.app' },
    about: { '@type': 'Thing', name: categoryDisplayNames[meta.articleData.categoria] || meta.articleData.categoria },
  } : {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Frikisys',
    url: 'https://frikisys.vercel.app',
    description: 'Wiki de SysAdmin y SysOps en español',
    author: { '@type': 'Person', name: 'TirsoTormo' },
  };

  return (
    <div className="min-h-screen bg-base-bg flex flex-col">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.desc} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:image" content="https://frikisys.vercel.app/og-image.png" />
        <meta property="og:site_name" content="Frikisys" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.desc} />
        <meta name="twitter:image" content="https://frikisys.vercel.app/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
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
                popularArticles={popularArticles}
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
          ) : currentView === 'tag' ? (
            <>
              {/* Tag filter view */}
              <div className="mb-8">
                <button
                  onClick={handleBackFromTag}
                  className="flex items-center gap-2 mb-4 text-text-secondary hover:text-text-primary transition-colors group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-mono text-sm">Volver</span>
                </button>
                <div className="pixel-separator mb-4">
                  <h1 className="font-mono text-2xl md:text-3xl font-bold text-text-primary px-4">
                    Artículos con #{activeTag}
                  </h1>
                </div>
                <p className="font-mono text-sm text-text-secondary">
                  {allArticleCards.filter(a => a.tags.includes(activeTag!)).length} artículo(s) encontrado(s)
                </p>
              </div>
              <ArticleGrid
                articles={allArticleCards.filter(a => a.tags.includes(activeTag!))}
                onArticleClick={handleArticleClick}
                columns={3}
              />
            </>
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
                    articleId={content.article.id}
                    category={categoryDisplayNames[content.article.categoria] || content.article.categoria}
                    content={content.markdown}
                    codeBlocks={content.codeBlocks}
                    tags={getTagsForArticle(content.article.id)}
                    onBack={handleBackToHome}
                    onTagClick={handleTagClick}
                  />
                );
              })()}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer version="0.1.0" onShowAISkills={() => setShowAISkills(true)} onLegalClick={handleLegalClick} />

      <Analytics />
    </div>
  );
}

export default App;
