// each character serves as a button to open up the corresponding chat box
"use client";
import { useState } from "react";
import ChatBox from "@/components/chatbox";
import { Button } from "@/components/ui/button";

export default function CharacterButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)}>Alyosha Karamazov</Button>
      <ChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}
