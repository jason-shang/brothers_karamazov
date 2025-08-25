// each character serves as a button to open up the corresponding chat box
"use client";

import { useState } from "react";
import Image from "next/image";
import ChatBox from "@/components/chatbox";

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
      <button
        onClick={() => {
          setCharacter(character);
          setChatBoxOpen(true);
        }}
      >
        <Image
          src={url}
          alt={character}
          width={90}
          height={90}
          className="transition duration-300 ease-in-out transform hover:scale-125"
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