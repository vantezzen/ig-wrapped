import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import FatHeading from "../FatHeading";
import HideForTime from "../HideForTime";

function MostSearchedTerm({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <InfoText className="!text-zinc-200">You searched the most for</InfoText>

      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        {statistics.search.topSearchValue.value}
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="!text-zinc-200 animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          or you just delete your search history a lot.
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default MostSearchedTerm;
