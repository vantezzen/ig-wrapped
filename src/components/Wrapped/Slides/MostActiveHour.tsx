import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import { Clock, Sun, Moon, Sunrise, Sunset } from "lucide-react";

function hourToTime(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

function getTimeIcon(hour: number) {
  if (hour >= 6 && hour < 12) return <Sunrise className="w-24 h-24 md:w-32 md:h-32" />;
  if (hour >= 12 && hour < 18) return <Sun className="w-24 h-24 md:w-32 md:h-32" />;
  if (hour >= 18 && hour < 22) return <Sunset className="w-24 h-24 md:w-32 md:h-32" />;
  return <Moon className="w-24 h-24 md:w-32 md:h-32" />;
}

function MostActiveHour({ statistics }: WrappedSlideProps) {
  const hour = Number(statistics.directMessages.mostActiveHour);

  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-20 left-20 w-40 h-40 border-8 border-indigo-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-32 right-20 w-32 h-32 bg-violet-500/20 rotate-12"></div>

      {/* Sparkles */}
      <div className="absolute top-40 right-40 text-indigo-400 text-5xl opacity-60">✦</div>
      <div className="absolute bottom-40 left-40 text-violet-400 text-4xl opacity-60">✦</div>

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
          className="bg-gradient-to-br from-indigo-600 to-violet-500 p-16 md:p-20 rounded-[3rem] shadow-2xl max-w-4xl w-full relative overflow-hidden"
        >
          {/* Background icon */}
          <Clock className="absolute top-8 right-8 w-32 h-32 opacity-10 text-white" strokeWidth={1.5} />

          <div className="relative z-10 text-center">
            <p className="text-white/80 text-2xl md:text-3xl font-bold uppercase tracking-wider mb-6">
              Most active at
            </p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.4,
              }}
              className="text-white mb-6"
            >
              {getTimeIcon(hour)}
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-black text-white leading-none mb-8">
              {hourToTime(hour)}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/20 backdrop-blur-md px-8 py-4 rounded-full inline-block"
            >
              <p className="text-xl md:text-2xl font-bold text-white">
                {hour >= 22 || hour < 6 ? "Night owl vibes!" :
                  hour >= 6 && hour < 12 ? "Early bird catches the scroll!" :
                    hour >= 12 && hour < 17 ? "Afternoon scroller!" :
                      "Evening IG session!"}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </WrappedContainer>
  );
}

export default MostActiveHour;
