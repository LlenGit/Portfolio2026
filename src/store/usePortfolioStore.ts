import { create } from 'zustand';
import { PORTFOLIO_DATA } from '../data';

interface PortfolioState {
  mode: 'dark' | 'manga';
  setMode: (mode: 'dark' | 'manga') => void;
  toggleMode: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  musicUrl: string;
  setMusicUrl: (url: string) => void;
  
  // Data State
  data: typeof PORTFOLIO_DATA;
  setData: (data: typeof PORTFOLIO_DATA) => void;

}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  mode: 'dark',
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => {
    const nextMode = state.mode === 'dark' ? 'manga' : 'dark';
    // Automatically unmute when opening the Memory Canvas
    const nextMuted = nextMode === 'manga' ? false : state.isMuted;
    return { 
      mode: nextMode,
      isMuted: nextMuted
    };
  }),
  isMuted: true,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  // Use a runtime URL to avoid bundling the large audio asset into the JS bundle.
  // The file is served from the Vite public dir (site root). Use a URL-safe name.
  musicUrl: '/purple-rain-spotdown.mp3',
  setMusicUrl: (musicUrl) => set({ musicUrl }),
  
  data: PORTFOLIO_DATA,
  setData: (data) => set({ data }),

}));
