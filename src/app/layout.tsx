import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AUTO FOLIE XHELALI | Premium Car Wrapping',
  description: 'Mbështjellje premium për makina - Transformo makinën tënde me stil superior',
  keywords: 'car wrap, vinyl wrap, auto folie, mbështjellje makine, Kosovo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq">
      <body className="antialiased">
        {/* Noise Texture Overlay */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
