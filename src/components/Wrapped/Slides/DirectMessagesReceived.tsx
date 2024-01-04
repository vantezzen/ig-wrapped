import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";

function DirectMessagesReceived({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        You've received
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        <CountUp end={statistics.directMessages.dmReceived} duration={2} />{" "}
        <br />
        DMs
      </FatHeading>

      {statistics.directMessages.topSender && (
        <HideForTime time={500}>
          <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
            and got a lot of them from "{statistics.directMessages.topSender}".
          </InfoText>
        </HideForTime>
      )}
    </WrappedContainer>
  );
}

export default DirectMessagesReceived;
