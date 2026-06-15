import { useState, useEffect } from 'react';

const STORAGE_KEY = 'frikisys_views';

interface ViewData {
  [articleId: string]: number;
}

const getViews = (): ViewData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const incrementView = (articleId: string) => {
  try {
    const views = getViews();
    views[articleId] = (views[articleId] || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  } catch {
    // Ignore errors
  }
};

export const usePopularArticles = () => {
  const [views, setViews] = useState<ViewData>({});

  useEffect(() => {
    setViews(getViews());
  }, []);

  const trackView = (articleId: string) => {
    incrementView(articleId);
    setViews(getViews());
  };

  return { views, trackView };
};
