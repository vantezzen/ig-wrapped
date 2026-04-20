import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import { Search } from "lucide-react";

function MostSearchedTerm({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-20 left-20 w-36 h-36 border-8 border-amber-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-32 right-20 w-32 h-32 bg-yellow-500/20 rotate-45"></div>

      {/* Sparkles */}
      <div className="absolute top-40 right-40 text-amber-400 text-5xl opacity-60">✦</div>
      <div className="absolute bottom-40 left-40 text-yellow-400 text-4xl opacity-60">✦</div>

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
          className="bg-gradient-to-br from-amber-500 to-yellow-400 p-16 md:p-20 rounded-[3rem] shadow-2xl max-w-4xl w-full relative overflow-hidden"
        >
          {/* Background icon */}
          <Search className="absolute top-8 right-8 w-32 h-32 opacity-10 text-slate-900" strokeWidth={1.5} />

          <div className="relative z-10 text-center">
            <p className="text-slate-900/70 text-2xl md:text-3xl font-bold uppercase tracking-wider mb-6">
              Top search
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
              className="text-slate-900 mb-6"
            >
              <Search className="w-20 h-20 md:w-24 md:h-24 mx-auto" strokeWidth={1.5} />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6 break-words max-w-full">
              "{statistics.search.topSearchValue.value}"
            </h1>

            <p className="text-3xl md:text-4xl font-bold text-slate-900/80 mb-8">
              {statistics.search.topSearchValue.count.toLocaleString()} times
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-slate-900/20 backdrop-blur-md px-8 py-4 rounded-full inline-block"
            >
              <p className="text-xl md:text-2xl font-bold text-slate-900/90">
                Obsessed much?
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </WrappedContainer>
  );
}

export default MostSearchedTerm;
