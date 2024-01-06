import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";

function hourToTime(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

function MostActiveHour({ statistics }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        You were most active at
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        {hourToTime(Number(statistics.directMessages.mostActiveHour))}
      </FatHeading>
    </WrappedContainer>
  );
}

export default MostActiveHour;
