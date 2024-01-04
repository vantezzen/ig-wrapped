import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";

const commentsOnUnfollows = {
  1: "Was that your ex?",
  2: "A bit of a spring clean, huh?",
  10: "Uhh, a bit of a serial unfollower, aren't you?",
  50: "Unfollowing people is a bit of a hobby for you, isn't it?",
};

function UnfollowedCount({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        Recently, you've unfollowed
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.profile.unfollowedCount} duration={2} />
        <br />
        accounts
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          {lookup(statistics.profile.unfollowedCount, commentsOnUnfollows)}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default UnfollowedCount;
