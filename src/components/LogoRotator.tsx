'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LogoItem {
  id: string;
  name: string;
  logoUrl: string;
  altText: string;
}

interface LogoRotatorProps {
  logos?: LogoItem[];
  autoRotateInterval?: number;
  visibleCount?: number;
  containerClassName?: string;
}

const DEFAULT_LOGOS: LogoItem[] = [
  {
    id: 'filogo',
    name: 'Community Partners',
    logoUrl: '/images/endorsements/filogo.jpg',
    altText: 'Community Partners Logo',
  },
  {
    id: 'housing-first',
    name: 'Housing First',
    logoUrl: '/images/endorsements/housing_first.png',
    altText: 'Housing First Coalition Logo',
  },
  {
    id: 'iva',
    name: 'Independent Veterans of America',
    logoUrl: '/images/endorsements/iva.jpg',
    altText: 'Independent Veterans of America Logo',
  },
  {
    id: 'mn-forward-together',
    name: 'Minnesota Forward Together',
    logoUrl: '/images/endorsements/mnfwdtogether.jpg',
    altText: 'Minnesota Forward Together Logo',
  },
  {
    id: 'rcv',
    name: 'Ranked Choice Voting',
    logoUrl: '/images/endorsements/rcv.png',
    altText: 'Ranked Choice Voting Logo',
  },
];

export default function LogoRotator({
  logos = DEFAULT_LOGOS,
  autoRotateInterval = 4000,
  visibleCount = 3,
  containerClassName = '',
}: LogoRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Auto-rotate effect
  useEffect(() => {
    if (isPaused || logos.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, autoRotateInterval);

    setIntervalId(timer);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, logos.length, autoRotateInterval]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + logos.length) % logos.length);
    // Reset interval after manual navigation
    if (intervalId) clearInterval(intervalId);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    // Reset interval after manual navigation
    if (intervalId) clearInterval(intervalId);
  };

  const getVisibleLogos = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % logos.length;
      visible.push(logos[index]);
    }
    return visible;
  };

  return (
    <section
      id="endorsements"
      className={`py-16 bg-white ${containerClassName}`.trim()}
      aria-label="Partner organization logos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-brand-navy mb-2 tracking-tight uppercase italic">
            Endorsements
          </h2>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            Organizations and leaders supporting our vision for SD49.
          </p>
        </div>

        {/* Logo Rotator Container */}
        <div
          className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Logos Grid/Carousel */}
          <div
            className="relative"
            role="region"
            aria-live="polite"
            aria-label="Logo carousel"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center min-h-[200px]">
              {getVisibleLogos().map((logo, idx) => (
                <div
                  key={`${logo.id}-${currentIndex}-${idx}`}
                  className="w-full h-40 flex items-center justify-center transition-all duration-500 ease-out"
                  style={{
                    opacity: 1,
                    transform: `translateX(0)`,
                  }}
                >
                  <img
                    src={logo.logoUrl}
                    alt={logo.altText}
                    title={logo.name}
                    className="max-h-full max-w-full object-contain px-4"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={handlePrevious}
                aria-label="Previous logos"
                className="ml-2 p-3 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-brand-navy transition-all focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={handleNext}
                aria-label="Next logos"
                className="mr-2 p-3 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-brand-navy transition-all focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {logos.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to logo group ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy ${
                  index === currentIndex
                    ? 'w-3 h-3 bg-brand-navy'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Pause Indicator */}
          {isPaused && (
            <div className="text-center mt-6">
              <p className="text-xs text-slate-500 font-medium italic">
                Paused • Click navigation arrows to advance
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
