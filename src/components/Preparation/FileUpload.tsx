"use client";
import React from "react";
import FatHeading from "../Wrapped/FatHeading";
import { Button } from "../ui/button";
import { File as FileIcon } from "lucide-react";
import MutedText from "../Wrapped/MutedText";

function FileUpload({ onFileSelect }: { onFileSelect: (_file: File) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col gap-6 text-center bg-zinc-900 text-starship-400 dark p-6">
      <FatHeading className="text-3xl">
        Upload your Instagram Data
        <br />
        (ZIP File)
      </FatHeading>

      <MutedText className="!text-zinc-200 text-base">
        Please upload the <strong>ZIP file</strong> you received from Instagram.
        <br />
        (e.g., "instagram-yourname.zip")
        <br />
        <br />
        Do not unzip it. We will process it locally in your browser.
        <br />
        <br />
        Wrapped for Instagram is{" "}
        <a
          href="https://github.com/vantezzen/ig-wrapped"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-source
        </a>{" "}
        if you want to verify this.
      </MutedText>
      <label htmlFor="file-upload">
        <Button
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <FileIcon size={16} className="mr-2" />
          Select ZIP file
        </Button>
      </label>

      <input
        type="file"
        accept=".zip,.json"
        id="file-upload"
        className="hidden"
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files) {
            onFileSelect(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}

export default FileUpload;
