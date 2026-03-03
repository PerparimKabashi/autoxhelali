'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Camera, Sparkles } from 'lucide-react';
import { UploadedImage } from '@/types';

interface ImageUploaderProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

async function convertToJpeg(file: File): Promise<{ file: File; preview: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert'));
              return;
            }
            
            const jpegFile = new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
              type: 'image/jpeg',
            });
            
            const preview = canvas.toDataURL('image/jpeg', 0.9);
            resolve({ file: jpegFile, preview });
          },
          'image/jpeg',
          0.9
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const remainingSlots = maxImages - images.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      const newImages: UploadedImage[] = [];
      
      for (const file of filesToAdd) {
        try {
          const { file: jpegFile, preview } = await convertToJpeg(file);
          
          newImages.push({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file: jpegFile,
            preview,
            status: 'pending' as const,
          });
        } catch (error) {
          newImages.push({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file,
            preview: URL.createObjectURL(file),
            status: 'pending' as const,
          });
        }
      }

      onImagesChange([...images, ...newImages]);
    },
    [images, onImagesChange, maxImages]
  );

  const removeImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    onImagesChange(updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxSize: 20 * 1024 * 1024,
    disabled: images.length >= maxImages,
  });

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          relative overflow-hidden cursor-pointer transition-all duration-500
          ${isDragActive ? 'gold-border-animated' : 'gold-border'}
          ${images.length >= maxImages ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />

        <div className={`
          relative p-8 sm:p-12 text-center transition-all duration-300
          ${isDragActive ? 'bg-luxury-gold/5' : 'bg-luxury-charcoal/50'}
        `}>
          {/* Corner decorations */}
          <div className="corner-decor absolute inset-4 pointer-events-none" />

          <div className="relative space-y-6">
            {/* Icon */}
            <div className={`
              w-20 h-20 sm:w-24 sm:h-24 mx-auto border-2 flex items-center justify-center
              transition-all duration-300
              ${isDragActive 
                ? 'border-luxury-gold bg-luxury-gold/10 rotate-0' 
                : 'border-luxury-gold/30 rotate-45'
              }
            `}>
              <div className={`transition-transform duration-300 ${isDragActive ? 'rotate-0' : '-rotate-45'}`}>
                {isDragActive ? (
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-luxury-gold" />
                ) : (
                  <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-luxury-gold/70" />
                )}
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="font-accent text-xl sm:text-2xl tracking-[0.2em] text-luxury-cream mb-2">
                {isDragActive ? 'LËSHO FOTON' : 'NGARKO FOTON'}
              </p>
              <p className="font-body text-sm text-luxury-cream/50 tracking-wide">
                Zvarrit ose kliko për të zgjedhur foton e makinës
              </p>
            </div>

            {/* Supported formats */}
            <div className="flex items-center justify-center gap-3 text-xs text-luxury-gold/50 font-body tracking-wider">
              <span className="px-2 py-1 border border-luxury-gold/20">JPG</span>
              <span className="px-2 py-1 border border-luxury-gold/20">PNG</span>
              <span className="px-2 py-1 border border-luxury-gold/20">WEBP</span>
              <span className="px-2 py-1 border border-luxury-gold/20">HEIC</span>
            </div>

            {/* Counter */}
            {images.length > 0 && (
              <div className="flex items-center justify-center gap-3">
                {Array.from({ length: maxImages }).map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-3 h-3 transition-all duration-300
                      ${i < images.length 
                        ? 'bg-luxury-gold rotate-45' 
                        : 'border border-luxury-gold/30 rotate-45'
                      }
                    `}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Gallery */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-luxury-gold/50 to-transparent" />
            <span className="font-accent text-sm tracking-[0.3em] text-luxury-gold/80">
              {images.length} FOTO
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-luxury-gold/50 to-transparent" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative aspect-square group gold-border overflow-hidden"
              >
                <img
                  src={image.preview}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-luxury-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Remove button */}
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-luxury-black/80 border border-luxury-gold/50 text-luxury-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-black"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Status */}
                <div className="absolute bottom-2 left-2 right-2">
                  <span className={`
                    text-[10px] font-accent tracking-wider px-2 py-1
                    ${image.status === 'pending' ? 'bg-luxury-gold/20 text-luxury-gold' : ''}
                    ${image.status === 'processing' ? 'bg-luxury-gold text-luxury-black animate-pulse' : ''}
                    ${image.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : ''}
                    ${image.status === 'error' ? 'bg-red-500/20 text-red-400' : ''}
                  `}>
                    {image.status === 'pending' && 'GATI'}
                    {image.status === 'processing' && 'PROCESIM...'}
                    {image.status === 'completed' && 'PËRFUNDUAR'}
                    {image.status === 'error' && 'GABIM'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
