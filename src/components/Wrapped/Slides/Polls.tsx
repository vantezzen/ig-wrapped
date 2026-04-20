import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import CountUp from "react-countup";
import lookup from "@/lib/utils/lookup";
import { BarChart3 } from "lucide-react";

const commentsOnPolls = {
  0: "You should share your opinion more!",
  10: "Not a big poll fan, huh?",
  50: "Getting your votes in!",
  100: "Poll power user!",
};

function Polls({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-20 w-32 h-32 border-8 border-teal-400 rotate-12 opacity-30"></div>
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-cyan-500/20 rounded-full"></div>

      {/* Sparkles */}
      <div className="absolute top-32 left-1/4 text-teal-400 text-6xl opacity-60">✦</div>
      <div className="absolute bottom-32 right-1/4 text-cyan-400 text-5xl opacity-60">✦</div>

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
          className="bg-gradient-to-br from-teal-600 to-cyan-500 p-16 md:p-20 rounded-[3rem] shadow-2xl max-w-4xl w-full relative overflow-hidden"
        >
          {/* Background icon */}
          <BarChart3 className="absolute top-8 right-8 w-32 h-32 opacity-10 text-white" strokeWidth={1.5} />

          <div className="relative z-10 text-center">
            <p className="text-white/80 text-2xl md:text-3xl font-bold uppercase tracking-wider mb-6">
              You answered
            </p>

            <h1 className="text-8xl md:text-[10rem] font-black text-white leading-none mb-6">
              <CountUp end={statistics.activity.pollsParticipated} duration={2.5} />
            </h1>

            <p className="text-5xl md:text-7xl font-black text-white mb-8">
              polls
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-full inline-block"
            >
              <p className="text-xl md:text-2xl font-bold text-white">
                {lookup(statistics.activity.pollsParticipated, commentsOnPolls)}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </WrappedContainer>
  );
}

export default Polls;
