// src/components/ChatInput.tsx
import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="
        fixed 
        left-0 right-0 
        bottom-[57px] sm:bottom-0
        flex items-center 
        p-3 bg-white border-t shadow-md
      "
    >
      <input
        type="text"
        className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
        placeholder="اكتب رسالتك..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full flex items-center justify-center mr-2"
      >
        <Send size={18} className="text-white" />
      </button>
    </div>
  );
};

export default ChatInput;
