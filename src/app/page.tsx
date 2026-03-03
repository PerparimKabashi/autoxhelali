'use client';

import { useState } from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ImageUploader from '@/components/ImageUploader';
import ColorSelector from '@/components/ColorSelector';
import LoadingAnimation from '@/components/LoadingAnimation';
import ResultsGallery from '@/components/ResultsGallery';
import { UploadedImage, WrapColor } from '@/types';

type AppState = 'upload' | 'processing' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedColor, setSelectedColor] = useState<WrapColor | null>(null);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleImagesChange = (newImages: UploadedImage[]) => {
    setImages(newImages);
    setError(null);
  };

  const handleColorSelect = (color: WrapColor) => {
    setSelectedColor(color);
    setError(null);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processImages = async () => {
    if (images.length === 0 || !selectedColor) {
      setError('Ju lutem ngarkoni foto dhe zgjidhni ngjyrën.');
      return;
    }

    setAppState('processing');
    setError(null);
    setCurrentProcessingIndex(0);

    const updatedImages = [...images];

    for (let i = 0; i < images.length; i++) {
      setCurrentProcessingIndex(i + 1);
      updatedImages[i] = { ...updatedImages[i], status: 'processing' };
      setImages([...updatedImages]);

      try {
        const base64Image = await convertToBase64(images[i].file);

        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64Image,
            color: selectedColor.name,
            finish: selectedColor.finish,
          }),
        });

        const data = await response.json();

        if (data.success) {
          updatedImages[i] = {
            ...updatedImages[i],
            status: 'completed',
            result: data.result,
          };
        } else {
          updatedImages[i] = {
            ...updatedImages[i],
            status: 'error',
            error: data.error || 'Gabim',
          };
        }
      } catch (err) {
        updatedImages[i] = {
          ...updatedImages[i],
          status: 'error',
          error: 'Gabim në lidhje',
        };
      }

      setImages([...updatedImages]);
    }

    const hasSuccess = updatedImages.some((img) => img.status === 'completed');
    
    if (hasSuccess) {
      setAppState('results');
    } else {
      setAppState('upload');
      setError('Transformimi nuk u arrit. Ju lutem provoni përsëri.');
    }
  };

  const handleReset = () => {
    setAppState('upload');
    setImages([]);
    setSelectedColor(null);
    setError(null);
    setCurrentProcessingIndex(0);
  };

  const canGenerate = images.length > 0 && selectedColor !== null;

  return (
    <main className="min-h-screen bg-luxury-black">
      <Navbar />

      {appState === 'processing' && (
        <LoadingAnimation
          currentImage={currentProcessingIndex}
          totalImages={images.length}
        />
      )}

      <HeroSection />

      {/* Visualizer Section */}
      <section id="visualizer" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-luxury-gold/50" />
              <Sparkles className="w-5 h-5 text-luxury-gold" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-luxury-gold/50" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-luxury-cream mb-4">
              Vizualizuesi AI
            </h2>
            <p className="font-body text-sm sm:text-base text-luxury-cream/40 tracking-wide max-w-lg mx-auto">
              Ngarko foton e makinës dhe zgjidh ngjyrën për të parë transformimin
            </p>
          </div>

          {appState === 'upload' && (
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-luxury-gold flex items-center justify-center font-accent text-xl text-luxury-gold">
                    01
                  </div>
                  <div>
                    <h3 className="font-accent text-lg tracking-[0.2em] text-luxury-cream">
                      NGARKO FOTOGRAFINË
                    </h3>
                    <p className="font-body text-xs text-luxury-cream/40 tracking-wide">
                      Maksimumi 5 foto
                    </p>
                  </div>
                </div>
                <ImageUploader
                  images={images}
                  onImagesChange={handleImagesChange}
                  maxImages={5}
                />
              </div>

              {/* Divider */}
              <div className="divider-gold" />

              {/* Step 2 */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 border-2 flex items-center justify-center font-accent text-xl transition-all
                    ${images.length > 0 
                      ? 'border-luxury-gold text-luxury-gold' 
                      : 'border-luxury-gold/30 text-luxury-gold/30'
                    }
                  `}>
                    02
                  </div>
                  <div>
                    <h3 className={`font-accent text-lg tracking-[0.2em] transition-colors ${images.length > 0 ? 'text-luxury-cream' : 'text-luxury-cream/30'}`}>
                      ZGJIDH NGJYRËN
                    </h3>
                    <p className="font-body text-xs text-luxury-cream/40 tracking-wide">
                      Koleksioni premium ose custom
                    </p>
                  </div>
                </div>
                <ColorSelector
                  selectedColor={selectedColor}
                  onColorSelect={handleColorSelect}
                />
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-4 p-4 border border-red-500/30 bg-red-500/5">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="font-body text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Generate Button */}
              <div className="pt-6">
                <button
                  onClick={processImages}
                  disabled={!canGenerate}
                  className={`
                    w-full py-5 sm:py-6 font-accent text-lg sm:text-xl tracking-[0.3em] transition-all duration-500
                    ${canGenerate
                      ? 'btn-luxury'
                      : 'bg-luxury-charcoal text-luxury-cream/30 border border-luxury-gold/10 cursor-not-allowed'
                    }
                  `}
                >
                  {canGenerate
                    ? `TRANSFORMO ${images.length} FOTO`
                    : 'NGARKO FOTO DHE ZGJIDH NGJYRËN'
                  }
                </button>
                <p className="text-center font-body text-xs text-luxury-cream/30 tracking-wider mt-4">
                  FALAS • PA REGJISTRIM • REZULTAT NË SEKONDA
                </p>
              </div>
            </div>
          )}

          {appState === 'results' && selectedColor && (
            <ResultsGallery
              images={images}
              selectedColor={selectedColor}
              onReset={handleReset}
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
