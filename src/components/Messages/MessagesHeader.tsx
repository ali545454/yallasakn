// src/components/ChatHeader.tsx
import React from "react";
import { ArrowLeft, Search } from "lucide-react";

interface ChatHeaderProps {
  name: string;
  college: string;
  avatar: string;
  onBack?: () => void;
  onSearch?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  college,
  avatar,
  onBack,
  onSearch,
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-white shadow-sm w-full">
      {/* زر الرجوع */}
      <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded">
        <ArrowLeft size={20} />
      </button>

      {/* صورة واسم الشخص */}
      <div className="flex-1 flex items-center justify-center space-x-3">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col text-center">
          <span className="font-semibold">{name}</span>
          <span className="text-xs text-gray-500">{college}</span>
        </div>
      </div>

      {/* زر البحث */}
      <button onClick={onSearch} className="p-1 hover:bg-gray-100 rounded">
        <Search size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
