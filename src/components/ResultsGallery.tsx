'use client';

import { useState } from 'react';
import { Download, ChevronLeft, ChevronRight, X, RefreshCw, Share2, Maximize2, MessageCircle } from 'lucide-react';
import { UploadedImage, WrapColor } from '@/types';
import BeforeAfterSlider from './BeforeAfterSlider';

interface ResultsGalleryProps {
  images: UploadedImage[];
  selectedColor: WrapColor;
  onReset: () => void;
}

export default function ResultsGallery({
  images,
  selectedColor,
  onReset,
}: ResultsGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const completedImages = images.filter((img) => img.status === 'completed' && img.result);
  const currentImage = completedImages[currentIndex];

  if (completedImages.length === 0 || !currentImage) {
    return (
      <div className="text-center py-16">
        <p className="font-body text-luxury-cream/50 mb-6">Nuk ka rezultate.</p>
        <button onClick={onReset} className="btn-outline">
          PROVO PËRSËRI
        </button>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? completedImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === completedImages.length - 1 ? 0 : prev + 1));
  };

  const downloadImage = async () => {
    const imageUrl = currentImage.result || currentImage.preview;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `xhelali-${selectedColor.id}-${currentIndex + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(imageUrl, '_blank');
    }
  };

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Auto Folie Xhelali - ${selectedColor.nameAl}`,
          text: `Shiko transformimin e makinës sime me ${selectedColor.nameAl}!`,
          url: window.location.href,
        });
      } catch (e) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
            <span className="font-accent text-xs tracking-[0.3em] text-emerald-400">
              TRANSFORMIMI PËRFUNDOI
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-luxury-cream">
            {selectedColor.nameAl}
          </h2>
          <p className="font-body text-sm text-luxury-cream/40 tracking-wide">
            {selectedColor.name} • {selectedColor.finishAl}
          </p>
        </div>
        
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 border border-luxury-gold/30 text-luxury-gold font-accent text-sm tracking-wider hover:bg-luxury-gold hover:text-luxury-black transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          FILLO PËRSËRI
        </button>
      </div>

      {/* Before/After Slider */}
      <div className="relative">
        <BeforeAfterSlider
          beforeImage={currentImage.preview}
          afterImage={currentImage.result!}
          beforeLabel="ORIGJINALI"
          afterLabel={selectedColor.nameAl.toUpperCase()}
        />

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-16 right-4 z-20 w-12 h-12 border border-luxury-gold/50 bg-luxury-black/80 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-all"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Navigation */}
        {completedImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-luxury-gold/50 bg-luxury-black/80 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-all z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-luxury-gold/50 bg-luxury-black/80 text-luxury-gold flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-all z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {completedImages.length > 1 && (
        <div className="flex justify-center gap-3">
          {completedImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(index)}
              className={`
                relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 transition-all
                ${index === currentIndex
                  ? 'border-luxury-gold scale-110'
                  : 'border-luxury-gold/20 opacity-50 hover:opacity-100'
                }
              `}
            >
              <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full overflow-hidden">
                  <img src={img.preview} alt="" className="w-[200%] h-full object-cover" />
                </div>
                <div className="w-1/2 h-full overflow-hidden">
                  <img src={img.result || img.preview} alt="" className="w-[200%] h-full object-cover object-right" />
                </div>
              </div>
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-luxury-gold/50" />
            </button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={downloadImage} className="btn-luxury flex items-center justify-center gap-3">
          <Download className="w-5 h-5" />
          SHKARKO
        </button>
        <button onClick={shareResult} className="btn-outline flex items-center justify-center gap-3">
          <Share2 className="w-5 h-5" />
          SHPËRNDA
        </button>
      </div>

      {/* WhatsApp CTA */}
      <div className="relative p-6 sm:p-8 border border-luxury-gold/30 bg-gradient-to-r from-luxury-charcoal to-luxury-dark overflow-hidden">
        <div className="corner-decor absolute inset-4" />
        
        <div className="relative text-center space-y-4">
          <h3 className="font-display text-2xl sm:text-3xl text-luxury-cream">
            Të pëlqeu rezultati?
          </h3>
          <p className="font-body text-sm text-luxury-cream/50 tracking-wide max-w-md mx-auto">
            Kontaktona për ta realizuar këtë transformim për makinën tënde
          </p>
          <a
            href={`https://wa.me/38344XXXXXX?text=${encodeURIComponent(
              `Përshëndetje! Dua kuotim për mbështjellje ${selectedColor.nameAl} (${selectedColor.finish}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 font-accent tracking-wider hover:bg-emerald-500 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            KONTAKTO NË WHATSAPP
          </a>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-luxury-black flex flex-col safe-top safe-bottom">
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setIsFullscreen(false)}
              className="w-12 h-12 border border-luxury-gold/50 bg-luxury-black/80 text-luxury-gold flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl">
              <BeforeAfterSlider
                beforeImage={currentImage.preview}
                afterImage={currentImage.result!}
                beforeLabel="ORIGJINALI"
                afterLabel={selectedColor.nameAl.toUpperCase()}
              />
            </div>
          </div>

          <div className="p-4 text-center">
            <p className="font-display text-xl text-luxury-cream">{selectedColor.nameAl}</p>
            <p className="font-body text-sm text-luxury-cream/40">{selectedColor.name} • {selectedColor.finishAl}</p>
          </div>
        </div>
      )}
    </div>
  );
}
