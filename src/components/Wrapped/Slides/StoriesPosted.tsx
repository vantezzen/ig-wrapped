import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import CountUp from "react-countup";
import lookup from "@/lib/utils/lookup";
import { BookOpen, Heart } from "lucide-react";

const commentsOnStories = {
  0: "Living the quiet life, huh?",
  10: "You're a bit of a lurker, aren't you?",
  20: "Getting the hang of this!",
  100: "You're a regular!",
  300: "Quite the storyteller!",
  400: "Your followers can't keep up!",
  1000: "Basically a broadcaster at this point!",
};

function StoriesPosted({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-20 w-36 h-36 border-8 border-purple-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-40 left-20 w-32 h-32 bg-violet-500/20 rotate-45"></div>
      <div className="absolute top-1/2 left-16 w-24 h-24 bg-fuchsia-500/20 rounded-full"></div>

      {/* Sparkles */}
      <div className="absolute top-32 left-32 text-purple-400 text-6xl opacity-60">✦</div>
      <div className="absolute bottom-32 right-32 text-violet-400 text-5xl opacity-60">✦</div>

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
          className="bg-gradient-to-br from-purple-600 to-violet-500 p-16 md:p-20 rounded-[3rem] shadow-2xl max-w-4xl w-full relative overflow-hidden"
        >
          {/* Background icon */}
          <BookOpen className="absolute top-8 right-8 w-32 h-32 opacity-10 text-white" strokeWidth={1.5} />

          <div className="relative z-10 text-center">
            <p className="text-white/80 text-2xl md:text-3xl font-bold uppercase tracking-wider mb-6">
              You posted
            </p>

            <h1 className="text-8xl md:text-[10rem] font-black text-white leading-none mb-6">
              <CountUp end={statistics.activity.storiesPosted} duration={2.5} />
            </h1>

            <p className="text-5xl md:text-7xl font-black text-white mb-8">
              stories
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <p className="text-lg md:text-xl font-bold text-white">
                  Liked {statistics.activity.storyLikes.toLocaleString()} stories
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xl md:text-2xl font-semibold text-white/80 mt-6"
            >
              {lookup(statistics.activity.storiesPosted, commentsOnStories)}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </WrappedContainer>
  );
}

export default StoriesPosted;
