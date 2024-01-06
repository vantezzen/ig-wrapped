import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";

function Emojis({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        You used the "{statistics.emoji.mostUsedEmoji.emoji}" emoji
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.emoji.mostUsedEmoji.count} duration={2} />
        <br />
        times
      </FatHeading>
      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          and used {statistics.emoji.emojisUsed.toLocaleString()} different
          emojis in total
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default Emojis;
