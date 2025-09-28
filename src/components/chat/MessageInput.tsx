// src/components/chat/MessageInput.tsx
import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;

    // إرسال الرسالة للباك اند
    onSend(text.trim());

    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isTextEmpty = text.trim() === "";

  return (
    <div className="flex items-center gap-2 p-2 border-t bg-gray-50">
      <button className="flex-shrink-0 p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
        <Paperclip className="w-5 h-5" />
      </button>

      <div className="relative flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب رسالة..."
          className="w-full py-2 pl-4 pr-12 text-gray-800 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
        />
      </div>

      <button
        onClick={handleSend}
        disabled={isTextEmpty}
        className={`flex-shrink-0 p-2 text-white rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${isTextEmpty
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
          }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}
