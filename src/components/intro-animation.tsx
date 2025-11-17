"use client";

import { useState, useEffect } from 'react';

const symbols = ['Σ', '∫', '∂', 'ƒ', 'μ', 'π', '≈', '≥', '±', '√'];

export default function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Animation duration + fade out start time
    return () => clearTimeout(timer);
  }, []);

  if (!rendered) {
    return null;
  }

  return (
    <div
      className={`intro-overlay fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="relative w-full h-full overflow-hidden">
        {symbols.map((symbol, i) => {
          const style = {
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            fontSize: `${Math.random() * 2 + 1}rem`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 5 + 5}s`,
          };
          return (
            <span key={i} className="math-symbol absolute text-primary/50" style={style}>
              {symbol}
            </span>
          );
        })}
      </div>
      <div className="absolute flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
          Probability Explorer
        </h1>
        <p className="text-lg text-foreground/80 mt-2">Loading interactive distributions...</p>
      </div>
    </div>
  );
}
