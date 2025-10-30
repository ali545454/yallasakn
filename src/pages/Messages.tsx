// src/pages/MessagesPage.tsx
import React from "react";
import ConversationsSidebar from "../components/Messages/ConversationsSidebar";
import ChatWindow from "../components/Messages/ChatWindow";

const MessagesPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      <ConversationsSidebar />
      <ChatWindow />
    </div>
  );
};

export default MessagesPage;
