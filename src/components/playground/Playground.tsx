import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { X, Play, Pause, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';

interface ScatteredPhoto {
  src: string;
  caption: string;
  category: string;
  x: number; // pixels left
  y: number; // pixels top
  rotation: number; // degrees
  width: number; // pixels width
  zIndex: number;
}

const canvasImages = [
  "canvas_image/20250123_134735_lmc_8.4.webp",
  "canvas_image/20250123_152217_lmc_8.4.webp",
  "canvas_image/20250427_074015_lmc_8.4.webp",
  "canvas_image/20250813_112135.webp",
  "canvas_image/6trtyrtyrt.webp",
  "canvas_image/andr.webp",
  "canvas_image/asdasdasdas.webp",
  "canvas_image/dfy.webp",
  "canvas_image/DSC06805.webp",
  "canvas_image/DSCN2281.webp",
  "canvas_image/DSCN2615.webp",
  "canvas_image/DSCN2621.webp",
  "canvas_image/DSCN2625.webp",
  "canvas_image/DSCN2648.webp",
  "canvas_image/DSCN2652.webp",
  "canvas_image/DSCN2656.webp",
  "canvas_image/DSCN2665.webp",
  "canvas_image/DSCN2672.webp",
  "canvas_image/DSCN2678.webp",
  "canvas_image/DSCN2679.webp",
  "canvas_image/DSCN2700.webp",
  "canvas_image/DSCN2701.webp",
  "canvas_image/DSCN2853.webp",
  "canvas_image/DSCN2898.webp",
  "canvas_image/DSCN2962.webp",
  "canvas_image/DSCN2975.webp",
  "canvas_image/DSCN3798.webp",
  "canvas_image/ewqrweqfradsf.webp",
  "canvas_image/fdgsfdgsd.webp",
  "canvas_image/IMG-20230114-WA0036.webp",
  "canvas_image/IMG-20230114-WA0042.webp",
  "canvas_image/IMG-20230226-WA0013.webp",
  "canvas_image/IMG-20230303-WA0003.webp",
  "canvas_image/IMG-20230907-WA0037.webp",
  "canvas_image/IMG-20231008-WA0043.webp",
  "canvas_image/IMG-20231014-WA0005.webp",
  "canvas_image/IMG-20231021-WA0007.webp",
  "canvas_image/IMG-20231223-WA0057.webp",
  "canvas_image/IMG-20231223-WA0073.webp",
  "canvas_image/IMG-20231223-WA0103.webp",
  "canvas_image/IMG-20240303-WA0021.webp",
  "canvas_image/IMG-20240305-WA0028.webp",
  "canvas_image/IMG-20240305-WA0046.webp",
  "canvas_image/IMG20210408202633-1.webp",
  "canvas_image/IMG20221208142655.webp",
  "canvas_image/IMG20221208142721.webp",
  "canvas_image/IMG20221216133155.webp",
  "canvas_image/IMG20221216135114.webp",
  "canvas_image/IMG20241214053514.webp",
  "canvas_image/IMG_0700.webp",
  "canvas_image/IMG_0730.webp",
  "canvas_image/IMG_0732.webp",
  "canvas_image/IMG_1563.webp",
  "canvas_image/IMG_1710.webp",
  "canvas_image/IMG_20210103_132134.webp",
  "canvas_image/IMG_20210126_154603.webp",
  "canvas_image/IMG_20210924_061923.webp",
  "canvas_image/IMG_20210924_061939.webp",
  "canvas_image/IMG_20220613_161425.webp",
  "canvas_image/IMG_20220619_183845.webp",
  "canvas_image/IMG_20220718_153007.webp",
  "canvas_image/IMG_20220718_161509.webp",
  "canvas_image/IMG_20220718_162838.webp",
  "canvas_image/IMG_20221216_134130.webp",
  "canvas_image/IMG_20221216_134800.webp",
  "canvas_image/IMG_20230222_223926.webp",
  "canvas_image/IMG_20230226_151804.webp",
  "canvas_image/IMG_20230226_155423.webp",
  "canvas_image/IMG_20230317_174630.webp",
  "canvas_image/IMG_20230318_191759.webp",
  "canvas_image/IMG_20240622_171052.webp",
  "canvas_image/IMG_20240622_172210.webp",
  "canvas_image/IMG_2367.webp",
  "canvas_image/IMG_2442.webp",
  "canvas_image/IMG_4301.webp",
  "canvas_image/IMG_4315.webp",
  "canvas_image/IMG_5211.webp",
  "canvas_image/IMG_5279.webp",
  "canvas_image/IMG_5291.webp",
  "canvas_image/IMG_6782.webp",
  "canvas_image/IMG_6804.webp",
  "canvas_image/IMG_9706.webp",
  "canvas_image/IMG_9741.webp",
  "canvas_image/IMG_9919.webp",
  "canvas_image/qwe.webp",
  "canvas_image/qwerqwedasda.webp",
  "canvas_image/qwerqwfradfad.webp",
  "canvas_image/rtuythfgh.webp",
  "canvas_image/sfdtdraewt.webp",
  "canvas_image/sfgsdgsdfgsdfgs.webp",
  "canvas_image/swqeqweq.webp",
  "canvas_image/wer.webp",
  "canvas_image/WhatsApp Image 2024-06-29 at 16.26.13_e49a8ef9.webp",
  "canvas_image/WhatsApp Image 2024-06-29 at 19.18.34_48f508f7.webp",
  "canvas_image/WhatsApp Image 2024-07-29 at 16.57.27_0cb292dd.webp",
  "canvas_image/WhatsApp Image 2024-07-29 at 16.57.27_65a7277e.webp",
  "canvas_image/WhatsApp Image 2024-07-29 at 16.57.40_630153c8.webp",
  "canvas_image/WhatsApp Image 2024-10-25 at 21.39.32_ba462087.webp",
  "canvas_image/WhatsApp Image 2024-12-26 at 22.28.10_e46b4adf.webp",
  "canvas_image/WhatsApp Image 2025-01-05 at 20.16.00_0ee76b3b.webp",
  "canvas_image/WhatsApp Image 2025-01-17 at 17.09.43_3fdce93c.webp",
  "canvas_image/WhatsApp Image 2025-01-20 at 19.58.09_eaa2272c.webp",
  "canvas_image/WhatsApp Image 2025-07-21 at 19.10.18_713617f3.webp",
  "canvas_image/WhatsApp Image 2025-08-04 at 19.45.38_f3a96a41.webp",
  "canvas_image/WhatsApp Image 2025-08-04 at 20.03.56_6efb1d86.webp",
  "canvas_image/WhatsApp Image 2025-08-13 at 12.52.28_d37589ae.webp",
  "canvas_image/WhatsApp Image 2025-09-28 at 18.02.47_4b5c32a5.webp",
  "canvas_image/WhatsApp Image 2025-09-28 at 19.38.14_2fdcc01f.webp",
  "canvas_image/WhatsApp Image 2025-09-28 at 19.43.18_795d68c3.webp",
  "canvas_image/WhatsApp Image 2025-09-28 at 19.43.19_8411a22d.webp",
  "canvas_image/WhatsApp Image 2025-11-15 at 22.10.18_91db6f82.webp",
  "canvas_image/WhatsApp Image 2025-11-16 at 06.16.30_ae89d3b7.webp",
  "canvas_image/WhatsApp Image 2025-11-16 at 06.16.35_0d40135d.webp",
  "canvas_image/WhatsApp Image 2026-05-17 asrdawe9.03.50 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 7.46.22 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 7.46.26 PsaM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 7.46.27 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.27 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.27 PuiM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.28 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.29 asdPM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.29 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.30 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.31 as.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.31 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.32 PMasd.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.32 qwPM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.33 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.36 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.38 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.39 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.3asd0 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.40 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.42 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.45 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.46 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.46 utruyPM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.47 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.48 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.49 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-17 at 9.03.50 PM.webp",
  "canvas_image/WhatsApp Image 2026-05-1awe7 at 9.03.30 PM.webp"
];

const parseImageMetaData = (filepath: string) => {
  const filename = filepath.split('/').pop() || "";

  // Extract categories dynamically
  let category = "Archive Log";
  if (filename.includes("WhatsApp")) {
    category = "Social & Academic";
  } else if (filename.startsWith("DSC")) {
    category = "Field Log / Lab Capture";
  } else if (filename.startsWith("IMG_2021") || filename.startsWith("IMG2021")) {
    category = "Year 2021 Dossier";
  } else if (filename.startsWith("IMG_2022") || filename.startsWith("IMG2022")) {
    category = "Year 2022 Dossier";
  } else if (filename.startsWith("IMG_2023") || filename.startsWith("IMG2023")) {
    category = "Year 2023 Dossier";
  } else if (filename.startsWith("IMG_2024") || filename.startsWith("IMG2024")) {
    category = "Year 2024 Dossier";
  } else if (filename.startsWith("IMG_2025") || filename.startsWith("IMG2025")) {
    category = "Year 2025 Dossier";
  } else if (filename.startsWith("IMG_2026") || filename.startsWith("IMG2026")) {
    category = "Year 2026 Dossier";
  }

  // Extract a beautiful clean caption
  let caption = `Archive Ref: ${filename.slice(0, 16)}`;

  // Clean up common formats
  if (filename.startsWith("IMG_20") || filename.startsWith("IMG20")) {
    const year = filename.slice(4, 8);
    const month = filename.slice(8, 10);
    const day = filename.slice(10, 12);
    if (year && month && day) {
      caption = `Lab Capture: ${day}-${month}-${year}`;
    }
  } else if (filename.includes("WhatsApp Image")) {
    const match = filename.match(/WhatsApp Image (\d{4}-\d{2}-\d{2})/);
    if (match && match[1]) {
      caption = `Field Log: ${match[1]}`;
    } else {
      caption = `Captured Log`;
    }
  } else if (filename.startsWith("DSCN")) {
    caption = `Digital Log: ${filename.split('.')[0]}`;
  }

  return { category, caption };
};

export default function Playground() {
  const { toggleMode, isMuted, toggleMute } = usePortfolioStore();
  const [randomKey, setRandomKey] = useState(0);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Canvas dimensions (Fits screen on mobile, large board on desktop)
  const canvasWidth = isMobile ? (viewport.width - 24) : 1400;
  const canvasHeight = isMobile ? (viewport.height - 96) : 2800;

  // Center scroll position horizontally, start at the top vertically on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft = Math.max(0, (canvasWidth - window.innerWidth) / 2);
      container.scrollTop = 0;
    }
  }, [canvasWidth]);

  // Generate randomized coordinates with large displacements and photo widths
  const scatteredPhotos = useMemo(() => {
    const cols = isMobile ? 3 : 4;
    const rows = isMobile ? 4 : 8;
    const cellWidth = canvasWidth / cols;
    const cellHeight = canvasHeight / rows;

    const poolSize = isMobile ? 12 : 30;
    // Shuffle and pick random images from the canvasImages pool
    const shuffledPool = [...canvasImages]
      .sort(() => Math.random() - 0.5)
      .slice(0, poolSize);

    const photos: ScatteredPhoto[] = shuffledPool.map((filepath, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      // Width of the polaroid card (significantly responsive)
      const width = isMobile 
        ? 85 + Math.floor(Math.random() * 20) // 85px to 105px on mobile
        : 230 + Math.floor(Math.random() * 60); // 230px to 290px on desktop

      // Base coordinate at the center of the cell
      const baseLeft = col * cellWidth + cellWidth / 2 - width / 2;
      const baseTop = row * cellHeight + cellHeight / 2 - (isMobile ? 55 : 150);

      // Displace left/right/up/down (restrict extreme overlaps on narrow mobile viewports)
      const xOffset = (Math.random() - 0.5) * (cellWidth * (isMobile ? 0.35 : 0.75));
      const yOffset = (Math.random() - 0.5) * (cellHeight * (isMobile ? 0.35 : 0.75));

      // Keep them within the boundaries of the canvas with a safe padding
      const borderPadding = isMobile ? 6 : 60;
      const x = Math.max(borderPadding, Math.min(canvasWidth - width - borderPadding, baseLeft + xOffset));
      const y = Math.max(isMobile ? 16 : 120, Math.min(canvasHeight - (isMobile ? 115 : 380), baseTop + yOffset));

      // Random rotation and z-indexing (narrower rotation angles on mobile to look neat)
      const rotation = isMobile 
        ? -8 + Math.floor(Math.random() * 16)  // -8deg to +8deg on mobile
        : -18 + Math.floor(Math.random() * 36); // -18deg to +18deg on desktop
      const zIndex = (idx + 1) * 10;

      const { category, caption } = parseImageMetaData(filepath);

      return {
        src: `/${filepath}`,
        caption,
        category,
        x,
        y,
        rotation,
        width,
        zIndex
      };
    });

    return photos;
  }, [randomKey, isMobile, canvasWidth, canvasHeight]);

  // Preload a small set of images near the initial viewport to improve perceived speed
  useEffect(() => {
    const preloadCount = Math.min(8, scatteredPhotos.length);
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < preloadCount; i++) {
      const img = new Image();
      img.src = scatteredPhotos[i].src;
      imgs.push(img);
    }

    return () => {
      imgs.length = 0;
    };
  }, [scatteredPhotos]);

  // Next & Prev navigation handlers
  const showNext = () => {
    if (selectedPhotoIdx === null) return;
    setSelectedPhotoIdx((prev) => (prev !== null && prev < scatteredPhotos.length - 1 ? prev + 1 : 0));
  };

  const showPrev = () => {
    if (selectedPhotoIdx === null) return;
    setSelectedPhotoIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : scatteredPhotos.length - 1));
  };

  // Keyboard navigation listener
  useEffect(() => {
    if (selectedPhotoIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      } else if (e.key === 'Escape') {
        setSelectedPhotoIdx(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIdx, scatteredPhotos]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-manga-bg text-manga-ink flex flex-col overflow-hidden select-none font-serif animate-fade-in"
    >
      {/* Header Panel */}
      <header className="absolute top-0 left-0 right-0 h-20 sm:h-24 bg-manga-bg/85 backdrop-blur-md border-b-2 border-manga-ink z-[600] flex items-center justify-between px-3 sm:px-8 select-none pointer-events-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-pink-400 border border-pink-400 px-2 py-0.5 rounded-sm hidden sm:inline-block">
              Archive Board
            </span>
            <h1 className="text-lg sm:text-2xl font-serif italic font-bold tracking-tight text-manga-ink">
              Memory Canvas.
            </h1>
          </div>
          <p className="text-[11px] text-manga-ink/50 italic leading-none mt-1.5 hidden lg:block">
            A limitless, scattered, grainy canvas of technical blueprints, bionic controller prints, and custom illustrations. Scroll in any direction to explore.
          </p>
        </div>

        {/* Top bar controls */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Background Music Handler */}
          <div className="flex items-center gap-2 sm:gap-3 border-r border-manga-ink/10 pr-2 sm:pr-6">
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full border border-manga-ink/15 flex items-center justify-center hover:bg-manga-ink/5 transition-colors cursor-pointer"
              title={isMuted ? "Play Ambient Music" : "Pause Ambient Music"}
            >
              {isMuted ? <Play className="w-3.5 h-3.5 fill-manga-ink translate-x-[1px]" /> : <Pause className="w-3.5 h-3.5 fill-manga-ink" />}
            </button>
            <div className="flex flex-col leading-none hidden md:flex">
              <div className="flex items-center gap-2">
                <span className="text-[8px] uppercase tracking-wider font-bold opacity-30">Music</span>
                {/* Tiny manga-styled animated waveform */}
                <div className="flex gap-[1.5px] items-end h-2 w-3">
                  <span className={`w-[1.5px] bg-manga-ink/40 rounded-full transition-all duration-300 ${!isMuted ? 'animate-wave-1 h-2' : 'h-[2px]'}`}></span>
                  <span className={`w-[1.5px] bg-manga-ink/40 rounded-full transition-all duration-300 ${!isMuted ? 'animate-wave-2 h-1.5' : 'h-[2px]'}`}></span>
                  <span className={`w-[1.5px] bg-manga-ink/40 rounded-full transition-all duration-300 ${!isMuted ? 'animate-wave-3 h-2' : 'h-[2px]'}`}></span>
                </div>
              </div>
              <span className="text-[10px] italic mt-0.5">--------</span>
            </div>
          </div>

          {/* Reshuffle Button */}
          <button
            onClick={() => setRandomKey((prev) => prev + 1)}
            title="Reshuffle Board Layout"
            className="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-4 sm:py-2 border-2 border-manga-ink font-mono text-[10px] font-bold uppercase hover:bg-pink-400 hover:text-white transition-colors cursor-pointer group rounded-sm shadow-[3px_3px_0_rgba(26,26,26,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_rgba(26,26,26,0.15)]"
          >
            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden sm:inline ml-2">RESHUFFLE</span>
          </button>

          {/* Close Button */}
          <button
            onClick={toggleMode}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-manga-ink text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Massive Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 w-full h-full overflow-hidden md:overflow-auto p-3 pt-24 md:p-24 md:pt-36 bg-manga-paper relative"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        data-lenis-prevent
      >
        {/* The Giant Grainy Canvas */}
        <div
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            background: 'linear-gradient(135deg, #F5ECD8 0%, #E6DCBF 40%, #D9CCA3 75%, #CCBE92 100%)',
          }}
          className="relative border-[8px] border-manga-ink/10 rounded-2xl shadow-[inset_0_4px_24px_rgba(0,0,0,0.12)] overflow-hidden"
        >
          {/* SVG Fractal Noise Filter Layer (highly grain-textured with dark and light specks) */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.24] pointer-events-none mix-blend-multiply z-0" xmlns='http://www.w3.org/2000/svg'>
            <filter id='canvasNoise'>
              <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch' />
            </filter>
            <rect width='100%' height='100%' filter='url(#canvasNoise)' />
          </svg>

          {/* Grid Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(#1A1A1A 0.8px, transparent 0.8px),
                linear-gradient(rgba(26,26,26,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(26,26,26,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px, 48px 48px, 48px 48px',
              backgroundPosition: '0 0, 0 0, 0 0',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Scattered Technical blueprints / grid circles decorators */}
          <div className="absolute top-12 left-6 md:top-24 md:left-36 w-[240px] h-[240px] md:w-[500px] md:h-[500px] border border-manga-ink/[0.05] rounded-full pointer-events-none z-10" />
          <div className="absolute top-12 left-6 md:top-24 md:left-36 w-[160px] h-[160px] md:w-[350px] md:h-[350px] border border-dashed border-manga-ink/[0.04] rounded-full pointer-events-none z-10" />
          <div className="absolute bottom-48 right-12 md:right-96 w-[280px] h-[280px] md:w-[600px] md:h-[600px] border border-manga-ink/[0.05] rounded-full pointer-events-none z-10" />
          <div className="absolute bottom-48 right-12 md:right-96 w-[200px] h-[200px] md:w-[450px] md:h-[450px] border border-dashed border-manga-ink/[0.04] rounded-full pointer-events-none z-10" />

          <div className="absolute top-[40%] left-[5%] md:left-[15%] text-[40px] md:text-[120px] font-bold text-manga-ink/[0.02] tracking-[0.2em] font-serif uppercase pointer-events-none select-none z-10">
            ENGINEERING
          </div>
          <div className="absolute bottom-[25%] right-[5%] md:right-[20%] text-[32px] md:text-[100px] font-bold text-manga-ink/[0.02] tracking-[0.2em] font-serif uppercase pointer-events-none select-none z-10">
            LAB ARCHIVE
          </div>

          {/* Render Scattered Photos */}
          {scatteredPhotos.map((photo, idx) => (
            <motion.div
              key={`${idx}-${randomKey}`}
              style={{
                left: `${photo.x}px`,
                top: `${photo.y}px`,
                width: `${photo.width}px`,
                zIndex: photo.zIndex,
                willChange: 'transform, opacity'
              }}
              initial={{ rotate: photo.rotation, scale: 0.8, opacity: 0 }}
              animate={{ rotate: photo.rotation, scale: 1, opacity: 1 }}
              whileHover={isMobile ? undefined : {
                scale: 1.05,
                zIndex: 600,
                boxShadow: "0 28px 60px rgba(0,0,0,0.28)"
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
              className="absolute bg-white p-1.5 pb-4 md:p-3 md:pb-8 rounded-sm shadow-[4px_8px_20px_rgba(0,0,0,0.12)] border border-black/10 cursor-pointer group"
              onClick={() => setSelectedPhotoIdx(idx)}
            >
              {/* Tape Deco */}
              <div className="absolute top-[-5px] md:top-[-8px] left-1/2 -translate-x-1/2 w-7 h-2.5 md:w-11 md:h-4 bg-white/40 backdrop-blur-[1.5px] rotate-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-white/20 pointer-events-none z-20 md:group-hover:opacity-0 transition-opacity duration-300" />

              <div className="overflow-hidden bg-[#FAFAFA] border border-black/5 w-full relative">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-auto grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-750 block"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />

                {/* Micro category badge */}
                <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 bg-manga-ink text-white px-1 md:px-2 py-0.2 md:py-0.5 font-mono text-[5px] md:text-[7px] font-bold uppercase tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  {photo.category}
                </div>
              </div>
              <span className="font-serif italic text-[8px] md:text-[11px] text-black/70 mt-1.5 md:mt-3.5 block text-center select-none tracking-tight leading-tight">
                {photo.caption}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Ink Splashes Decoration */}
      <div className="fixed bottom-0 left-0 w-32 h-32 bg-manga-ink opacity-[0.03] -translate-x-12 translate-y-12 rounded-full pointer-events-none" />
      <div className="fixed top-0 right-0 w-64 h-64 bg-pink-400 opacity-[0.03] translate-x-24 -translate-y-24 rounded-full pointer-events-none" />

      {/* Immersive Polaroid Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-manga-bg/25 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none"
            onClick={() => setSelectedPhotoIdx(null)}
          >
            {/* Keyboard navigation Hint */}
            <div className="absolute top-6 left-6 font-mono text-[9px] text-manga-ink/40 uppercase tracking-widest pointer-events-none hidden md:block">
              Use Left / Right Arrows to Navigate · Esc to Close
            </div>

            {/* Close Button on Screen */}
            <button
              onClick={() => setSelectedPhotoIdx(null)}
              className="absolute top-4 right-4 w-10 h-10 md:top-6 md:right-6 md:w-12 md:h-12 rounded-full border border-manga-ink/15 flex items-center justify-center bg-white text-manga-ink hover:bg-manga-ink hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md z-[1200]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Control Chevron */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-1 md:left-8 w-10 h-10 md:w-14 md:h-14 rounded-full border border-manga-ink/10 flex items-center justify-center bg-white/60 hover:bg-white text-manga-ink hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-lg z-[1100]"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Polaroid Focus Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 pb-8 md:p-5 md:pb-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-black/10 max-w-[85vw] md:max-w-lg w-full flex flex-col items-center relative cursor-default max-h-[85vh] overflow-y-auto"
            >
              {/* Tape deco */}
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-5 bg-white/60 backdrop-blur-[2px] rotate-1 shadow-[0_2px_4px_rgba(0,0,0,0.06)] border border-white/30 pointer-events-none z-20" />

              {/* Large Image Frame */}
              <div className="overflow-hidden bg-[#FBFBFB] border border-black/5 w-full aspect-square relative flex items-center justify-center">
                <img
                  src={scatteredPhotos[selectedPhotoIdx].src}
                  alt={scatteredPhotos[selectedPhotoIdx].caption}
                  className="max-w-full max-h-full object-contain transition-all duration-500"
                  decoding="async"
                  fetchPriority="high"
                />
                <span className="absolute bottom-3 right-3 bg-manga-ink text-white px-2 py-0.5 font-mono text-[7px] font-bold uppercase tracking-wider">
                  {scatteredPhotos[selectedPhotoIdx].category}
                </span>
              </div>

              {/* Large Caption */}
              <h3 className="font-serif italic text-base md:text-lg text-black/80 mt-6 text-center tracking-tight leading-tight px-4 select-text">
                {scatteredPhotos[selectedPhotoIdx].caption}
              </h3>
              
              {/* Bottom counter */}
              <div className="absolute bottom-3 text-[8px] font-mono text-manga-ink/30 uppercase tracking-[0.25em]">
                Photo {selectedPhotoIdx + 1} of {scatteredPhotos.length}
              </div>
            </motion.div>

            {/* Right Control Chevron */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-1 md:right-8 w-10 h-10 md:w-14 md:h-14 rounded-full border border-manga-ink/10 flex items-center justify-center bg-white/60 hover:bg-white text-manga-ink hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-lg z-[1100]"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
