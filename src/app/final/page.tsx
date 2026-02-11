"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import HeartButton from "../../components/ui/heartbutton";

export default function FinalPage() {
  const [availability, setAvailability] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendAvailability = async () => {
    if (!availability.trim()) {
      alert("Please write when you're free!");
      return;
    }
    setSending(true);
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Availability: ${availability}` }),
      });
      setSent(true);
      setAvailability("");
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error("Failed to send availability:", error);
      alert("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

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

      <div className="relative max-w-2xl w-full text-center bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
        <h1 className="text-5xl font-extrabold text-rose-600 mb-4 tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>It's a date! 💖</h1>
        <p className="text-sm text-rose-600 mb-4">Tell if you're free tommorow or whenever you're free and let's set something up</p>
        <label htmlFor="availability" className="sr-only">Availability message</label>
        <textarea
          id="availability"
          name="availability"
          placeholder="Write when you're free..."
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          disabled={sending}
          className="w-full min-h-[120px] p-3 rounded-md border border-pink-200 mb-4 resize-y text-sm disabled:opacity-50"
        />
        <button
          onClick={handleSendAvailability}
          disabled={sending || !availability.trim()}
          className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl disabled:opacity-60 transition-all duration-300 mb-6"
        >
          {sending ? "Sending..." : sent ? "Sent! 💌" : "Send"}
        </button>
        <p className="text-pink-700/90 mb-8 text-lg">Thank you for saying YES — I can't wait anymore hahahaha. ❤️‍🔥</p>
        <div className="flex items-center justify-center">
          <motion.div whileHover={{ scale: 1.1 }}>
            <HeartButton onClick={() => {}} />
          </motion.div>
        </div>
        </motion.div>
      </div>
    </div>
  );
}
