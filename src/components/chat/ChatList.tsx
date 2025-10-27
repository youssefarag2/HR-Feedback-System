import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import ChatSearchBar from "./ChatSearchBar";

interface Employee {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
}

interface Conversation {
  id: string;
  participantNames: string[];
  lastMessage?: string;
  lastMessageTimestamp?: Timestamp;
}
interface ChatItem {
  id: string;
  name: string;
  lastMessage?: string;
  avatar: string;
}

interface ChatListProps {
  onSelectConversation: (conversationId: string, employee: Employee) => void;
}

const ChatList = ({ onSelectConversation }: ChatListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const hrName = "Sarah HR";

  // Fetch employees & ensure conversation exists
  useEffect(() => {
    const employeesRef = collection(db, "employees");
    const unsubscribe = onSnapshot(employeesRef, async (snapshot) => {
      const employeeList = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Employee)
      );
      setEmployees(employeeList);

      // Ensure each has a conversation document
      employeeList.forEach(async (emp) => {
        const convoRef = doc(db, "conversations", emp.id);
        const convoSnap = await getDoc(convoRef);

        // Only create if it doesn’t exist
        if (!convoSnap.exists()) {
          await setDoc(convoRef, {
            participantNames: [hrName, emp.name],
            lastMessage: "",
            lastMessageTimestamp: null,
          });
        }
      });
    });

    return () => unsubscribe();
  }, []);

  // Listen to all conversations
  useEffect(() => {
    const convosRef = collection(db, "conversations");
    const q = query(convosRef, orderBy("lastMessageTimestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convos = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Conversation)
      );
      setConversations(convos);
    });

    return () => unsubscribe();
  }, []);

  const chatListData: ChatItem[] = employees.map((emp) => {
    const convo = conversations.find((c) => c.id === emp.id);
    return {
      id: emp.id,
      name: emp.name,
      avatar: emp.avatar,
      lastMessage: convo?.lastMessage || "No messages yet",
    };
  });

  const filteredChats = chatListData.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/3 h-screen border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <ChatSearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => {
            const employee = employees.find((e) => e.id === chat.id)!;
            return (
              <div
                key={chat.id}
                onClick={() => onSelectConversation(chat.id, employee)}
                className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {chat.name}
                  </span>
                  <span className="text-sm text-gray-500 truncate w-48">
                    {chat.lastMessage || "No messages yet"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-8">No employees found</p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
