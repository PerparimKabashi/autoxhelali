'use client';

import { ChevronDown, Award, Shield, Gem } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-dark to-luxury-black" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 168, 83, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 168, 83, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        
        {/* Gold glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-luxury-gold/5 rounded-full blur-[100px]" />
        
        {/* Corner decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 border-l-2 border-t-2 border-luxury-gold/20" />
        <div className="absolute bottom-20 right-10 w-32 h-32 border-r-2 border-b-2 border-luxury-gold/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-2 border border-luxury-gold/30 mb-8 animate-fade-in">
          <Gem className="w-4 h-4 text-luxury-gold" />
          <span className="font-body text-xs sm:text-sm tracking-[0.3em] text-luxury-gold/80 uppercase">
            Premium Car Wrapping
          </span>
          <Gem className="w-4 h-4 text-luxury-gold" />
        </div>

        {/* Main Title */}
        <h1 className="animate-slide-up">
          <span className="block font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-luxury-cream/90 tracking-wide mb-2">
            Transformo
          </span>
          <span className="block font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-shimmer tracking-tight">
            STILIN
          </span>
          <span className="block font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-luxury-cream/70 tracking-wide mt-2">
            e Makinës Tënde
          </span>
        </h1>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 my-8 sm:my-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-luxury-gold/50" />
          <div className="w-2 h-2 rotate-45 border border-luxury-gold" />
          <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-luxury-gold/50" />
        </div>

        {/* Subtitle */}
        <p className="font-body text-sm sm:text-base md:text-lg text-luxury-cream/50 max-w-2xl mx-auto mb-10 sm:mb-14 animate-fade-in tracking-wide leading-relaxed" style={{ animationDelay: '0.4s' }}>
          Vizualizo mbështjelljen e re të makinës me teknologji AI
          <br className="hidden sm:block" />
          <span className="text-luxury-gold/80">para se ta realizosh</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <a href="#visualizer" className="btn-luxury w-full sm:w-auto">
            FILLO VIZUALIZIMIN
          </a>
          <a href="#gallery" className="btn-outline w-full sm:w-auto">
            SHIKO GALERIN
          </a>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 sm:mt-24 pt-8 border-t border-luxury-gold/10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {[
            { icon: Shield, title: '10 Vjet', subtitle: 'Garanci' },
            { icon: Award, title: 'Premium', subtitle: 'Materiale' },
            { icon: Gem, title: '500+', subtitle: 'Projekte' },
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border border-luxury-gold/30 mb-3 sm:mb-4 group-hover:border-luxury-gold/60 group-hover:bg-luxury-gold/5 transition-all duration-300">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold" />
              </div>
              <p className="font-accent text-xl sm:text-2xl text-luxury-cream tracking-wider">{item.title}</p>
              <p className="font-body text-xs text-luxury-cream/40 tracking-widest uppercase">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <a href="#visualizer" className="flex flex-col items-center gap-2 text-luxury-gold/50 hover:text-luxury-gold transition-colors">
          <span className="font-body text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
