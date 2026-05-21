import { create } from 'zustand';
import { PORTFOLIO_DATA } from '../data';

// @ts-ignore
import purpleRainSong from '../../Purple Rain_spotdown.org.mp3';

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
  // A beautiful ambient instrumental song, updated to the user's custom file.
  musicUrl: purpleRainSong,
  setMusicUrl: (musicUrl) => set({ musicUrl }),
  
  data: PORTFOLIO_DATA,
  setData: (data) => set({ data }),

}));
