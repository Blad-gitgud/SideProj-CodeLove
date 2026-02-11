"use client";

import { useRouter } from "next/navigation";
import HeartButton from "@/components/ui/heartbutton";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden">
      {/* Floating decorative hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="heart heart-1" />
        <div className="heart heart-2" />
        <div className="heart heart-3" />
        
        {/* Soft glow blobs */}
        <div className="absolute w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20" style={{ top: "10%", left: "5%" }}>
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="absolute w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-15" style={{ top: "60%", right: "10%" }}>
          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <div className="relative flex w-full max-w-3xl flex-col items-center gap-10 py-24 px-8 z-10">
        <div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <span className="text-5xl md:text-7xl font-extrabold text-rose-600 drop-shadow-lg tracking-tight">
              Happy Valentine's Day, Bubba!
            </span>
          </motion.h1>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-center max-w-lg text-pink-700/90 text-lg">
              made this little site to ask you a question... click mo yung heart hehez ~ <span className="text-2xl">💖</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          style={{ position: "relative" }}
        >
          <HeartButton
            onClick={() => router.push("/valentine-question")}
            className="mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
