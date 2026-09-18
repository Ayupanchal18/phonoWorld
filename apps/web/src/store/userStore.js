import { create } from 'zustand';

const getInitialUser = () => {
  try {
    const raw = localStorage.getItem('phonoworld_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getInitialToken = () => {
  try {
    return localStorage.getItem('phonoworld_token') || null;
  } catch {
    return null;
  }
};

export const useUserStore = create((set, get) => {
  const initialUser = getInitialUser();
  const initialToken = getInitialToken();

  return {
    user: initialUser,
    token: initialToken,
    isLoggedIn: Boolean(initialUser && initialToken),
    isAuthModalOpen: false,

    openAuthModal: () => set({ isAuthModalOpen: true }),
    closeAuthModal: () => set({ isAuthModalOpen: false }),

    login: (userData, token) => {
      try {
        localStorage.setItem('phonoworld_user', JSON.stringify(userData));
        localStorage.setItem('phonoworld_token', token);
      } catch (e) {
        console.warn('LocalStorage unavailable', e);
      }
      set({ user: userData, token, isLoggedIn: true, isAuthModalOpen: false });
    },

    logout: () => {
      try {
        localStorage.removeItem('phonoworld_user');
        localStorage.removeItem('phonoworld_token');
      } catch (e) {
        console.warn('LocalStorage unavailable', e);
      }
      set({ user: null, token: null, isLoggedIn: false });
    },

    toggleWishlistId: (productId) => {
      const { user, isLoggedIn, token } = get();
      if (!isLoggedIn || !user) {
        set({ isAuthModalOpen: true });
        return;
      }

      const currentList = user.wishlist || [];
      const exists = currentList.includes(productId);
      const updatedList = exists 
        ? currentList.filter(id => id !== productId)
        : [...currentList, productId];

      const updatedUser = { ...user, wishlist: updatedList };
      try {
        localStorage.setItem('phonoworld_user', JSON.stringify(updatedUser));
      } catch (e) {
        console.warn('LocalStorage unavailable', e);
      }

      set({ user: updatedUser });

      // Sync with API asynchronously
      if (token) {
        fetch(`/api/v1/user/wishlist/${productId}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(err => console.error('Wishlist sync error:', err));
      }
    },

    isProductWishlisted: (productId) => {
      const { user } = get();
      return user?.wishlist?.includes(productId) || false;
    }
  };
});
