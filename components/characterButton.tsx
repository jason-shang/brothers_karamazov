// each character serves as a button to open up the corresponding chat box
"use client";

import { useState } from "react";
import ChatBox from "@/components/chatbox";
import { Button } from "@/components/ui/button";

interface CharacterButtonProps {
  scene: string;
  character: string;
  setCharacter: React.Dispatch<React.SetStateAction<string>>;
  url: string;
}

export default function CharacterButton({
  scene,
  character,
  setCharacter,
  url,
}: CharacterButtonProps) {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <button>
        <img
          src={url}
          alt={character}
          onClick={() => {
            setCharacter(character);
            setChatBoxOpen(true);
          }}
          className="transition duration-300 ease-in-out transform hover:scale-125 lg:max-w-5xl"
          style={{ maxWidth: "90px" }}
        />
      </button>
      {chatBoxOpen && (
        <ChatBox
          open={chatBoxOpen}
          onClose={() => setChatBoxOpen(false)}
          scene={scene}
          character={character}
        />
      )}
    </>
  );
}
