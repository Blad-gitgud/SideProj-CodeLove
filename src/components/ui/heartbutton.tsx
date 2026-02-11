"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onClick?: () => void;
  className?: string;
};

export default function HeartButton({ onClick, className = "" }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      animate={{
        scale: isPressed ? 0.9 : isHovering ? 1.08 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`${className} flex items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500 p-6 shadow-xl text-white`}
      aria-label="Be my valentine"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="54"
        height="54"
        fill="currentColor"
      >
        <path d="M12 21s-7-4.35-9-7.06C-0.16 8.77 4.5 3 9.5 6.5 12 8.3 12 8.3 12 8.3s0 0 2.5-1.8C19.5 3 24.16 8.77 21 13.94 19 16.65 12 21 12 21z" />
      </svg>
    </motion.button>
  );
}
