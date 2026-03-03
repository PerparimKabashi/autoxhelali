'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${isScrolled ? 'glass-luxury py-3' : 'bg-transparent py-5'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Bar - Desktop */}
        <div className="hidden lg:flex justify-between items-center text-xs text-luxury-gold/60 mb-2 font-body tracking-wider">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Prishtinë, Kosovë
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              +383 44 XXX XXX
            </span>
          </div>
          <span>PREMIUM CAR WRAPPING SINCE 2015</span>
        </div>

        {/* Main Nav */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group">
            <div className="flex flex-col">
              <span className="font-accent text-2xl sm:text-3xl lg:text-4xl tracking-[0.3em] text-luxury-cream group-hover:text-luxury-gold transition-colors">
                XHELALI
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.4em] text-luxury-gold/80 font-body">
                AUTO FOLIE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#visualizer" className="nav-link">
              <span className="font-body text-sm tracking-widest text-luxury-cream/80 hover:text-luxury-gold transition-colors">
                VIZUALIZO
              </span>
            </a>
            <a href="#gallery" className="nav-link">
              <span className="font-body text-sm tracking-widest text-luxury-cream/80 hover:text-luxury-gold transition-colors">
                GALERIA
              </span>
            </a>
            <a href="#contact" className="nav-link">
              <span className="font-body text-sm tracking-widest text-luxury-cream/80 hover:text-luxury-gold transition-colors">
                KONTAKT
              </span>
            </a>
            
            {/* CTA Button */}
            <a
              href="https://wa.me/38344XXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury text-sm py-3 px-6"
            >
              REZERVO TANI
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-12 h-12 flex items-center justify-center text-luxury-gold"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-luxury border-t border-luxury-gold/20 animate-slide-down">
          <div className="px-6 py-8 space-y-6">
            <a
              href="#visualizer"
              onClick={() => setIsMenuOpen(false)}
              className="block font-accent text-xl tracking-widest text-luxury-cream hover:text-luxury-gold transition-colors"
            >
              VIZUALIZO
            </a>
            <a
              href="#gallery"
              onClick={() => setIsMenuOpen(false)}
              className="block font-accent text-xl tracking-widest text-luxury-cream hover:text-luxury-gold transition-colors"
            >
              GALERIA
            </a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block font-accent text-xl tracking-widest text-luxury-cream hover:text-luxury-gold transition-colors"
            >
              KONTAKT
            </a>
            
            <div className="divider-gold my-6" />
            
            <a
              href="https://wa.me/38344XXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury w-full text-center block"
              onClick={() => setIsMenuOpen(false)}
            >
              REZERVO TANI
            </a>
            
            <div className="flex items-center justify-center gap-6 text-xs text-luxury-gold/60 pt-4">
              <span className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                +383 44 XXX XXX
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
