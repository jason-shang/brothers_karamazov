// each character serves as a button to open up the corresponding chat box
"use client";

import { useState } from "react";
import ChatBox from "@/components/chatbox";
import { Button } from "@/components/ui/button";

interface CharacterButtonProps {
  time: string;
  character: string;
  setCharacter: React.Dispatch<React.SetStateAction<string>>;
}

export default function CharacterButton({
  time,
  character,
  setCharacter,
}: CharacterButtonProps) {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setCharacter(character);
          setChatBoxOpen(true);
        }}
      >
        {character}
      </Button>
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
