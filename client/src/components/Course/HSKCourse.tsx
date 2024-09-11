"use client";
import Link from "next/link";
import { useState } from "react";

export default function HSKCourse() {
  const [step, setStep] = useState(1);
  const steps = ["Login", "Choose course", "Pay", "Study"];
  return (
    <>
      <div className="flex flex-col w-full lg:h-full items-center">
        <div>
          <h1>Video</h1>
        </div>
        <div className="flex p-5">
          <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/JJi6dkhqHKA?si=wP7ylwAOfGMrKmxF"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
