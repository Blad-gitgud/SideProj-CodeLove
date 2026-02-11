"use client";

import React, { useEffect, useState } from "react";

type ConfettiPiece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
};

const COLORS = ["#ffafcc", "#ff4d6d", "#ffd7e6", "#fff1f6", "#ffe3f0"];

export default function Confetti({ count = 40, onComplete }: { count?: number; onComplete?: () => void }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const p: ConfettiPiece[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 1.2 + Math.random() * 1.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotate: Math.random() * 360,
    }));
    setPieces(p);

    const timer = setTimeout(() => {
      onComplete?.();
    }, 2200);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((pc) => (
        <span
          key={pc.id}
          style={{
            left: `${pc.left}%`,
            animationDelay: `${pc.delay}s`,
            animationDuration: `${pc.duration}s`,
            background: pc.color,
            transform: `rotate(${pc.rotate}deg)`,
          }}
          className="confetti-piece absolute top-0 h-3 w-2 rounded-sm"
        />
      ))}

      <style jsx>{`
        .confetti-piece{
          transform-origin: center;
          animation-name: confetti-fall;
          animation-timing-function: cubic-bezier(.17,.67,.11,1);
          will-change: transform, opacity;
        }

        @keyframes confetti-fall{
          0%{ opacity: 1; transform: translateY(-10vh) rotate(0deg) }
          100%{ opacity: 0; transform: translateY(110vh) rotate(360deg) }
        }
      `}</style>
    </div>
  );
}
