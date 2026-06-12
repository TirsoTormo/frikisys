import React from 'react';

export interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  date?: string;
  readTime?: string;
  contentText?: string; // Full text content for search
}

export interface ArticleCardProps {
  article: Article;
  onClick?: (articleId: string) => void;
  compact?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, compact = false }) => {
  const { id, title, category, description, tags, date, readTime } = article;
  const safeTags = tags ?? [];

  const handleClick = () => {
    onClick?.(id);
  };

  const categoryColors: Record<string, string> = {
    linux: 'text-[#6b7280]',
    virtualización: 'text-[#3b82f6]',
    redes: 'text-[#8b5cf6]',
    seguridad: 'text-[#ef4444]',
    'bases de datos': 'text-[#f59e0b]',
    cloud: 'text-[#06b6d4]',
  };

  const categoryColor = categoryColors[category.toLowerCase()] || 'text-accent';

  if (compact) {
    return (
      <button
        onClick={handleClick}
        className="w-full text-left p-3 bg-base-card border border-base-border rounded-pixel hover:border-accent hover:shadow-pixel-sm transition-all group"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-mono text-xs ${categoryColor}`}>[{category}]</span>
        </div>
        <h3 className="font-mono text-sm text-text-primary group-hover:text-accent transition-colors truncate">
          {title}
        </h3>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-base-card border border-base-border rounded-pixel hover:border-accent hover:shadow-pixel-sm transition-all group"
    >
      {/* Pixel corner decoration */}
      <div className="relative p-4">
        {/* Top-left pixel */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-pixel-dark" />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <span className={`font-mono text-xs ${categoryColor}`}>[{category}]</span>
          {date && (
            <span className="font-mono text-xs text-text-muted">{date}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-mono text-base font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="font-mono text-sm text-text-secondary line-clamp-2 mb-3">
          {description}
        </p>

        {/* Tags */}
        {safeTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {safeTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-base-bg border border-base-border rounded font-mono text-xs text-text-muted"
              >
                #{tag}
              </span>
            ))}
            {safeTags.length > 3 && (
              <span className="px-2 py-0.5 font-mono text-xs text-text-muted">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-base-border">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          {readTime && (
            <span className="font-mono text-xs text-text-muted">{readTime}</span>
          )}
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ArticleCard;
