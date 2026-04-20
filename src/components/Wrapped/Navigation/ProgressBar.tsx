"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  totalSlides: number;
  currentSlide: number;
  onJumpToSlide?: (index: number) => void;
}

export default function ProgressBar({
  totalSlides,
  currentSlide,
  onJumpToSlide,
}: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex gap-1 p-4">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer",
            "hover:h-1.5 transition-all duration-200"
          )}
          onClick={() => onJumpToSlide?.(index)}
        >
          <motion.div
            className="h-full bg-white rounded-full"
            key={`${index}-${currentSlide}`} // Force remount on slide change
            initial={{ width: index < currentSlide ? "100%" : "0%" }}
            animate={{
              width: index < currentSlide ? "100%" : index === currentSlide ? "100%" : "0%",
            }}
            transition={{
              // Only animate current slide slowly, others snap instantly
              duration: index === currentSlide && index >= currentSlide ? 6 : 0.3,
              ease: index === currentSlide ? "linear" : "easeOut",
            }}
          />
        </div>
      ))}
    </div>
  );
}
