"use client";

import React, { useState } from "react";
import OptionCard from "../../components/ui/optioncard";
import Confetti from "../../components/ui/confetti";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ActivityChoice() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

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

  function handleChoose(name: string) {
    setSelected(name);
    setShowMessage(true);
    // notify backend about the selected activity (fire-and-forget)
    sendNotification(`She picked: ${name} ❤️`);
    // trigger confetti and then navigate to a final sweet message
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      router.push("/final");
    }, 1600);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden p-8">
      {/* Floating decorative hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="heart heart-1" />
        <div className="heart heart-2" />
        <div className="heart heart-3" />
        
        {/* Soft glow blobs */}
        <div className="absolute w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20" style={{ top: "10%", left: "5%" }}>
          <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity }} style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="absolute w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-15" style={{ top: "60%", right: "10%" }}>
          <motion.div animate={{ y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity }} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      <div className="relative max-w-4xl w-full flex flex-col items-center gap-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-extrabold text-rose-600 text-center tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>What do you wanna do this Valentine's Day?</h2>
        </motion.div>
        <div className="flex gap-6 justify-center mt-8">
          <OptionCard
            title="Cafe date"
            imageSrc="/images/cafe.jpg"
            description="Go to a cute cafe you pick"
            onClick={() => handleChoose("Cafe date")}
          />
          <OptionCard
            title="Picnic"
            imageSrc="/images/picnic.jpg"
            description="Have a chill picnic together"
            onClick={() => handleChoose("Picnic")}
          />
        </div>

        {showMessage && selected && (
          <div className="mt-6 rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-lg text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="text-2xl font-semibold text-rose-600">You chose: {selected}</div>
              <div className="text-sm text-pink-700/80 mt-2">Sweet choice — can't wait!</div>
            </motion.div>
          </div>
        )}

        {showConfetti && <Confetti count={48} />}
      </div>
    </div>
  );
}
