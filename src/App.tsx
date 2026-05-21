/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Achievements from './components/sections/Achievements';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import Playground from './components/playground/Playground';
import Leadership from './components/sections/Leadership';
import AudioPlayer from './components/layout/AudioPlayer';
import { usePortfolioStore } from './store/usePortfolioStore';
import { Palette } from 'lucide-react';

export default function App() {
  const { mode, toggleMode, isMuted, toggleMute } = usePortfolioStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  if (!mounted) return null;

  return (
    <Router>
      <AudioPlayer />
      <div className={`relative min-h-screen transition-colors duration-700 ${mode === 'dark' ? 'mode-dark' : 'mode-light'}`}>

        <AnimatePresence mode="wait">
          {mode === 'manga' ? (
            <Playground key="playground" />
          ) : (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <div className="fixed inset-0 bg-noise pointer-events-none z-50" />
              <Navbar />

              <main className="relative">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Achievements />
                <Education />
                <Leadership />
                <Contact />
              </main>

              <footer className="py-24 border-t border-white/5 bg-bg-dark flex flex-col items-center gap-12">
                <div className="flex gap-12 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
                  <span>STEM</span>
                  <span>© 2026</span>
                  <span>Imphal</span>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center text-primary font-bold text-2xl hover:scale-110 transition-transform">
                    L.
                  </div>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Controls */}
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] flex flex-col gap-3 md:gap-4 items-end">
          
          {/* Background Music Toggle (Ultra-Premium glassmorphic visualizer button) */}
          {mode === 'dark' && (
            <button
              onClick={toggleMute}
              className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white w-12 h-12 md:w-auto md:px-5 md:py-3 rounded-full font-mono text-[9px] tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              title={isMuted ? "Play Ambient Music" : "Pause Ambient Music"}
            >
              {/* Micro-animated visualizer bars */}
              <div className="flex gap-[2px] items-end h-3 w-4 justify-center">
                <span className={`w-[2px] bg-primary rounded-full transition-all duration-300 ${!isMuted ? 'animate-wave-1 h-3' : 'h-[3px]'}`}></span>
                <span className={`w-[2px] bg-primary rounded-full transition-all duration-300 ${!isMuted ? 'animate-wave-2 h-2' : 'h-[3px]'}`}></span>
                <span className={`w-[2px] bg-primary rounded-full transition-all duration-300 ${!isMuted ? 'animate-wave-3 h-3' : 'h-[3px]'}`}></span>
                <span className={`w-[2px] bg-primary rounded-full transition-all duration-300 ${!isMuted ? 'animate-wave-4 h-1.5' : 'h-[3px]'}`}></span>
              </div>
              <span className="font-space font-bold uppercase tracking-widest text-[9px] text-primary hidden md:inline">{isMuted ? 'AMBIENT OFF' : 'AMBIENT ON'}</span>
            </button>
          )}

          <button
            onClick={toggleMode}
            className="flex items-center justify-center gap-4 bg-primary text-bg-dark w-12 h-12 md:w-auto md:px-8 md:py-4 rounded-full font-space font-bold tracking-widest shadow-[0_10px_30px_rgba(255,211,77,0.3)] hover:scale-105 active:scale-95 transition-all group"
            title="Open Memory Canvas"
          >
            <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline">MEMORY CANVAS</span>
          </button>
        </div>

        {/* Global Cursor Deco (Simplified for performance) */}
        <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-difference hidden lg:block">
          {/* Custom cursor can be added here with more logic */}
        </div>
      </div>
    </Router>
  );
}
