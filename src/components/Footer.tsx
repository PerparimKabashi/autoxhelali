'use client';

import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-luxury-black border-t border-luxury-gold/20">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="mb-6">
              <span className="font-accent text-3xl tracking-[0.4em] text-luxury-cream">
                XHELALI
              </span>
              <p className="text-xs tracking-[0.3em] text-luxury-gold/60 mt-1">
                AUTO FOLIE
              </p>
            </div>
            <p className="font-body text-sm text-luxury-cream/40 leading-relaxed max-w-xs mx-auto md:mx-0">
              Premium car wrapping me materiale të cilësisë më të lartë. 
              Transformojmë makina që nga viti 2015.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="font-accent text-sm tracking-[0.3em] text-luxury-gold mb-6">
              KONTAKT
            </h4>
            <div className="space-y-4 font-body text-sm">
              <a href="tel:+38344XXXXXX" className="flex items-center justify-center gap-3 text-luxury-cream/60 hover:text-luxury-gold transition-colors">
                <Phone className="w-4 h-4" />
                +383 44 XXX XXX
              </a>
              <a href="mailto:info@xhelali.com" className="flex items-center justify-center gap-3 text-luxury-cream/60 hover:text-luxury-gold transition-colors">
                <Mail className="w-4 h-4" />
                info@xhelali.com
              </a>
              <div className="flex items-center justify-center gap-3 text-luxury-cream/60">
                <MapPin className="w-4 h-4" />
                Prishtinë, Kosovë
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h4 className="font-accent text-sm tracking-[0.3em] text-luxury-gold mb-6">
              NA NDIQNI
            </h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="https://instagram.com/autofoliexhelali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-luxury-gold/30 flex items-center justify-center text-luxury-cream/60 hover:bg-luxury-gold hover:text-luxury-black hover:border-luxury-gold transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/autofoliexhelali"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-luxury-gold/30 flex items-center justify-center text-luxury-cream/60 hover:bg-luxury-gold hover:text-luxury-black hover:border-luxury-gold transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            
            <div className="mt-8">
              <a
                href="https://wa.me/38344XXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-accent text-sm tracking-wider hover:bg-emerald-500 transition-all"
              >
                WHATSAPP
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-luxury-gold/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-luxury-cream/30 font-body tracking-wider">
            <p>© {new Date().getFullYear()} AUTO FOLIE XHELALI. TË GJITHA TË DREJTAT E REZERVUARA.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500/50 animate-pulse" />
              Rezultatet AI janë simulime
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
