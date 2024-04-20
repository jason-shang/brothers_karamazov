"use client";

import React, { useState, useEffect } from "react";
import CustomTimeline from "@/components/customTimeline";
import CharacterButton from "../components/characterButton";

export default function Home() {
  const [time, setTime] = useState("day1");
  const [character, setCharacter] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed left-0 top-0 bottom-0 w-1/4 overflow-y-auto p-4">
        <CustomTimeline time={time} setTime={setTime} />
      </div>
      {time === "day2" ? (
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <CharacterButton
            time={time}
            character={"Alyosha"}
            setCharacter={setCharacter}
            url='/static/avatars/alyosha.webp'
          />
        </div>
      ) : null}
      {time === "day3" ? (
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <CharacterButton
            time={time}
            character={"Smerdyakov"}
            setCharacter={setCharacter}
            url='/static/avatars/alyosha.webp'
          />
        </div>
      ) : null}
      {time === "day3" ? (
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <CharacterButton
            time={time}
            character={"Ivan's Devil"}
            setCharacter={setCharacter}
            url='/static/avatars/alyosha.webp'
          />
        </div>
      ) : null}
      {time === "day4" ? (
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <CharacterButton
            time={time}
            character={"Katerina"}
            setCharacter={setCharacter}
            url='/static/avatars/alyosha.webp'
          />
        </div>
      ) : null}
    </main>
  );
}
