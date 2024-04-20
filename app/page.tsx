"use client";

import React, { useState, useEffect } from "react";
import CustomTimeline from "@/components/customTimeline";
import CharacterButton from "../components/characterButton";

export default function Home() {
  const [time, setTime] = useState("day1");
  const [character, setCharacter] = useState("");

  return (
    <main>
      <div className="flex w-full min-h-screen">
        <div className="w-1/5 min-h-screen">
          <CustomTimeline time={time} setTime={setTime} />
        </div>
        <div
          className="w-3/4 min-h-screen"
          style={{
            backgroundImage: "url('/static/maps/day1.webp')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
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

        {/* {time === "day2" ? (
          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            <CharacterButton
              time={time}
              character={"Alyosha"}
              setCharacter={setCharacter}
              url="/static/avatars/alyosha.webp"
            />
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
        ) : null} */}
      </div>
    </main>
  );
}
