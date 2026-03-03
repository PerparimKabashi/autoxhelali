'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingAnimationProps {
  currentImage: number;
  totalImages: number;
}

const STEPS = [
  'Duke analizuar fotografinë...',
  'Duke aplikuar mbështjelljen...',
  'Duke rafinuar detajet...',
  'Duke finalizuar...',
];

export default function LoadingAnimation({
  currentImage,
  totalImages,
}: LoadingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 2500);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => {
      clearInterval(stepInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  const progress = (currentImage / totalImages) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-luxury-black/98 flex items-center justify-center safe-top safe-bottom">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative text-center px-6 max-w-md w-full">
        {/* Logo */}
        <div className="mb-12">
          <span className="font-accent text-2xl tracking-[0.4em] text-luxury-gold/80">
            XHELALI
          </span>
        </div>

        {/* Main Animation */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-2 border-luxury-gold/20 rotate-45 animate-[spin_8s_linear_infinite]" />
          
          {/* Middle ring */}
          <div className="absolute inset-3 border border-luxury-gold/40 animate-[spin_6s_linear_infinite_reverse]" />
          
          {/* Inner content */}
          <div className="absolute inset-6 bg-luxury-charcoal border border-luxury-gold/30 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-luxury-gold animate-pulse" />
          </div>

          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-luxury-gold" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-luxury-gold" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-luxury-gold" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-luxury-gold" />
        </div>

        {/* Status Text */}
        <div className="space-y-4 mb-10">
          <p className="font-accent text-lg tracking-[0.2em] text-luxury-cream">
            {STEPS[currentStep]}{dots}
          </p>
          <p className="font-body text-sm text-luxury-cream/40 tracking-wide">
            Foto {currentImage} nga {totalImages}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="h-[2px] bg-luxury-charcoal overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-accent tracking-wider">
            <span className="text-luxury-cream/40">PROCESIM</span>
            <span className="text-luxury-gold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-8 w-px h-16 bg-gradient-to-b from-transparent via-luxury-gold/30 to-transparent" />
        <div className="absolute top-1/4 right-8 w-px h-16 bg-gradient-to-b from-transparent via-luxury-gold/30 to-transparent" />
      </div>
    </div>
  );
}
