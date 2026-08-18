import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '../components/ToastProvider';

interface WishlistContextValue {
  wishlistIds: string[];
  toggleWishlist: (id: string, title: string) => void;
  isInWishlist: (id: string) => boolean;
  recentlyViewedIds: string[];
  addRecentlyViewed: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('offbeat_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('offbeat_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('offbeat_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {}
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('offbeat_recently_viewed', JSON.stringify(recentlyViewedIds));
    } catch (e) {}
  }, [recentlyViewedIds]);

  const toggleWishlist = useCallback((id: string, title: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from Wishlist', title, 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to Wishlist', title, 'success');
        return [id, ...prev];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((id: string) => wishlistIds.includes(id), [wishlistIds]);

  const addRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewedIds((prev) => [id, ...prev.filter((i) => i !== id)].slice(0, 10));
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        recentlyViewedIds,
        addRecentlyViewed,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    return {
      wishlistIds: [],
      toggleWishlist: () => {},
      isInWishlist: () => false,
      recentlyViewedIds: [],
      addRecentlyViewed: () => {},
    };
  }
  return context;
};
