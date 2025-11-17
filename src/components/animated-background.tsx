"use client";

import { useState, useEffect } from 'react';

const symbols = ['Σ', '∫', '∂', 'ƒ', 'μ', 'π', '≈', '≥', '±', '√', 'α', 'β', 'γ', 'δ', '∞'];

export default function AnimatedBackground() {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        {symbols.map((symbol, i) => {
          const style = {
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * -100}vh`, // Start off-screen
            fontSize: `${Math.random() * 2 + 1}rem`,
            animationName: `fall-${i % 3}`, // Different animations
            animationDuration: `${Math.random() * 10 + 10}s`, // Longer duration
            animationDelay: `${Math.random() * 15}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          };

          return (
            <span
              key={i}
              className="math-symbol-fall absolute text-primary/30"
              style={style}
            >
              {symbol}
            </span>
          );
        })}
        <style jsx global>{`
          @keyframes fall-0 {
            to {
              transform: translateY(200vh) translateX(10vw) rotate(360deg);
            }
          }
          @keyframes fall-1 {
            to {
              transform: translateY(200vh) translateX(-15vw) rotate(-360deg);
            }
          }
          @keyframes fall-2 {
            to {
              transform: translateY(200vh) translateX(5vw) rotate(720deg);
            }
          }
        `}</style>
      </div>
  );
}
