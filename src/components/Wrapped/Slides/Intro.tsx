import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import { Zap, Instagram, ArrowRight } from "lucide-react";

function Intro({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-10 md:top-20 right-10 md:right-20 w-20 md:w-40 h-20 md:h-40 border-4 md:border-8 border-yellow-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 md:bottom-40 left-10 md:left-20 w-16 md:w-32 h-16 md:h-32 bg-pink-500/20 rotate-45"></div>
      <div className="absolute top-1/3 right-1/3 w-12 md:w-24 h-12 md:h-24 bg-blue-500/30 rounded-full"></div>
      
      {/* Sparkles */}
      <div className="absolute top-20 md:top-32 left-16 md:left-32 text-yellow-400 text-3xl md:text-6xl opacity-60">✦</div>
      <div className="absolute bottom-20 md:bottom-32 right-16 md:right-32 text-pink-400 text-2xl md:text-5xl opacity-60">✦</div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 md:space-y-12 px-4">
        {/* Top stripe accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute top-0 left-0 right-0 h-2 md:h-4 flex"
        >
          <div className="flex-1 bg-blue-500"></div>
          <div className="flex-1 bg-yellow-400"></div>
          <div className="flex-1 bg-pink-500"></div>
          <div className="flex-1 bg-green-500"></div>
          <div className="flex-1 bg-orange-500"></div>
        </motion.div>

        {/* Main greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.3,
          }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white mb-4 md:mb-8 leading-tight">
            Hey<br/>{statistics.name}!
          </h1>
          <div className="inline-flex items-center gap-2 md:gap-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 px-6 md:px-10 py-3 md:py-4 rounded-full">
            <Instagram className="w-6 h-6 md:w-8 md:h-8 text-white" />
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white">
              Instagram Wrapped
            </p>
          </div>
        </motion.div>

        {/* Subtitle with lightning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.6,
          }}
          className="flex items-center gap-2 md:gap-4"
        >
          <Zap className="w-8 h-8 md:w-12 md:h-12 text-yellow-400" fill="currentColor" />
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 font-bold">
            2025 Edition
          </p>
          <Zap className="w-8 h-8 md:w-12 md:h-12 text-yellow-400" fill="currentColor" />
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-white/10 backdrop-blur-md px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-white/20 flex items-center gap-2"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-semibold">
            Ready to see your year?
          </p>
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
        </motion.div>
      </div>
    </WrappedContainer>
  );
}

export default Intro;
