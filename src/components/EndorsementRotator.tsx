'use client';

import React, { useEffect, useState } from 'react';

export type Endorsement = {
  id: string;
  quote: string;
  name: string;
  title: string;
  organization: string;
  photoUrl: string;
};

type EndorsementRotatorProps = {
  endorsements?: Endorsement[];
  autoRotateMs?: number;
  className?: string;
};

const defaultEndorsements: Endorsement[] = [
  {
    id: 'filogo',
    quote:
      'Kris is a thoughtful, practical leader who listens first and solves second. Our community needs honesty, accountability, and people who will work across the aisle to keep Minnesota strong.',
    name: 'Community Supporter',
    title: 'Volunteer',
    organization: 'District 49',
    photoUrl: '/images/filogo.jpg',
  },
  {
    id: 'housing-first',
    quote:
      'Housing affordability and economic opportunity are not abstract issues — they shape every family decision, every school budget, and every neighborhood plan. Kris understands that.',
    name: 'Housing Advocate',
    title: 'Community Organizer',
    organization: 'Housing First Coalition',
    photoUrl: '/images/housing_first.png',
  },
  {
    id: 'community',
    quote:
      'He brings real-world problem solving and a steady hand to the tough choices ahead. That is exactly the kind of leadership people in SD49 deserve.',
    name: 'Local Neighbor',
    title: 'Small Business Owner',
    organization: 'Minnesota',
    photoUrl: '/images/kris-family.jpg',
  },
];

export default function EndorsementRotator({
  endorsements = defaultEndorsements,
  autoRotateMs = 5000,
  className = '',
}: EndorsementRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [rotationSeed, setRotationSeed] = useState(0);

  const totalSlides = endorsements.length;

  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % totalSlides);
    }, autoRotateMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [autoRotateMs, isPaused, rotationSeed, totalSlides]);

  const goToSlide = (nextIndex: number) => {
    const safeIndex = (nextIndex + totalSlides) % totalSlides;
    setCurrentIndex(safeIndex);
    setRotationSeed((value) => value + 1);
  };

  const previousSlide = () => {
    goToSlide(currentIndex - 1);
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextSlide();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previousSlide();
    }
  };

  if (!endorsements.length) {
    return null;
  }

  const activeEndorsement = endorsements[currentIndex];

  return (
    <section
      className={`w-full ${className}`.trim()}
      aria-label="Community endorsements"
    >
      <div
        className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <div
          aria-live="polite"
          aria-atomic="true"
          className="relative grid gap-6 px-5 py-6 sm:px-8 sm:py-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8 md:px-10 md:py-10"
        >
          <div className="flex items-center justify-center md:justify-start">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border border-slate-200 bg-slate-50 shadow-sm sm:h-32 sm:w-32">
              <img
                src={activeEndorsement.photoUrl}
                alt={activeEndorsement.name}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-500" aria-hidden="true" />
              Endorsement
            </div>

            <div
              key={activeEndorsement.id}
              className="transition-all duration-500 ease-out"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
              }}
            >
              <blockquote className="text-lg font-medium leading-relaxed text-slate-800 sm:text-xl md:text-2xl">
                “{activeEndorsement.quote}”
              </blockquote>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <p className="text-base font-bold text-slate-900">{activeEndorsement.name}</p>
                <p className="text-sm text-slate-600">
                  {activeEndorsement.title}
                  {activeEndorsement.organization ? ` • ${activeEndorsement.organization}` : ''}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2" aria-label="Choose endorsement slide">
            {endorsements.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show endorsement ${index + 1} of ${endorsements.length}`}
                aria-pressed={index === currentIndex}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-cyan-600 shadow-sm'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous endorsement"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 transition hover:border-cyan-200 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              ←
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next endorsement"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 transition hover:border-cyan-200 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
