import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import getComparableActivity from "@/lib/utils/getComparableActivity";
import { HelpCircle } from "lucide-react";

function WatchTimeComparableActivity({ statistics }: WrappedSlideProps) {
  const comparableActivity = getComparableActivity(
    statistics.useTime.totalUsageTimeSec
  );

  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-20 w-40 h-40 border-8 border-rose-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-40 left-20 w-32 h-32 bg-red-500/20 rotate-45"></div>
      <div className="absolute top-1/2 left-16 w-24 h-24 bg-pink-500/20" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}></div>

      {/* Sparkles */}
      <div className="absolute top-32 left-32 text-rose-400 text-6xl opacity-60">✦</div>
      <div className="absolute bottom-32 right-32 text-pink-400 text-5xl opacity-60">✦</div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Main card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
          className="bg-gradient-to-br from-rose-600 to-pink-500 p-16 md:p-20 rounded-[3rem] shadow-2xl max-w-4xl w-full relative overflow-hidden"
        >
          {/* Background icon */}
          <HelpCircle className="absolute top-8 right-8 w-32 h-32 opacity-10 text-white" strokeWidth={1.5} />

          <div className="relative z-10 text-center">
            <p className="text-white/80 text-2xl md:text-3xl font-bold uppercase tracking-wider mb-8">
              Instead, you could've
            </p>

            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.4,
              }}
              className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 max-w-2xl mx-auto"
            >
              {comparableActivity}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-full inline-block"
            >
              <p className="text-xl md:text-2xl font-bold text-white">
                ...but you didn't
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </WrappedContainer>
  );
}

export default WatchTimeComparableActivity;
