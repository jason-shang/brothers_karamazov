// "use client";

// import { Message } from "ai/react";
// import { Button } from "@/components/ui/button";

// export const UploadButton = (props: { messages: Message[] }) => {
//   const uploadConversation = async (messages: Message[]) => {
//     console.log("upload button clicked");
//     console.log("messages: ", messages);
//     console.log("type messages: ", typeof messages);

//     try {
//       // Create a new Blob with the messages array
//       const blob = new Blob([JSON.stringify(props.messages)], {
//         type: "application/json",
//       });

//       console.log("blob: ", blob);

//     //   // Upload the Blob to Vercel's Blob API
//     //   const response = await fetch("/api/upload", {
//     //     method: "POST",
//     //     body: blob,
//     //   });

//     //   if (response.ok) {
//     //     return "Conversation uploaded successfully";
//     //   } else {
//     //     throw new Error("Failed to upload conversation");
//     //   }
//     } catch (error) {
//       console.error("Error uploading conversation:", error);
//       return "Failed to upload conversation";
//     }

//     // Perform the upload logic here
//     // For example, you can use the `put` function from `@vercel/blob`
//     // await put(JSON.stringify(messages));
//   };
//   return (
//     <Button
//       title="Upload conversation"
//       variant="outline"
//       size="icon"
//       className="shrink-0"
//       type="submit"
//       onClick={() => {
//         uploadConversation(props.messages);
//       }}
//     >
//       Upload
//     </Button>
//   );
// };

'use client';

import { useState } from 'react';
import { put } from '@vercel/blob';
import { Message } from "ai/react";
import { Button } from "@/components/ui/button";
import { getBlobRWToken } from '@/lib/utils';

export function UploadButton({ messages }: { messages: Message[] }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);

    try {
      const currentDateTime = new Date().toISOString();
      const filename = `${currentDateTime}.txt`;
      const text = JSON.stringify(messages);

      console.log('blob rw token: ', getBlobRWToken());
      
      const blob = await put(filename, text, {
        access: 'public',
      });

      console.log('Upload successful:', blob);
    } catch (error) {
      console.error('Upload failed:', error);
    }

    setIsUploading(false);
  };

  return (
    <Button onClick={handleUpload} disabled={isUploading}>
      {isUploading ? 'Uploading...' : 'Upload'}
    </Button>
  );
}