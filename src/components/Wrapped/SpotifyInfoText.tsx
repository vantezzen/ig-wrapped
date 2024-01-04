import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import MutedText from "./MutedText";
import { Button } from "../ui/button";

function SpotifyInfoText({ onContinue }: { onContinue: () => void }) {
  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <FatHeading>Better with Spotify</FatHeading>
      <MutedText className="!text-zinc-200 max-w-xl mx-auto">
        Wrapped for Instagram can play fitting songs during your Wrapped using
        the Spotify Player.
        <br />
        <br />
        If you have Spotify Premium, simply log in to your Spotify in your
        browser - no need to connect your account to Wrapped for Instagram!
        Wrapped for Instagram won't have access to your Spotify data, but simply
        embed the Spotify Player.
        <br />
        <br />
        If you don't have Spotify Premium, you can still fully use Wrapped for
        Instagram - just without the music.
      </MutedText>

      <Button
        onClick={() => {
          const url = `https://accounts.spotify.com/en/login?continue=${encodeURIComponent(
            window.location.href
          )}`;
          window.location.href = url;
        }}
        className="bg-starship-500 hover:bg-starship-300 text-zinc-900"
      >
        I have Spotify Premium, let's go!
      </Button>

      <Button onClick={onContinue} className="dark">
        Continue without Spotify
      </Button>
    </WrappedContainer>
  );
}

export default SpotifyInfoText;
