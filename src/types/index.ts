export interface WrapColor {
  id: string;
  name: string;
  nameAl: string;
  hex: string;
  finish: string;
  finishAl: string;
  category?: 'premium' | 'metallic' | 'matte' | 'chrome' | 'custom';
}

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  result?: string;
  error?: string;
}

export const LUXURY_COLORS: WrapColor[] = [
  // Premium Collection
  { id: 'obsidian-black', name: 'Obsidian Black', nameAl: 'E Zezë Obsidian', hex: '#0D0D0D', finish: 'Glossy', finishAl: 'Me shkëlqim', category: 'premium' },
  { id: 'arctic-white', name: 'Arctic White', nameAl: 'E Bardhë Arktike', hex: '#F8F8F8', finish: 'Pearl', finishAl: 'Perla', category: 'premium' },
  { id: 'champagne-gold', name: 'Champagne Gold', nameAl: 'Ar Shampanjë', hex: '#D4A853', finish: 'Metallic', finishAl: 'Metalik', category: 'premium' },
  
  // Metallic Collection
  { id: 'midnight-blue', name: 'Midnight Blue', nameAl: 'Blu Mesnate', hex: '#1a1a4e', finish: 'Metallic', finishAl: 'Metalik', category: 'metallic' },
  { id: 'emerald-green', name: 'Emerald Green', nameAl: 'Gjelbër Smeraldi', hex: '#046307', finish: 'Metallic', finishAl: 'Metalik', category: 'metallic' },
  { id: 'burgundy-red', name: 'Burgundy Red', nameAl: 'E Kuqe Burgundy', hex: '#722F37', finish: 'Metallic', finishAl: 'Metalik', category: 'metallic' },
  { id: 'bronze-copper', name: 'Bronze Copper', nameAl: 'Bronz Bakri', hex: '#B87333', finish: 'Metallic', finishAl: 'Metalik', category: 'metallic' },
  
  // Matte Collection
  { id: 'stealth-grey', name: 'Stealth Grey', nameAl: 'Gri Stealth', hex: '#4A4A4A', finish: 'Matte', finishAl: 'Mat', category: 'matte' },
  { id: 'military-green', name: 'Military Green', nameAl: 'Gjelbër Ushtarak', hex: '#4B5320', finish: 'Matte', finishAl: 'Mat', category: 'matte' },
  { id: 'charcoal', name: 'Charcoal', nameAl: 'Qymyr', hex: '#2C2C2C', finish: 'Matte', finishAl: 'Mat', category: 'matte' },
  
  // Chrome Collection
  { id: 'chrome-silver', name: 'Chrome Silver', nameAl: 'Krom Argjendi', hex: '#C0C0C0', finish: 'Chrome', finishAl: 'Krom', category: 'chrome' },
  { id: 'chrome-gold', name: 'Chrome Gold', nameAl: 'Krom Ari', hex: '#FFD700', finish: 'Chrome', finishAl: 'Krom', category: 'chrome' },
  { id: 'chrome-rose', name: 'Rose Gold Chrome', nameAl: 'Krom Rozë Ari', hex: '#E8B4B8', finish: 'Chrome', finishAl: 'Krom', category: 'chrome' },
];

export const FINISH_OPTIONS = [
  { id: 'glossy', name: 'Glossy', nameAl: 'Me shkëlqim', icon: '✨' },
  { id: 'matte', name: 'Matte', nameAl: 'Mat', icon: '◼️' },
  { id: 'satin', name: 'Satin', nameAl: 'Satin', icon: '🌟' },
  { id: 'metallic', name: 'Metallic', nameAl: 'Metalik', icon: '💎' },
  { id: 'chrome', name: 'Chrome', nameAl: 'Krom', icon: '🪩' },
  { id: 'pearl', name: 'Pearl', nameAl: 'Perla', icon: '🦪' },
];
