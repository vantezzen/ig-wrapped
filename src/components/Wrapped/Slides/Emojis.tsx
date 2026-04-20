import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import CountUp from "react-countup";
import { Smile } from "lucide-react";

function Emojis({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-10 md:top-20 right-10 md:right-20 w-16 md:w-32 h-16 md:h-32 bg-yellow-400/30 rounded-full"></div>
      <div className="absolute bottom-20 md:bottom-40 left-10 md:left-20 w-20 md:w-40 h-20 md:h-40 border-4 md:border-8 border-orange-500 rotate-45 opacity-30"></div>
      <div className="absolute top-1/2 left-10 md:left-20 w-12 md:w-24 h-12 md:h-24 bg-pink-500/20" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}></div>

      {/* Sparkles */}
      <div className="absolute top-20 md:top-32 left-1/4 text-yellow-400 text-3xl md:text-6xl opacity-60">✦</div>
      <div className="absolute bottom-20 md:bottom-32 right-1/4 text-orange-400 text-2xl md:text-5xl opacity-60">✦</div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Main emoji card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
          className="bg-gradient-to-br from-yellow-500 to-orange-500 p-8 sm:p-12 md:p-16 lg:p-20 rounded-[2rem] md:rounded-[3rem] shadow-2xl max-w-4xl w-full relative overflow-hidden"
        >
          {/* Background icon */}
          <Smile className="absolute top-4 md:top-8 right-4 md:right-8 w-16 md:w-32 h-16 md:h-32 opacity-10 text-slate-900" strokeWidth={1.5} />

          {/* Content */}
          <div className="relative z-10 text-center">
            <p className="text-slate-900/70 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider mb-4 md:mb-8">
              Your Top Emoji
            </p>

            {/* Giant emoji */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.4,
              }}
              className="text-7xl sm:text-9xl md:text-[12rem] lg:text-[16rem] my-4 md:my-8"
            >
              {statistics.emoji.mostUsedEmoji.emoji}
            </motion.div>

            {/* Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-slate-900 leading-none mb-2 md:mb-4">
                <CountUp end={statistics.emoji.mostUsedEmoji.count} duration={2.5} />
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900/80">times</p>
            </motion.div>

            {/* Additional info */}
            <div className="mt-4 md:mt-8 bg-slate-900/20 backdrop-blur-sm px-4 md:px-8 py-2 md:py-4 rounded-full inline-block">
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-slate-900/90">
                {statistics.emoji.emojisUsed.toLocaleString()} different emojis total
              </p>
            </div>
          </div>

          {/* Decorative circle */}
          <div className="absolute top-0 left-0 w-24 md:w-48 h-24 md:h-48 bg-white/10 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </WrappedContainer>
  );
}

export default Emojis;
