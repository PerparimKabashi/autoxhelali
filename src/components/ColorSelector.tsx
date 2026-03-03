'use client';

import { useState } from 'react';
import { Check, Palette, Sparkles, Star } from 'lucide-react';
import { WrapColor, LUXURY_COLORS, FINISH_OPTIONS } from '@/types';

interface ColorSelectorProps {
  selectedColor: WrapColor | null;
  onColorSelect: (color: WrapColor) => void;
}

const CATEGORIES = [
  { id: 'xhelali', name: 'Xhelali', nameAl: '⭐ Xhelali' },
  { id: 'all', name: 'Të Gjitha', nameAl: 'Të Gjitha' },
  { id: 'premium', name: 'Premium', nameAl: 'Premium' },
  { id: 'metallic', name: 'Metallic', nameAl: 'Metalik' },
  { id: 'matte', name: 'Matte', nameAl: 'Mat' },
  { id: 'chrome', name: 'Chrome', nameAl: 'Krom' },
];

export default function ColorSelector({
  selectedColor,
  onColorSelect,
}: ColorSelectorProps) {
  const [activeCategory, setActiveCategory] = useState('xhelali');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customHex, setCustomHex] = useState('#D4A853');
  const [customName, setCustomName] = useState('');
  const [customFinish, setCustomFinish] = useState('glossy');

  const filteredColors = activeCategory === 'all' 
    ? LUXURY_COLORS 
    : LUXURY_COLORS.filter(c => c.category === activeCategory);

  const handleCustomApply = () => {
    const finish = FINISH_OPTIONS.find(f => f.id === customFinish);
    const customColor: WrapColor = {
      id: `custom-${Date.now()}`,
      name: customName || `Custom ${customHex}`,
      nameAl: customName || `Ngjyrë Custom`,
      hex: customHex,
      finish: finish?.name || 'Glossy',
      finishAl: finish?.nameAl || 'Me shkëlqim',
      category: 'custom',
    };
    onColorSelect(customColor);
    setIsCustomMode(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center rotate-45">
            <Sparkles className="w-5 h-5 text-luxury-gold -rotate-45" />
          </div>
          <div>
            <h3 className="font-accent text-lg sm:text-xl tracking-[0.2em] text-luxury-cream">
              ZGJIDH NGJYRËN
            </h3>
            <p className="font-body text-xs text-luxury-cream/40 tracking-wide">
              Koleksioni Premium
            </p>
          </div>
        </div>

        {/* Custom Toggle */}
        <button
          onClick={() => setIsCustomMode(!isCustomMode)}
          className={`
            flex items-center gap-2 px-4 py-2 border text-sm font-accent tracking-wider transition-all duration-300
            ${isCustomMode 
              ? 'bg-luxury-gold border-luxury-gold text-luxury-black' 
              : 'bg-transparent border-luxury-gold/30 text-luxury-gold hover:border-luxury-gold'
            }
          `}
        >
          <Palette className="w-4 h-4" />
          CUSTOM
        </button>
      </div>

      {!isCustomMode ? (
        <>
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-4 py-2 font-accent text-xs tracking-[0.15em] whitespace-nowrap transition-all duration-300
                  ${activeCategory === cat.id
                    ? cat.id === 'xhelali' 
                      ? 'bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-luxury-black'
                      : 'bg-luxury-gold text-luxury-black'
                    : 'bg-luxury-charcoal text-luxury-cream/60 hover:text-luxury-gold border border-luxury-gold/20'
                  }
                `}
              >
                {cat.nameAl.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Xhelali Collection Notice */}
          {activeCategory === 'xhelali' && (
            <div className="flex items-center gap-3 p-3 border border-luxury-gold/30 bg-luxury-gold/5 animate-fade-in">
              <Star className="w-5 h-5 text-luxury-gold flex-shrink-0" />
              <p className="font-body text-xs text-luxury-cream/70 tracking-wide">
                Ngjyrat e disponueshme në stokun e <span className="text-luxury-gold font-semibold">Auto Folie Xhelali</span>
              </p>
            </div>
          )}

          {/* Color Grid */}
          <div className={`grid gap-3 ${activeCategory === 'xhelali' ? 'grid-cols-3' : 'grid-cols-4 sm:grid-cols-6 md:grid-cols-7'}`}>
            {filteredColors.map((color) => (
              <button
                key={color.id}
                onClick={() => onColorSelect(color)}
                className={`
                  relative transition-all duration-300 group
                  ${activeCategory === 'xhelali' ? 'aspect-[4/3]' : 'aspect-square'}
                  ${selectedColor?.id === color.id
                    ? 'ring-2 ring-luxury-gold ring-offset-4 ring-offset-luxury-black scale-105 z-10'
                    : 'hover:scale-105'
                  }
                `}
                style={{ backgroundColor: color.hex }}
                title={color.nameAl}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Check mark */}
                {selectedColor?.id === color.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-luxury-black/30">
                    <Check className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                )}

                {/* Xhelali badge */}
                {color.brand && activeCategory !== 'xhelali' && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-luxury-gold rotate-45 flex items-center justify-center">
                    <Star className="w-3 h-3 text-luxury-black -rotate-45" />
                  </div>
                )}

                {/* Brand & Code for Xhelali */}
                {activeCategory === 'xhelali' && color.brand && (
                  <div className="absolute bottom-0 left-0 right-0 bg-luxury-black/80 backdrop-blur-sm p-2">
                    <p className="font-accent text-[10px] text-luxury-gold tracking-wider truncate">
                      {color.brand}
                    </p>
                    <p className="font-mono text-[9px] text-luxury-cream/60 truncate">
                      {color.code}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      ) : (
        /* Custom Color Picker */
        <div className="card-luxury p-6 space-y-6 animate-fade-in">
          <div className="corner-decor" />
          
          {/* Color Picker Row */}
          <div className="flex gap-4 items-start">
            <div className="relative">
              <input
                type="color"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                className="w-20 h-20 sm:w-24 sm:h-24 cursor-pointer bg-transparent"
              />
              <div 
                className="absolute inset-0 pointer-events-none border-2 border-luxury-gold/50"
                style={{ backgroundColor: customHex }}
              />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <label className="font-accent text-xs tracking-wider text-luxury-gold/60 block mb-1">
                  KODI HEX
                </label>
                <input
                  type="text"
                  value={customHex}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (!val.startsWith('#')) val = '#' + val;
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) setCustomHex(val);
                  }}
                  className="w-full px-4 py-2 bg-luxury-charcoal border border-luxury-gold/30 text-luxury-cream font-mono text-sm tracking-wider focus:border-luxury-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="font-accent text-xs tracking-wider text-luxury-gold/60 block mb-2">
              EMRI I NGJYRËS
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="p.sh. Blu Oqeani, Bronz Metalik..."
              className="w-full px-4 py-3 bg-luxury-charcoal border border-luxury-gold/30 text-luxury-cream font-body text-sm tracking-wide focus:border-luxury-gold focus:outline-none placeholder:text-luxury-cream/30"
            />
          </div>

          {/* Finish Options */}
          <div>
            <label className="font-accent text-xs tracking-wider text-luxury-gold/60 block mb-3">
              PËRFUNDIMI
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              {FINISH_OPTIONS.map((finish) => (
                <button
                  key={finish.id}
                  onClick={() => setCustomFinish(finish.id)}
                  className={`
                    py-2 px-3 text-xs font-accent tracking-wider transition-all duration-300 border
                    ${customFinish === finish.id
                      ? 'bg-luxury-gold text-luxury-black border-luxury-gold'
                      : 'bg-transparent text-luxury-cream/60 border-luxury-gold/30 hover:border-luxury-gold/60'
                    }
                  `}
                >
                  <span className="block text-base mb-1">{finish.icon}</span>
                  {finish.nameAl}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleCustomApply}
            className="btn-luxury w-full flex items-center justify-center gap-3"
          >
            <Check className="w-5 h-5" />
            PËRDOR KËTË NGJYRË
          </button>
        </div>
      )}

      {/* Selected Color Display */}
      {selectedColor && (
        <div className="flex items-center gap-4 p-4 border border-luxury-gold/30 bg-luxury-charcoal/50 animate-fade-in">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border border-luxury-gold/50"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-display text-xl sm:text-2xl text-luxury-cream truncate">
                {selectedColor.nameAl}
              </p>
              {selectedColor.brand && (
                <Star className="w-4 h-4 text-luxury-gold flex-shrink-0" />
              )}
            </div>
            <p className="font-body text-sm text-luxury-cream/50 tracking-wide">
              {selectedColor.name}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {selectedColor.brand && (
                <>
                  <span className="text-xs font-accent tracking-wider text-luxury-gold">
                    {selectedColor.brand}
                  </span>
                  <span className="text-luxury-gold/30">•</span>
                </>
              )}
              {selectedColor.code && (
                <>
                  <span className="text-xs font-mono text-luxury-cream/60">
                    {selectedColor.code}
                  </span>
                  <span className="text-luxury-gold/30">•</span>
                </>
              )}
              <span className="text-xs font-accent tracking-wider text-luxury-cream/40">
                {selectedColor.finishAl.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
