// each character serves as a button to open up the corresponding chat box
"use client";

import { useState } from "react";
import ChatBox from "@/components/chatbox";
import { Button } from "@/components/ui/button";

interface CharacterButtonProps {
  time: string;
  character: string;
  setCharacter: React.Dispatch<React.SetStateAction<string>>;
  url: string;
}

export default function CharacterButton({
  time,
  character,
  setCharacter,
  url,
}: CharacterButtonProps) {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <button className="relative overflow-hidden rounded-lg">
        <img
          src={url}
          alt={character}
          onClick={() => {
            setCharacter(character);
            setChatBoxOpen(true);
          }}
          className="transition duration-300 ease-in-out transform hover:scale-110"
        />
      </button>
      {chatBoxOpen && (
        <ChatBox
          open={chatBoxOpen}
          onClose={() => setChatBoxOpen(false)}
          time={time}
          character={character}
        />
      )}
    </>
  );
}
