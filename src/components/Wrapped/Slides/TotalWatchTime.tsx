import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import CountUp from "react-countup";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import { Clock } from "lucide-react";

function TotalWatchTime({ statistics }: WrappedSlideProps) {
  const { amount, unit } = formatTimeLength(
    statistics.useTime.totalUsageTimeSec
  );
  const watchTimeMins = Math.round(statistics.useTime.totalUsageTimeSec / 60);

  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 border-8 border-blue-400 rotate-12 opacity-30"></div>
      <div className="absolute bottom-32 right-32 w-40 h-40 bg-cyan-500/20 rounded-full"></div>
      
      {/* Sparkles */}
      <div className="absolute top-40 right-40 text-blue-400 text-5xl opacity-60">✦</div>
      <div className="absolute bottom-40 left-40 text-cyan-400 text-4xl opacity-60">✦</div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Main stat card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 p-16 md:p-20 rounded-[3rem] shadow-2xl max-w-4xl w-full relative overflow-hidden"
        >
          {/* Background icon */}
          <Clock className="absolute top-8 right-8 w-32 h-32 opacity-10 text-white" strokeWidth={1.5} />
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <p className="text-white/80 text-2xl md:text-3xl font-bold uppercase tracking-wider mb-6">
              You spent
            </p>
            
            <h1 className="text-8xl md:text-[10rem] font-black text-white leading-none mb-6">
              <CountUp end={watchTimeMins} duration={2.5} />
            </h1>
            
            <p className="text-5xl md:text-7xl font-black text-white mb-8">
              minutes
            </p>

            <div className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-full inline-block">
              <p className="text-2xl md:text-3xl font-bold text-white">
                That's {amount} {unit}!
              </p>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </motion.div>
      </div>
    </WrappedContainer>
  );
}

export default TotalWatchTime;
