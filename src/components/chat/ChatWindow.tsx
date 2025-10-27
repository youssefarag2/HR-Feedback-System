import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Timestamp;
}

interface ChatWindowProps {
  conversationId: string;
  employeeName: string;
  hrId: string;
  employeeAvatar: string;
}

const ChatWindow = ({
  conversationId,
  employeeName,
  hrId,
  employeeAvatar,
}: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!conversationId) return;
    const messagesRef = collection(
      db,
      "conversations",
      conversationId,
      "messages"
    );
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageRef = collection(
      db,
      "conversations",
      conversationId,
      "messages"
    );

    await addDoc(messageRef, {
      senderId: hrId,
      text: newMessage.trim(),
      timestamp: serverTimestamp(),
    });

    const conversationRef = doc(db, "conversations", conversationId);
    await updateDoc(conversationRef, {
      lastMessage: newMessage.trim(),
      lastMessageTimestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 p-6 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-bold text-gray-800">
          Chat with {employeeName}
        </h2>
      </div>

      {/* Scrollable Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No messages yet
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              senderId={msg.senderId}
              senderName={msg.senderId === hrId ? "You (HR)" : employeeName}
              avatar={
                msg.senderId === hrId
                  ? "https://i.pravatar.cc/150?img=40"
                  : employeeAvatar
              }
              text={msg.text}
              isHR={msg.senderId === hrId}
              timestamp={msg.timestamp}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky Input Bar */}
      <div className="sticky bottom-0 z-10 p-4 border-t border-gray-200 bg-white flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
