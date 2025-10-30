// src/components/MessageItem.tsx
import React from "react";

interface MessageItemProps {
  sender: "me" | "owner" | "admin";
  text: string;
  time: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ sender, text, time }) => {
  const isMe = sender === "me";

  const getBgColor = () => (isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800");

  return (
    <div className={`flex  pt-2 ${isMe ? "justify-end" : "justify-start"} mb-2 px-2`}>
      <div className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${getBgColor()}`}>
        <p className="break-words">{text}</p>
        <span className={`text-xs mt-1 block ${isMe ? "text-white/80" : "text-gray-500"}`}>
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
