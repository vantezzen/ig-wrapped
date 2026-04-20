import React from "react";
import WrappedContainer from "./WrappedContainer";
import FatHeading from "./FatHeading";
import InfoText from "./InfoText";
import MutedText from "./MutedText";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink, PlugZap } from "lucide-react";
import Faq from "../Preparation/Faq";
import heroImage from "@/app/hero.png";
import Image from "next/image";
import Footer from "../Footer";
import Projects from "../Projects";
import Scam from "../Preparation/Scam";

function IntroInformation({
  onContinue,
  onDemo,
}: {
  onContinue: () => void;
  onDemo: () => void;
}) {
  return (
    <WrappedContainer>
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-12 max-w-[100vw]">
        <div className="flex flex-col justify-center gap-6 text-left">
          <FatHeading>Wrapped for Instagram</FatHeading>
          <InfoText>Get insights into your time on Instagram 🚀</InfoText>

          <div className="max-w-xl">
            <MutedText className="break-words hyphens-auto">
              Wrapped for Instagram gives you stats on your Instagram activity.
              <br />
              <br />
              To use it, request your data from{" "}
              <a
                href="https://accountscenter.instagram.com/info_and_permissions/dyi/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold break-all"
              >
                Instagram Accounts Center
              </a>{" "}
              in the "<strong>JSON</strong>" format.
              <br />
              Instagram will email you a <strong>ZIP file</strong> (e.g., "instagram-username.zip").
              <br />
              <strong>Upload that ZIP file directly here.</strong>
              <br />
              <br />
              Your exported data does not include login credentials! For more
              info on how to request your information, look at the FAQ section
              below.
            </MutedText>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="https://accountscenter.instagram.com/info_and_permissions/dyi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="dark w-full">
                Open Instagram and request my data export
                <ExternalLink className="ml-2" size={16} />
              </Button>
            </a>
            <Button onClick={onContinue} className="w-full">
              I have my Instagram data export, let's go!
              <ArrowRight className="ml-2" size={16} />
            </Button>
            <Button className="dark w-full bg-starship-100" onClick={onDemo}>
              Show demo Wrapped
              <PlugZap className="ml-2" size={16} />
            </Button>
          </div>
        </div>

        <div>
          <Image
            src={heroImage}
            alt="Wrapped for Instagram"
            width={1080}
            height={1920}
            style={{
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: 10,
            }}
          />
        </div>
      </div>
      <Scam />

      {/* <FatHeading className="mt-12 mb-6 text-xl">A quick tutorial</FatHeading>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/uIvhVxNJAtc"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="max-w-[80vw]"
      ></iframe> */}

      <FatHeading className="mt-12 mb-6 text-xl">
        Frequently Asked Questions
      </FatHeading>
      <Faq />

      <Projects />

      <div className="max-w-lg mx-auto mt-6 text-sm font-medium text-zinc-600 text-left">
        <strong>For the Search Engines:</strong>
        <p>
          Welcome to Wrapped for Instagram - Your Ultimate Source for Instagram
          Activity Insights:
        </p>
        <p>
          Are you looking to gain valuable insights into your Instagram
          activity? Look no further than Wrapped for Instagram! It offers
          comprehensive stats and analytics to help you understand your presence
          on Instagram.
        </p>
        <p>
          With Wrapped for Instagram, you can easily access in-depth information
          about your Instagram performance, including total videos viewed, watch
          session length, and much more.
        </p>
        <p>
          To get started, you'll need to download your Instagram data export
          from the official Instagram website. Simply visit{" "}
          <a href="https://accountscenter.instagram.com/info_and_permissions/dyi/">
            https://accountscenter.instagram.com/info_and_permissions/dyi/
          </a>{" "}
          and request your data in the "JSON" format. Don't worry, this file
          does not contain any sensitive information or login credentials. For
          additional reassurance, please refer to our FAQ section for a detailed
          explanation of how we handle your data.
        </p>
        <p>
          At Wrapped for Instagram, we prioritize your privacy and security.
          Unlike other platforms, your Instagram data is never uploaded or
          stored on our servers. Our tool operates exclusively within your
          browser, ensuring that your information remains confidential. We take
          pride in being a privacy-centered service, committed to protecting
          your data at all times.
        </p>
        <p>
          To provide complete transparency, we have made the full source code of
          Wrapped for Instagram available on GitHub. You can visit our GitHub
          repository at{" "}
          <a href="https://github.com/vantezzen/ig-wrapped">
            https://github.com/vantezzen/ig-wrapped
          </a>{" "}
          to review the code and verify its integrity. We believe in openness
          and accountability, and we want our users to have full confidence in
          our platform.
        </p>
        <p>
          Embrace the power of Wrapped for Instagram and uncover the insights
          that will propel your Instagram journey forward. Join our growing
          community of Instagram enthusiasts who use Wrapped for Instagram to
          deliver accurate, reliable, and actionable statistics.
        </p>
      </div>

      <Footer />
    </WrappedContainer>
  );
}

export default IntroInformation;
