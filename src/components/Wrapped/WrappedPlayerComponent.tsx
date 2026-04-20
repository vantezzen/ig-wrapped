"use client";
import WrappedPlayer from "@/lib/Player/WrappedPlayer";
import SpotifyFramePlayer from "@/lib/Spotify/FramePlayer";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WrappedContainer, { WrappedSlideProps } from "./WrappedContainer";
import ProgressBar from "./Navigation/ProgressBar";
import SlideControls from "./Navigation/SlideControls";
import GestureHandler from "./Navigation/GestureHandler";

const LoadingPlayerComponent = (_props: WrappedSlideProps) => {
  return (
    <WrappedContainer>
      <Loader2 size={32} className="animate-spin" />
    </WrappedContainer>
  );
};

function WrappedPlayerComponent({
  spotify,
  ...props
}: {
  spotify: SpotifyFramePlayer | null;
} & WrappedSlideProps) {
  const [player] = useState(() => new WrappedPlayer(spotify));
  const [, forceUpdateState] = useState(0);
  const forceUpdate = () => forceUpdateState((s) => s + 1);

  useEffect(() => {
    player.on("update", forceUpdate);
    
    // Initialize player with statistics (replaces old play() method)
    player.initialize(props.statistics);

    return () => {
      player.off("update", forceUpdate);
    };
  }, [player, props.statistics]);

  useEffect(() => {
    player._spotifyPlayer = spotify;
  }, [spotify, player]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        player.previousSlide();
      } else if (e.key === "ArrowRight") {
        player.nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [player]);

  const Component = player.currentSlide?.component || LoadingPlayerComponent;

  return (
    <div className="relative w-full h-full">
      {/* Progress bars at top */}
      <ProgressBar
        totalSlides={player.slides.length}
        currentSlide={player.currentSlideIndex}
        onJumpToSlide={(index) => player.jumpToSlide(index)}
      />

      {/* Gesture-enabled slide container */}
      <GestureHandler
        onSwipeLeft={() => player.nextSlide()}
        onSwipeRight={() => player.previousSlide()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={player.currentSlideIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="w-full h-full"
          >
            <Component {...props} />
          </motion.div>
        </AnimatePresence>
      </GestureHandler>

      {/* Navigation controls */}
      <SlideControls
        onNext={() => player.nextSlide()}
        onPrevious={() => player.previousSlide()}
        canGoNext={player.canGoNext()}
        canGoPrevious={player.canGoPrevious()}
      />
    </div>
  );
}

export default WrappedPlayerComponent;
