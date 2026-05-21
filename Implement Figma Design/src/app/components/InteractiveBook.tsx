import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Page {
  id: number;
  content: React.ReactNode;
  backgroundColor?: string;
}

const pages: Page[] = [
  {
    id: 1,
    content: (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">Once Upon a Time</h1>
        <p className="text-lg text-center">
          In a land far, far away, there lived a curious explorer...
        </p>
      </div>
    ),
    backgroundColor: '#f0f4f8',
  },
  {
    id: 2,
    content: (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Chapter 1</h2>
        <p className="text-base text-center leading-relaxed">
          The journey began on a misty morning. The air was crisp and filled with
          the promise of adventure. Every step forward was a step into the unknown.
        </p>
      </div>
    ),
    backgroundColor: '#fff',
  },
  {
    id: 3,
    content: (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Chapter 2</h2>
        <p className="text-base text-center leading-relaxed">
          Mountains rose in the distance, their peaks touching the clouds.
          The path ahead was winding but the destination was worth every challenge.
        </p>
      </div>
    ),
    backgroundColor: '#f8f9fa',
  },
  {
    id: 4,
    content: (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Chapter 3</h2>
        <p className="text-base text-center leading-relaxed">
          By the riverside, wisdom was found in the flowing water.
          Each ripple told a story, each stone held a memory.
        </p>
      </div>
    ),
    backgroundColor: '#fff',
  },
  {
    id: 5,
    content: (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">The End</h2>
        <p className="text-base text-center leading-relaxed">
          And so the journey came to a close, but the memories would last forever.
          Every ending is just a new beginning in disguise.
        </p>
      </div>
    ),
    backgroundColor: '#f0f4f8',
  },
];

export default function InteractiveBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 180 : -180,
      opacity: 0,
      transformOrigin: direction > 0 ? 'left center' : 'right center',
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: 'center',
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -180 : 180,
      opacity: 0,
      transformOrigin: direction > 0 ? 'right center' : 'left center',
    }),
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 p-8">
      <div className="relative">
        {/* Book Container */}
        <div className="relative w-[600px] h-[400px] bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Book Spine Shadow */}
          <div className="absolute inset-y-0 left-1/2 w-1 bg-gradient-to-r from-gray-300 to-transparent z-10 transform -translate-x-1/2" />

          {/* Page Container */}
          <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  rotateY: { type: 'spring', stiffness: 100, damping: 20 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundColor: pages[currentPage].backgroundColor,
                  backfaceVisibility: 'hidden',
                }}
              >
                {pages[currentPage].content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page Number */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 z-20">
            Page {currentPage + 1} of {pages.length}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next page"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
