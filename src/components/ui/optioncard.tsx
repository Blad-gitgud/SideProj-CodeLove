"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  imageSrc?: string;
  description?: string;
  onClick?: () => void;
};

export default function OptionCard({ title, imageSrc, description, onClick }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      animate={{
        scale: isPressed ? 0.96 : isHovering ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className="cursor-pointer rounded-2xl bg-white/70 shadow-lg p-4 w-64 flex flex-col items-start gap-3"
      role="button"
      tabIndex={0}
    >
      <div className="w-full h-36 rounded-lg overflow-hidden bg-pink-50 flex items-center justify-center">
        {imageSrc ? (
          // using plain img to avoid next/image in components for simplicity
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-pink-600 font-medium">{title}</div>
        )}
      </div>
      <div className="text-lg font-semibold text-rose-600">{title}</div>
      {description && <div className="text-sm text-pink-700/80">{description}</div>}
    </motion.div>
  );
}
