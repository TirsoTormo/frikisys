import React from 'react';

const ArticleSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-pulse">
      <div className="h-4 w-20 bg-base-card rounded mb-6" />
      <div className="h-8 w-3/4 bg-base-card rounded mb-4" />
      <div className="h-4 w-1/4 bg-base-card rounded mb-8" />
      <div className="space-y-3 mb-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 bg-base-card rounded" style={{ width: `${Math.random() * 40 + 60}%` }} />
        ))}
      </div>
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-base-card border border-base-border rounded-pixel p-4">
            <div className="h-4 w-1/3 bg-base-hover rounded mb-3" />
            <div className="space-y-2">
              <div className="h-3 bg-base-hover rounded" />
              <div className="h-3 bg-base-hover rounded w-5/6" />
              <div className="h-3 bg-base-hover rounded w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleSkeleton;
