import { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function AudioPlayer() {
  const { mode, isMuted, musicUrl } = usePortfolioStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.pause();
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Autoplay blocked by browser. Awaiting user interaction.', error);
          
          // Setup a one-time click/key listener to trigger play on first interaction
          const startPlayOnInteraction = () => {
            if (!usePortfolioStore.getState().isMuted) {
              audio.play().catch(e => console.error('Failed to play on interaction:', e));
            }
            window.removeEventListener('click', startPlayOnInteraction);
            window.removeEventListener('keydown', startPlayOnInteraction);
          };
          window.addEventListener('click', startPlayOnInteraction);
          window.addEventListener('keydown', startPlayOnInteraction);
        });
      }
    }
  }, [isMuted]);

  // Synchronize audio source if it changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.src = musicUrl;
    
    // Keep state in sync
    if (!isMuted) {
      audio.play().catch((err) => console.log('Autoplay deferred:', err));
    }
  }, [musicUrl]);

  // Handle smooth volume transitions (fading)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Define target volume: 0.35 inside the Memory Canvas, 0.06 in background portfolio
    const targetVolume = mode === 'manga' ? 0.35 : 0.06;

    // Clear any active volume fading interval
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const fadeStep = 0.02; // Size of each volume step
    const intervalMs = 50; // How fast to step (50ms)

    fadeIntervalRef.current = setInterval(() => {
      if (!audio) return;

      const diff = targetVolume - audio.volume;

      if (Math.abs(diff) <= fadeStep) {
        audio.volume = targetVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      } else {
        // Adjust volume towards the target
        audio.volume += diff > 0 ? fadeStep : -fadeStep;
      }
    }, intervalMs);

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [mode]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  );
}
