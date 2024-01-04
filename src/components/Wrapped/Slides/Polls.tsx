import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";

const commentsOnPolls = {
  0: "You should publish your optinion more often!",
  10: "You're not a big fan of polls, are you?",
  50: "You're definately getting your word out there",
  100: 'Taking "Pokemon Go to the polls" to the next level!',
};

function Polls({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000">
        You answered
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.activity.pollsParticipated} duration={2} />
        <br />
        polls
      </FatHeading>
      <HideForTime time={700}>
        <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-700">
          {lookup(statistics.activity.pollsParticipated, commentsOnPolls)}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default Polls;
