import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";

function ExternalTracking({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        Instagram tracked you across
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.externalTracking.totalPages} duration={2} />
        <br />
        pages
      </FatHeading>
      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          Do {statistics.externalTracking.interestingPageNames.join(", ")} sound
          familiar?
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default ExternalTracking;
