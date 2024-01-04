import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import FatHeading from "../FatHeading";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";

const commentsOnStories = {
  0: "Living the quiet life, huh?",
  10: "You're a bit of a lurker, aren't you?",
  20: "Getting the hang of this, I see.",
  100: "You're a regular, aren't you?",
  300: "You're a bit of a chatterbox, aren't you?",
  400: "You know you can do things without posting about it, right?",
  1000: "I bet most of your followers just scroll past your stories at this point, huh?",
};

function StoriesPosted({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200">
        In the last year, you posted
      </InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.activity.storiesPosted} duration={2} />
        <br />
        stories
      </FatHeading>

      <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
        and liked <CountUp end={statistics.activity.storyLikes} duration={2} />{" "}
        ones.
      </InfoText>
      <HideForTime time={500}>
        <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          {lookup(statistics.activity.storiesPosted, commentsOnStories)}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default StoriesPosted;
