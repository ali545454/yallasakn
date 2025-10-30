// src/components/ChatWindow.tsx
import React, { useState, useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import ChatInput from "./ChatInput";
import { mockMessages } from "../../data/mockMessages";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
    const BOTTOM_NAV_HEIGHT = 100; // ارتفاع القائمة السفلية

  const handleSend = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Scroll تلقائي لأحدث رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
<div className="flex flex-col h-screen" style={{ paddingBottom: BOTTOM_NAV_HEIGHT + 80 }}>
  {/* 80px = ارتفاع ChatInput تقريبا */}
  <div className="flex-1 overflow-y-auto p-2">
    {messages.map((msg) => (
      <MessageItem
        key={msg.id}
        sender={msg.sender}
        text={msg.text}
        time={msg.time}
      />
    ))}
    <div ref={messagesEndRef} />
  </div>
  <ChatInput onSend={handleSend} />
</div>

  );
};

export default ChatWindow;
