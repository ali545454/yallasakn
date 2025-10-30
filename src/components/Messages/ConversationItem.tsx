// src/components/Messages/ConversationItem.tsx
import React from "react";

interface ConversationItemProps {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
  onClick: (id: string) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  id,
  name,
  lastMessage,
  time,
  unread,
  avatar,
  onClick,
}) => {
  return (
    <div
      className={`  flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
        unread ? "bg-gray-50" : ""
      }`}
      onClick={() => onClick(id)}
    >
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover mr-3"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-medium p-2">{name}</h4>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
      </div>
      {unread && <span className="ml-2 w-2 h-2 mt-2 bg-blue-500 rounded-full"></span>}
    </div>
  );
};

export default ConversationItem;
