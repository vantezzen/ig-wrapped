import React from "react";
import { motion } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import { Button } from "@/components/ui/button";
import { Loader2, Download, User, Clock, Heart, MessageSquare, Smile, Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import Projects from "@/components/Projects";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import ShareCard from "../ShareCard";

function Roundup({ statistics }: WrappedSlideProps) {
  const [isLoadingShareImage, setIsLoadingShareImage] = React.useState(false);
  const shareCardRef = React.useRef<HTMLDivElement>(null);

  const { amount: totalWatchTimeAmount, unit: totalWatchTimeUnit } =
    formatTimeLength(statistics.useTime.totalUsageTimeSec);

  return (
    <WrappedContainer bg="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" text="text-white">
      {/* Geometric decorations */}
      <div className="absolute top-10 md:top-20 right-10 md:right-20 w-16 md:w-32 h-16 md:h-32 border-4 md:border-8 border-purple-400 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 md:bottom-40 left-10 md:left-20 w-20 md:w-40 h-20 md:h-40 bg-pink-500/20 rotate-45"></div>
      
      {/* Sparkles */}
      <div className="absolute top-20 md:top-32 left-16 md:left-32 text-purple-400 text-3xl md:text-6xl opacity-60">✦</div>
      <div className="absolute bottom-20 md:bottom-32 right-16 md:right-32 text-pink-400 text-2xl md:text-5xl opacity-60">✦</div>

      <div className="relative z-10 w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 space-y-6 md:space-y-8 overflow-y-auto h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-2 md:mb-4">
            Your 2025 Recap
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80">
            And you did so much more...
          </p>
        </motion.div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {/* Profile Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/20"
          >
            <h3 className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> Profile
            </h3>
            <div className="space-y-1 md:space-y-2 text-white text-sm md:text-base">
              <div className="flex justify-between">
                <span className="text-white/70">Stories</span>
                <span className="font-bold">{statistics.profile.storiesPosted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Photo Changes</span>
                <span className="font-bold">{statistics.profile.profilePhotoChanges.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Unfollowed</span>
                <span className="font-bold">{statistics.profile.unfollowedCount.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Usage Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/20"
          >
            <h3 className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Usage
            </h3>
            <div className="space-y-1 md:space-y-2 text-white text-sm md:text-base">
              <div>
                <span className="text-white/70 text-xs md:text-sm block">Total Time</span>
                <span className="font-bold text-lg md:text-2xl">{totalWatchTimeAmount} {totalWatchTimeUnit}</span>
              </div>
              <div className="flex justify-between pt-1 md:pt-2">
                <span className="text-white/70">Sessions</span>
                <span className="font-bold">{statistics.useTime.totalSessions.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Activity Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/20"
          >
            <h3 className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Activity
            </h3>
            <div className="space-y-1 md:space-y-2 text-white text-sm md:text-base">
              <div className="flex justify-between">
                <span className="text-white/70">Comments</span>
                <span className="font-bold">{statistics.activity.commentsWritten.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Liked Posts</span>
                <span className="font-bold">{statistics.activity.likedPosts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Polls</span>
                <span className="font-bold">{statistics.activity.pollsParticipated.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* DM Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/20"
          >
            <h3 className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Messages
            </h3>
            <div className="space-y-1 md:space-y-2 text-white text-sm md:text-base">
              <div className="flex justify-between">
                <span className="text-white/70">DMs Sent</span>
                <span className="font-bold">{statistics.directMessages.dmSent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">DMs Received</span>
                <span className="font-bold">{statistics.directMessages.dmReceived.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Top Sender</span>
                <span className="font-bold truncate max-w-[80px] md:max-w-[120px]">{statistics.directMessages.topSender}</span>
              </div>
            </div>
          </motion.div>

          {/* Emoji Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/20"
          >
            <h3 className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
              <Smile className="w-4 h-4" /> Emojis
            </h3>
            <div className="space-y-1 md:space-y-2 text-white text-center">
              <div className="text-4xl md:text-6xl mb-1 md:mb-2">{statistics.emoji.mostUsedEmoji.emoji}</div>
              <div>
                <span className="text-white/70 text-xs md:text-sm block">Most Used</span>
                <span className="font-bold text-base md:text-xl">{statistics.emoji.mostUsedEmoji.count.toLocaleString()} times</span>
              </div>
            </div>
          </motion.div>

          {/* Search Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/20"
          >
            <h3 className="text-white/70 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
              <Search className="w-4 h-4" /> Search
            </h3>
            <div className="space-y-1 md:space-y-2 text-white text-sm md:text-base">
              <div>
                <span className="text-white/70 text-xs md:text-sm block">Top Search</span>
                <span className="font-bold text-sm md:text-lg truncate block">{statistics.search.topSearchValue.value}</span>
              </div>
              <div className="text-white/70 text-xs md:text-sm">
                {statistics.search.topSearchValue.count.toLocaleString()} times
              </div>
            </div>
          </motion.div>
        </div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 md:mt-12 flex flex-col items-center gap-3 md:gap-4"
        >
          <Button
            onClick={async () => {
              setIsLoadingShareImage(true);

              if (shareCardRef.current === null) {
                setIsLoadingShareImage(false);
                return;
              }

              try {
                const { toPng } = await import("html-to-image");
                const dataUrl = await toPng(shareCardRef.current, {
                  cacheBust: true,
                  pixelRatio: 2,
                  skipFonts: true,
                });
                const link = document.createElement("a");
                link.download = "instagram-wrapped-2025.png";
                link.href = dataUrl;
                link.click();
                trackEvent("share_image_v2");
              } catch (err) {
                console.error("Could not generate image", err);
                trackEvent("share_image_error");
              } finally {
                setIsLoadingShareImage(false);
              }
            }}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-black text-sm md:text-lg px-8 md:px-12 py-4 md:py-6 rounded-full shadow-2xl transform transition-all hover:scale-105 cursor-pointer"
            disabled={isLoadingShareImage}
          >
            {isLoadingShareImage ? (
              <Loader2 className="animate-spin w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <>
                <Download className="inline-block mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" />
                Download Share Card
              </>
            )}
          </Button>
          <p className="text-white/60 text-xs md:text-sm text-center px-4">
            Download your personalized stats card to share!
          </p>
        </motion.div>

        {/* Hidden Share Card for generating image */}
        <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
          <ShareCard statistics={statistics} forwardedRef={shareCardRef} />
        </div>

        <Projects />
      </div>
    </WrappedContainer>
  );
}

export default Roundup;
