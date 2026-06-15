import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'frikisys_likes';

interface LikesData {
  [articleId: string]: {
    count: number;
    liked: boolean;
  };
}

const getInitialLikes = (articleId: string): { count: number; liked: boolean } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: LikesData = JSON.parse(stored);
      return data[articleId] || { count: Math.floor(Math.random() * 15) + 3, liked: false };
    }
  } catch {
    // Ignore errors
  }
  // Random initial count between 3-17 for social proof
  return { count: Math.floor(Math.random() * 15) + 3, liked: false };
};

const saveLikes = (articleId: string, count: number, liked: boolean) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const data: LikesData = stored ? JSON.parse(stored) : {};
    data[articleId] = { count, liked };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore errors
  }
};

export const useLikes = (articleId: string) => {
  const [likes, setLikes] = useState<{ count: number; liked: boolean }>({
    count: 0,
    liked: false,
  });

  useEffect(() => {
    setLikes(getInitialLikes(articleId));
  }, [articleId]);

  const toggleLike = useCallback(() => {
    setLikes(prev => {
      const newLiked = !prev.liked;
      const newCount = newLiked ? prev.count + 1 : prev.count - 1;
      saveLikes(articleId, newCount, newLiked);
      return { count: newCount, liked: newLiked };
    });
  }, [articleId]);

  return { likes, toggleLike };
};
