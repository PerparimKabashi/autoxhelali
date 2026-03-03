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
    <div className="fixed inset-0 z-50 flex items-center justify-center safe-top safe-bottom"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      {/* Solid Background Layer */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: '#0D0D0D' }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] animate-pulse"
          style={{ backgroundColor: 'rgba(212, 168, 83, 0.08)' }}
        />
      </div>

      <div className="relative text-center px-6 max-w-md w-full">
        {/* Logo */}
        <div className="mb-12">
          <span 
            className="font-accent text-2xl tracking-[0.4em]"
            style={{ color: 'rgba(212, 168, 83, 0.8)' }}
          >
            XHELALI
          </span>
        </div>

        {/* Main Animation */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          {/* Outer rotating ring */}
          <div 
            className="absolute inset-0 rotate-45 animate-[spin_8s_linear_infinite]"
            style={{ border: '2px solid rgba(212, 168, 83, 0.2)' }}
          />
          
          {/* Middle ring */}
          <div 
            className="absolute inset-3 animate-[spin_6s_linear_infinite_reverse]"
            style={{ border: '1px solid rgba(212, 168, 83, 0.4)' }}
          />
          
          {/* Inner content */}
          <div 
            className="absolute inset-6 flex items-center justify-center"
            style={{ 
              backgroundColor: '#1C1C1C',
              border: '1px solid rgba(212, 168, 83, 0.3)'
            }}
          >
            <Sparkles className="w-8 h-8 animate-pulse" style={{ color: '#D4A853' }} />
          </div>

          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4" style={{ borderLeft: '2px solid #D4A853', borderTop: '2px solid #D4A853' }} />
          <div className="absolute -top-1 -right-1 w-4 h-4" style={{ borderRight: '2px solid #D4A853', borderTop: '2px solid #D4A853' }} />
          <div className="absolute -bottom-1 -left-1 w-4 h-4" style={{ borderLeft: '2px solid #D4A853', borderBottom: '2px solid #D4A853' }} />
          <div className="absolute -bottom-1 -right-1 w-4 h-4" style={{ borderRight: '2px solid #D4A853', borderBottom: '2px solid #D4A853' }} />
        </div>

        {/* Status Text */}
        <div className="space-y-4 mb-10">
          <p 
            className="font-accent text-lg tracking-[0.2em]"
            style={{ color: '#F5F0E8' }}
          >
            {STEPS[currentStep]}{dots}
          </p>
          <p 
            className="font-body text-sm tracking-wide"
            style={{ color: 'rgba(245, 240, 232, 0.4)' }}
          >
            Foto {currentImage} nga {totalImages}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div 
            className="h-[2px] overflow-hidden"
            style={{ backgroundColor: '#1C1C1C' }}
          >
            <div
              className="h-full transition-all duration-700"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #B8923F, #D4A853, #E8C87D)'
              }}
            />
          </div>
          <div className="flex justify-between text-xs font-accent tracking-wider">
            <span style={{ color: 'rgba(245, 240, 232, 0.4)' }}>PROCESIM</span>
            <span style={{ color: '#D4A853' }}>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div 
          className="absolute top-1/4 left-8 w-px h-16"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(212, 168, 83, 0.3), transparent)' }}
        />
        <div 
          className="absolute top-1/4 right-8 w-px h-16"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(212, 168, 83, 0.3), transparent)' }}
        />
      </div>
    </div>
  );
}
