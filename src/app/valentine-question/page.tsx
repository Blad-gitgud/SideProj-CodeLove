"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ValentineQuestion() {
  const router = useRouter();

  // Start the NO button at a position that looks centered next to YES
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [noHover, setNoHover] = useState(false);
  const [noPress, setNoPress] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement | null>(null);
  const [wrapperStyle, setWrapperStyle] = useState<React.CSSProperties>({});

  const sendNotification = async (message: string) => {
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleYes = async () => {
    await sendNotification("She said YES! 😭💖");
    router.push("/activity-choice");
  };

  const moveButton = () => {
    // Calculate random position based on actual screen size
    const randomX = Math.random() * (window.innerWidth - 150);
    const randomY = Math.random() * (window.innerHeight - 100);

    // If first move, snap wrapper to current button position then animate to target
    if (!hasMoved) {
      const rect = noBtnRef.current?.getBoundingClientRect();
      const startLeft = rect ? rect.left : 0;
      const startTop = rect ? rect.top : 0;

      setWrapperStyle({ position: "fixed", left: startLeft, top: startTop, transition: "left 0.7s ease, top 0.7s ease", zIndex: 50 });

      // allow browser to apply starting position, then animate to target
      requestAnimationFrame(() => {
        setWrapperStyle({ position: "fixed", left: randomX, top: randomY, transition: "left 0.7s ease, top 0.7s ease", zIndex: 50 });
      });

      setHasMoved(true);
    } else {
      // subsequent moves animate via CSS transition on wrapperStyle
      setWrapperStyle((prev) => ({ ...prev, left: randomX, top: randomY }));
    }

    setNoPos({ x: randomX, y: randomY });
    // send notification on each click
    sendNotification("She clicked NO (but it's moving away anyway 😌)");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden">
      {/* Floating decorative hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="heart heart-1" />
        <div className="heart heart-2" />
        <div className="heart heart-3" />

        {/* Soft glow blobs */}
        <div
          className="absolute w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20"
          style={{ top: "10%", left: "5%" }}
        >
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div
          className="absolute w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-15"
          style={{ top: "60%", right: "10%" }}
        >
          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Text heading with subtle entry animation and slightly raised position */}
      <div className="text-center z-10 mb-8 -translate-y-4">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1
            className="text-6xl font-extrabold text-rose-600 drop-shadow-lg"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Will you be my Valentine?
          </h1>
          <p className="mt-3 text-rose-400 italic text-lg">(Subukan mo mag click sa NO 😤😤😤)</p>
        </motion.div>
      </div>

      {/* BUTTON CONTAINER */}
      <div className="flex items-center justify-center gap-6 z-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}>
          {/* YES BUTTON - Always stays put */}
          <button
            onClick={handleYes}
            className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-110 transition-transform border-none appearance-none focus:outline-none"
            style={{ animation: "pulseGlow 2.5s infinite" }}
          >
            YES
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}>
          {/* NO BUTTON */}
          <div
            onMouseEnter={() => setNoHover(true)}
            onMouseLeave={() => setNoHover(false)}
            onMouseDown={() => setNoPress(true)}
            onMouseUp={() => setNoPress(false)}
            onClick={moveButton}
            style={{ cursor: "pointer", ...wrapperStyle }}
          >
            <motion.div
              animate={{ scale: noPress ? 0.92 : noHover ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button ref={noBtnRef} className="px-10 py-4 bg-white/40 backdrop-blur-md text-rose-500 font-semibold rounded-full shadow-md border-none appearance-none focus:outline-none hover:bg-white/70 transition-colors">
                NO
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <p className="fixed bottom-10 text-sm text-pink-600/80 italic z-10">
        (P.S. Don't worry, I know you can't click NO anyway 😌)
      </p>
    </div>
  );
}
