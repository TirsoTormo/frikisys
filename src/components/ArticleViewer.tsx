import React, { useEffect, useRef } from 'react';

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface ArticleViewerProps {
  title: string;
  category: string;
  content: string;
  codeBlocks?: CodeBlock[];
  tags?: string[];
  date?: string;
  author?: string;
  onBack?: () => void;
  onRelatedArticleClick?: (articleId: string) => void;
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({
  title,
  category,
  content,
  codeBlocks = [],
  tags = [],
  date,
  author = 'Frikisys Team',
  onBack,
  onRelatedArticleClick,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Simple markdown to HTML conversion
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = parseMarkdown(content);
    }
  }, [content]);

  const parseMarkdown = (md: string): string => {
    let html = md
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Inline code
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Line breaks
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br/>');
    
    return `<p>${html}</p>`;
  };

  const categoryColors: Record<string, string> = {
    linux: 'border-l-[#6b7280]',
    virtualización: 'border-l-[#3b82f6]',
    redes: 'border-l-[#8b5cf6]',
    seguridad: 'border-l-[#ef4444]',
    'bases de datos': 'border-l-[#f59e0b]',
    cloud: 'border-l-[#06b6d4]',
  };

  const categoryColor = categoryColors[category.toLowerCase()] || 'border-l-accent';

  const languageLabels: Record<string, string> = {
    bash: 'Bash',
    sh: 'Shell',
    zsh: 'Zsh',
    powershell: 'PowerShell',
    python: 'Python',
    yaml: 'YAML',
    json: 'JSON',
    sql: 'SQL',
    dockerfile: 'Dockerfile',
    terraform: 'Terraform',
    nginx: 'Nginx',
    apache: 'Apache',
  };

  return (
    <article className="w-full max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-text-secondary hover:text-text-primary transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-mono text-sm">Volver</span>
      </button>

      {/* Article header */}
      <header className={`mb-8 pb-6 border-b-2 border-base-border border-l-4 ${categoryColor} pl-4`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-sm text-accent">[{category}]</span>
          {date && (
            <>
              <span className="text-text-muted">•</span>
              <span className="font-mono text-xs text-text-muted">{date}</span>
            </>
          )}
        </div>
        
        <h1 className="font-mono text-2xl md:text-3xl font-bold text-text-primary mb-4">
          {title}
        </h1>

        <div className="flex items-center gap-2 text-text-muted">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-mono text-xs">{author}</span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-base-card border border-base-border rounded font-mono text-xs text-text-secondary hover:border-accent transition-colors cursor-pointer"
                onClick={() => console.log(`Tag: ${tag}`)}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article content */}
      <div className="article-content mb-12">
        <div
          ref={contentRef}
          className="prose prose-invert max-w-none"
        />
      </div>

      {/* Code blocks */}
      {codeBlocks.length > 0 && (
        <section className="mb-12">
          <div className="pixel-separator mb-6">
            <h2 className="font-mono text-lg font-semibold text-text-primary px-4 bg-base-bg">
              Ejemplos de Código
            </h2>
          </div>

          <div className="space-y-6">
            {codeBlocks.map((block, index) => (
              <div key={index} className="code-block" data-language={block.language}>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-base-border">
                  <div className="flex items-center gap-2">
                    {/* Language indicator dots */}
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#ef4444] rounded-full" />
                      <div className="w-2 h-2 bg-[#f59e0b] rounded-full" />
                      <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
                    </div>
                    {block.filename && (
                      <span className="font-mono text-xs text-text-muted ml-2">
                        {block.filename}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-text-muted px-2 py-0.5 bg-base-bg rounded">
                    {languageLabels[block.language] || block.language}
                  </span>
                </div>

                {/* Code */}
                <pre className="overflow-x-auto">
                  <code className={`language-${block.language} text-text-primary font-mono text-sm`}>
                    {block.code}
                  </code>
                </pre>

                {/* Copy button */}
                <button
                  className="absolute top-3 right-3 p-1.5 text-text-muted hover:text-text-primary hover:bg-base-hover rounded transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(block.code);
                  }}
                  title="Copiar código"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Article footer */}
      <footer className="pt-6 border-t border-base-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-base-hover rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="font-mono text-sm">0</span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-base-hover rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-mono text-sm">0</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-muted">¿Útil?</span>
            <button className="p-1.5 text-text-secondary hover:text-accent hover:bg-base-hover rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button className="p-1.5 text-text-secondary hover:text-accent hover:bg-base-hover rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default ArticleViewer;
