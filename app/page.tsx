"use client";

import React, { useState, useEffect } from "react";
import CustomTimeline from "@/components/customTimeline";
import CharacterButton from "../components/characterButton";

export default function Home() {
  const [time, setTime] = useState("day1");
  const [character, setCharacter] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(`/static/maps/${time}.webp`);

  useEffect(() => {
    const backgroundImage = document.getElementById("background-image");
    if (backgroundImage) {
      // First, fade out the current image
      backgroundImage.style.opacity = "0";
      setTimeout(() => {
        // Update the image URL state after the fade out is complete
        setBackgroundImageUrl(`/static/maps/${time}.webp`);
        // Then fade in the new image
        backgroundImage.style.opacity = "1";
      }, 1000); // Match this delay with the CSS transition time
    }
  }, [time]);
  
  return (
    <main>
      <div className="flex w-full min-h-screen">
        <div className="w-1/5 min-h-screen">
          <CustomTimeline time={time} setTime={setTime} />
        </div>

        {time === "day1" ? (
        <div
          className="w-4/5 min-h-screen"
          style={{
            backgroundImage: `url('${backgroundImageUrl}')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            opacity: "1",  // Ensure this is always 1 when not in transition
            transition: "opacity 1s ease-in-out",
          }}
          id="background-image"
        >
          <div style={{ top: '30rem', right: '12rem', position: 'absolute' }}>
            <CharacterButton
              time={time}
              character={"Alyosha"}
              setCharacter={setCharacter}
              url="/static/avatars/alyosha.png"
            />
          </div>

          <div style={{ top: '38rem', right: '50rem', position: 'absolute' }}>
            <CharacterButton
              time={time}
              character={"Alyosha"}
              setCharacter={setCharacter}
              url="/static/avatars/katerina.png"
            />
          </div>

          <div style={{ top: '18rem', right: '41rem', position: 'absolute' }}>
            <CharacterButton
              time={time}
              character={"Alyosha"}
              setCharacter={setCharacter}
              url="/static/avatars/zosima.png"
            />
          </div>
        </div>
        ) : null}

        {time === "day2" ? (
          <div
          className="w-4/5 min-h-screen"
          style={{
            backgroundImage: `url('${backgroundImageUrl}')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            opacity: "1",  // Ensure this is always 1 when not in transition
            transition: "opacity 1s ease-in-out",
          }}
          id="background-image"
        >
          <div style={{ top: '18rem', right: '41rem', position: 'absolute' }}>
            <CharacterButton
              time={time}
              character={"Alyosha"}
              setCharacter={setCharacter}
              url="/static/avatars/alyosha.png"
            />
          </div>
          </div>
        ) : null}
        {time === "day3" ? (
          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            <CharacterButton
              time={time}
              character={"Smerdyakov"}
              setCharacter={setCharacter}
              url="/static/avatars/alyosha.webp"
            />
          </div>
        ) : null}
        {time === "day3" ? (
          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            <CharacterButton
              time={time}
              character={"Ivan's Devil"}
              setCharacter={setCharacter}
              url="/static/avatars/alyosha.webp"
            />
          </div>
        ) : null}
        {time === "day4" ? (
          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            <CharacterButton
              time={time}
              character={"Katerina"}
              setCharacter={setCharacter}
              url="/static/avatars/alyosha.webp"
            />
          </div>
        ) : null}
      </div>
    </main>
  );
}
