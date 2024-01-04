import React from "react";

function Scam() {
  return (
    <div className="p-12 rounded-lg bg-white text-left max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        From the creator of{" "}
        <a href="https://wrapped.vantezzen.io" className="underline font-bold">
          Wrapped for TikTok
        </a>
        .
      </h1>

      <p className="font-medium text-slate-600 mb-3">
        Recently, there's been a{" "}
        <a
          href="https://www.popbuzz.com/internet/viral/instagram-wrapped-scam-how-to-use/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          scam app
        </a>{" "}
        that allegedly phished your Instagram credentials and provided false
        data.
      </p>
      <p className="font-medium text-slate-600 mb-3">
        In response to this, I've decided to build a safe and privacy-centered
        version of Wrapped for Instagram after having build{" "}
        <a href="https://wrapped.vantezzen.io" className="underline font-bold">
          Wrapped for TikTok
        </a>{" "}
        earlier this year (
        <a
          href="https://www.popbuzz.com/internet/viral/tiktok-wrapped-2023-vantezzen/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          see press coverage
        </a>
        ).
      </p>
      <p className="font-medium text-slate-600 mb-3">
        This version of Wrapped for Instagram is{" "}
        <a
          href="https://github.com/vantezzen/ig-wrapped"
          className="underline font-bold"
        >
          open-source
        </a>{" "}
        and uses your Instagram data export to generate your stats instead of
        asking for your login credentials.
      </p>
    </div>
  );
}

export default Scam;
