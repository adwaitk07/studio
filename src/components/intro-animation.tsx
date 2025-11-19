"use client";

import { useState, useEffect } from 'react';

const symbols = ['Σ', '∫', '∂', 'ƒ', 'μ', 'π', '≈', '≥', '±', '√', 'α', 'β', 'γ', 'δ', '∞'];

type IntroAnimationProps = {
  show: boolean;
};

export default function IntroAnimation({ show }: IntroAnimationProps) {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
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
      <div className="absolute flex flex-col items-center animate-pulse">
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight font-serif">
          Probability Explorer
        </h1>
        <p className="text-lg text-foreground/80 mt-2">Loading interactive distributions...</p>
      </div>
       <style jsx global>{`
          .math-symbol {
            animation-name: float;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }
      `}</style>
    </div>
  );
}
