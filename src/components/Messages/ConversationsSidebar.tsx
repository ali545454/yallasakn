// src/components/ConversationsSidebar.tsx
import React, { useState } from "react";
import ConversationItem from "./ConversationItem";
import { mockConversations } from "../../data/mockConversations";

const ConversationsSidebar: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setSelectedId(id);
    console.log("Selected conversation:", id);
  };

  return (
    <div className="w-80 border-r h-full overflow-y-auto">
      {mockConversations.map((conv) => (
        <ConversationItem
          key={conv.id}
          id={conv.id}
          name={conv.name}
          lastMessage={conv.lastMessage}
          time={conv.time}
          unread={conv.unread}
          avatar={conv.avatar}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default ConversationsSidebar;
