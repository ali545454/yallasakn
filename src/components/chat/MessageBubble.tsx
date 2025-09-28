// src/components/chat/MessageBubble.tsx
export default function MessageBubble({
  sender,
  text,
}: {
  sender: "me" | "other";
  text: string;
}) {
  const isMe = sender === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs ${
          isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
