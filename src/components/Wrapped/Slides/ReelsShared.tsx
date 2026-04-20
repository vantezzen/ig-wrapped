import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import CountUp from "react-countup";
import { Film } from "lucide-react";

function ReelsShared({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-fuchsia-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-20 w-36 h-36 border-8 border-fuchsia-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-40 left-20 w-32 h-32 bg-pink-500/20 rotate-45"></div>

      {/* Sparkles */}
      <div className="absolute top-32 left-32 text-fuchsia-400 text-6xl opacity-60">✦</div>
      <div className="absolute bottom-32 right-32 text-pink-400 text-5xl opacity-60">✦</div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Main card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
          className="bg-gradient-to-br from-fuchsia-600 to-pink-500 p-16 md:p-20 rounded-[3rem] shadow-2xl max-w-4xl w-full relative overflow-hidden"
        >
          {/* Background icon */}
          <Film className="absolute top-8 right-8 w-32 h-32 opacity-10 text-white" strokeWidth={1.5} />

          <div className="relative z-10 text-center">
            <p className="text-white/80 text-2xl md:text-3xl font-bold uppercase tracking-wider mb-6">
              You shared
            </p>

            <h1 className="text-8xl md:text-[10rem] font-black text-white leading-none mb-6">
              <CountUp end={statistics.directMessages.reelsShared} duration={2.5} />
            </h1>

            <p className="text-5xl md:text-7xl font-black text-white mb-8">
              reels
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-full inline-block"
            >
              <p className="text-xl md:text-2xl font-bold text-white">
                Spreading the viral content!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </WrappedContainer>
  );
}

export default ReelsShared;
