"use client"

import React, { useState, useEffect } from "react";
import CustomTimeline from "@/components/customTimeline";
import CharacterButton from "../components/characterButton";

export default function Home() {
  const [time, setTime] = useState("day1");
  const [character, setCharacter] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [buttonsOpacity, setButtonsOpacity] = useState(1); // New state for buttons opacity

  useEffect(() => {
    const newImageUrl = `/static/maps/${time}.webp`;
    const backgroundImage = document.getElementById("background-image");
    if (backgroundImage) {
      backgroundImage.style.opacity = "0"; // Start fading out
      setButtonsOpacity(0); // Start fading out buttons
      setTimeout(() => {
        setBackgroundImageUrl(newImageUrl); // Update the URL after fade out
        backgroundImage.style.opacity = "1"; // Start fading in
        setButtonsOpacity(1); // Start fading in buttons
      }, 1000); // Match this delay with the CSS transition time
    }
  }, [time]);

  return (
    <main>
      <div className="flex w-full min-h-screen">
        <div className="fixed top-0 left-0 w-1/5 min-h-screen z-10">
          <CustomTimeline time={time} setTime={setTime} />
        </div>
        <div
          className="absolute w-full h-full"
          style={{
            backgroundImage: `url('${backgroundImageUrl}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            transition: "opacity 1s ease-in-out",
            opacity: buttonsOpacity, // Apply dynamic opacity to background and buttons
          }}
          id="background-image"
        >
          {/* Render buttons based on time */}
          {time === "day1" && (
            <>
              <div style={{ top: "30rem", right: "12rem", position: "absolute", transition: "opacity 1s ease-in-out", opacity: buttonsOpacity }}>
                <CharacterButton
                  time={time}
                  character={"Alyosha"}
                  setCharacter={setCharacter}
                  url="/static/avatars/alyosha.png"
                />
              </div>

              <div style={{ top: "38rem", right: "50rem", position: "absolute", transition: "opacity 1s ease-in-out", opacity: buttonsOpacity }}>
                <CharacterButton
                  time={time}
                  character={"Alyosha"}
                  setCharacter={setCharacter}
                  url="/static/avatars/katerina.png"
                />
              </div>

              <div style={{ top: "18rem", right: "41rem", position: "absolute", transition: "opacity 1s ease-in-out", opacity: buttonsOpacity }}>
                <CharacterButton
                  time={time}
                  character={"Alyosha"}
                  setCharacter={setCharacter}
                  url="/static/avatars/zosima.png"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
