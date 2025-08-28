import { create } from 'zustand';

interface ScrollState {
  scrollPosition: number;
  activeIndex: number;
  isResetting: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  hasScrolled: boolean;
  setScrollPosition: (position: number) => void;
  setActiveIndex: (index: number) => void;
  setIsResetting: (resetting: boolean) => void;
  setCanScrollLeft: (canScroll: boolean) => void;
  setCanScrollRight: (canScroll: boolean) => void;
  setHasScrolled: (scrolled: boolean) => void;
  reset: () => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollPosition: 0,
  activeIndex: 2,
  isResetting: false,
  canScrollLeft: false,
  canScrollRight: true,
  hasScrolled: false,
  setScrollPosition: (position) => set({ scrollPosition: position }),
  setActiveIndex: (index) => set({ activeIndex: index }),
  setIsResetting: (resetting) => set({ isResetting: resetting }),
  setCanScrollLeft: (canScroll) => set({ canScrollLeft: canScroll }),
  setCanScrollRight: (canScroll) => set({ canScrollRight: canScroll }),
  setHasScrolled: (scrolled) => set({ hasScrolled: scrolled }),
  reset: () => set({
    scrollPosition: 0,
    activeIndex: 2,
    isResetting: false,
    canScrollLeft: false,
    canScrollRight: true,
    hasScrolled: false,
  }),
}));