'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'PARA',
  afterLabel = 'PAS',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };
    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-video cursor-ew-resize select-none touch-none overflow-hidden gold-border"
      onMouseDown={(e) => handleStart(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
    >
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-contain bg-luxury-black"
          draggable={false}
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-contain bg-luxury-black"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] z-20"
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, transparent, #D4A853, transparent)',
        }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-luxury-gold bg-luxury-black/90 backdrop-blur-sm flex items-center justify-center rotate-45 shadow-xl animate-glow">
            <div className="flex items-center -rotate-45">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-gold" />
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-gold" />
            </div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-4 py-2 bg-luxury-black/80 backdrop-blur-sm border border-luxury-gold/30 font-accent text-xs tracking-[0.2em] text-luxury-cream">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="px-4 py-2 bg-luxury-gold font-accent text-xs tracking-[0.2em] text-luxury-black">
          {afterLabel}
        </span>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <span className="px-4 py-2 bg-luxury-black/60 backdrop-blur-sm border border-luxury-gold/20 font-body text-xs text-luxury-cream/60 tracking-wide flex items-center gap-2">
          <ChevronLeft className="w-3 h-3" />
          Zvarrit për krahasim
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l border-t border-luxury-gold/50 z-10" />
      <div className="absolute top-2 right-2 w-6 h-6 border-r border-t border-luxury-gold/50 z-10" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l border-b border-luxury-gold/50 z-10" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r border-b border-luxury-gold/50 z-10" />
    </div>
  );
}
