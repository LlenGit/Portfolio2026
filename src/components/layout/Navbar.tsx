import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'INDEX', path: '/' },
  { name: 'ABOUT', path: '#about' }, // Using IDs for same-page nav in the new blueprint spirit
  { name: 'WORKS', path: '#projects' },
  { name: 'SIGNAL', path: '#contact' },
];

export default function Navbar() {
  const location = useLocation();
  const { mode } = usePortfolioStore();
  const isDark = mode === 'dark';

  const [time, setTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[80] px-4 py-4 md:px-8 md:py-10 flex justify-between items-center transition-all duration-500",
      isDark ? "text-white" : "text-manga-ink"
    )}>
      <div className="flex items-center gap-12">
        <Link to="/" className="group">
          <div className="flex flex-col">
            <span className="font-space font-bold text-2xl tracking-tighter leading-none group-hover:text-primary transition-colors">
              portfolio<span className="text-primary group-hover:text-white">.</span>
            </span>
            <span className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase mt-1">
              v1.0.core
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-16">
        <div className="hidden md:flex gap-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="relative group py-2"
            >
              <span className="text-[10px] font-space font-bold tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors">
                {item.name}
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <div className="h-10 w-[1px] bg-white/10 hidden xl:block" />
          <div className="text-right hidden xl:block">
            <span className="block text-[10px] font-mono text-white/20 uppercase tracking-widest">Local_Time</span>
            <span className="block text-xs font-space font-medium text-primary">{time}</span>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden text-white/80 hover:text-primary transition-colors cursor-pointer z-[95] focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Immersive Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-bg-dark/98 backdrop-blur-xl z-[90] flex flex-col justify-center items-center px-8"
          >
            {/* Decal background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center gap-10 z-10">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-space font-bold tracking-[0.25em] text-white/60 hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Local time display inside mobile drawer */}
            <div className="absolute bottom-10 flex flex-col items-center">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] mb-1">Local_Time</span>
              <span className="text-xs font-space font-medium text-primary">{time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
