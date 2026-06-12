import React from 'react';
import ArticleCard, { Article } from './ArticleCard';

export interface ArticleGridProps {
  articles: Article[];
  onArticleClick?: (articleId: string) => void;
  title?: string;
  emptyMessage?: string;
  columns?: 1 | 2 | 3;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  onArticleClick,
  title,
  emptyMessage = 'No hay artículos disponibles',
  columns = 3,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <section className="w-full">
      {/* Section header */}
      {title && (
        <div className="mb-6">
          <div className="pixel-separator mb-4">
            <h2 className="font-mono text-lg font-semibold text-text-primary px-4 bg-base-bg">
              {title}
            </h2>
          </div>
        </div>
      )}

      {/* Grid */}
      {articles.length > 0 ? (
        <div className={`grid ${gridCols[columns]} gap-4`}>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={onArticleClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          {/* Empty state illustration */}
          <svg className="w-16 h-16 mb-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="font-mono text-sm text-text-muted">{emptyMessage}</p>
          <div className="mt-4 flex gap-2">
            <div className="w-2 h-2 bg-pixel-dark rounded animate-pulse" />
            <div className="w-2 h-2 bg-pixel-light rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-pixel-dark rounded animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ArticleGrid;
