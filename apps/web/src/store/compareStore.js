import { create } from 'zustand';

const getInitialCompareSlugs = () => {
  try {
    const raw = localStorage.getItem('phonoworld_compare');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCompareSlugs = (slugs) => {
  try {
    localStorage.setItem('phonoworld_compare', JSON.stringify(slugs));
  } catch (e) {
    console.warn('LocalStorage unavailable', e);
  }
};

export const useCompareStore = create((set, get) => ({
  selectedSlugs: getInitialCompareSlugs(),
  isDrawerOpen: false,

  addSlug: (slug) => {
    const current = get().selectedSlugs;
    if (current.includes(slug)) return;
    if (current.length >= 4) {
      alert('You can compare a maximum of 4 smartphones simultaneously.');
      return;
    }
    const updated = [...current, slug];
    saveCompareSlugs(updated);
    set({ selectedSlugs: updated, isDrawerOpen: true });
  },

  removeSlug: (slug) => {
    const updated = get().selectedSlugs.filter(s => s !== slug);
    saveCompareSlugs(updated);
    set({ selectedSlugs: updated });
  },

  clearAll: () => {
    saveCompareSlugs([]);
    set({ selectedSlugs: [] });
  },

  setSlugs: (slugs) => {
    const updated = slugs.slice(0, 4);
    saveCompareSlugs(updated);
    set({ selectedSlugs: updated });
  },

  toggleDrawer: () => {
    set({ isDrawerOpen: !get().isDrawerOpen });
  },

  setDrawerOpen: (open) => {
    set({ isDrawerOpen: open });
  }
}));

