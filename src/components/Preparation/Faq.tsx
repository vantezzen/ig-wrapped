"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const items = [
  {
    question: "How can I get my Instagram data?",
    answer: (
      <>
        You can request your Instagram data export at{" "}
        <a
          href="https://accountscenter.instagram.com/info_and_permissions/dyi/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          https://accountscenter.instagram.com/info_and_permissions/dyi/
        </a>{" "}
        or by opening Instagram, going to your profile and clicking on the three
        bars in the top right corner. Then, click on "Settings and privacy",
        "Account Center" and then on "Your information and permissions". Then go
        to "Download your data".
        <br />
        <br />
        In both cases, you need to choose just your Instagram account, choose
        "Complete copy" and select "<strong>JSON</strong>" as the file format
        and "Low" as the media quality. Make sure to select "JSON", otherwise
        Wrapped for Instagram won't be able to read your data.
        <br />
        After clicking on "Submit request" you'll need to wait until Instagram
        has prepared your data export. This may take a while, depending on how
        much data you have on Instagram.
        <br />
        <br />
        Once your data export is ready, you will receive an email with a link to download a <strong>ZIP file</strong>.
        <br />
        You'll need to upload this <strong>ZIP file</strong> directly to Wrapped for
        Instagram. Do not unzip it.
      </>
    ),
  },
  {
    question: "Which file should I use for Wrapped for Instagram?",
    answer: (
      <>
        After downloading your Instagram data export, you can choose the ZIP
        file you downloaded (it should be called "instagram-[...].zip"). Wrapped
        will the automatically extract the ZIP file and use the JSON files
        inside.
      </>
    ),
  },
  {
    question: "Is this safe? Is Wrapped for Instagram legit?",
    answer: (
      <>
        Wrapped for Instagram is safe and privacy-centered. If you know how to
        read code, you can look at Wrapped for Instagram's full source code at{" "}
        <a
          href="https://github.com/vantezzen/ig-wrapped"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          https://github.com/vantezzen/ig-wrapped
        </a>
        . Your Instagram data is only used in your browser and never uploaded to
        any server. We will not store or process your data on our server in any
        way.
      </>
    ),
  },
  {
    question: "What is this website for?",
    answer: (
      <>
        I always like Spotify Wrapped and wanted to have something similar for
        Instagram. So I built Wrapped for Instagram, a website that generates a
        personalized summary of your Instagram usage based on your Instagram
        data export.
        <br />
        <br />
        Wrapped for Instagram is simply a fun little project and doesn't
        currently have any monetization or business model behind it. It's just a
        fun project for me to work on in my free time.
      </>
    ),
  },
  {
    question: "Can you get access to my Instagram account with my data?",
    answer: (
      <>
        The short answer is <strong>no</strong>. Your Instagram data export only
        contains data about your account, not your login credentials!
        <br />
        You can <strong>verify this yourself</strong> by opening your Instagram
        data export and looking at the files inside in a text editor. You can
        try searching for your Instagram password in the file and you'll see
        that it's not there.
        <br />
        In general, Instagram doesn't store your unencrypted password anywhere
        and only stores a hashed version of it. Due to this, it's impossible for
        the Instagram data export to contain your password.
        <br />
        Wrapped for Instagram will never ask you for your Instagram login
        credentials and doesn't require you to enter them anywhere!
        <br />
        <br />
        Depending on your Instagram account data, your data export may contain
        your email address or phone number. This data is{" "}
        <strong>not used or transferred</strong> by Wrapped for Instagram!
        <br />
        However, if you are concerned about this, you can open your export data
        in a text editor, search for your email address or phone number and
        delete it from the file before uploading it to Wrapped for Instagram.
      </>
    ),
  },
  {
    question: "Does my Wrapped contain my full Instagram history?",
    answer: (
      <>Wrapped for Instagram uses the last 365 days of your Instagram data.</>
    ),
  },
  {
    question:
      "How long do I have to wait for my Instagram data? Why isn't this faster?",
    answer: (
      <>
        Instagram needs to prepare your data export after you request it. This
        process can take anywhere from a few minutes to a few hours, depending
        on how much data you have on Instagram.
        <br />
        Unfortunately, there is currently no other method for Wrapped for
        Instagram to access your Instagram data faster.
      </>
    ),
  },
  {
    question: "How does Wrapped for Instagram work?",
    answer: (
      <>
        Wrapped for Instagram uses your Instagram data export to calculate your
        Wrapped. This means that all statistics are generated locally in your
        browser and your data is never uploaded to any server.
      </>
    ),
  },
  {
    question: "How does the Spotify integration work?",
    answer: (
      <>
        If you want to, Wrapped for Instagram can play fitting songs in the
        background while you're looking at your Wrapped - similar to how Spotify
        Wrapped works.
        <br />
        To achieve this, Wrapped for Instagram uses{" "}
        <a
          href="https://developer.spotify.com/documentation/embeds"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          Spotify Embeds
        </a>{" "}
        to embed a Spotify player to the bottom right of the screen.
        <br />
        For this to work, you'll only need to be logged into Spotify in your
        browser - you don't need to connect your Spotify account to Wrapped for
        Instagram! Because Spotify is embedded using Spotify's build-in support
        for websites to do so, we don't have access to your Spotify account in
        any way.
      </>
    ),
  },
];

function Faq() {
  return (
    <Accordion
      type="single"
      collapsible
      className="max-w-lg dark mx-auto text-left"
    >
      {items.map((item) => (
        <AccordionItem value={item.question} key={item.question}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Faq;
