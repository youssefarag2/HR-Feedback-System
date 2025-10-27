import { useState } from "react";

import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/ChatWindow";

interface Employee {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
}

const Chat = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const hrId = "hr_sarah";

  return (
    <div className="flex h-screen">
      <ChatList
        onSelectConversation={(conversationId, employee) => {
          setSelectedConversationId(conversationId);
          setSelectedEmployee(employee);
        }}
      />
      <div className="flex-1 bg-gray-50">
        {selectedConversationId ? (
          <ChatWindow
            conversationId={selectedConversationId}
            employeeName={selectedEmployee!.name}
            employeeAvatar={selectedEmployee!.avatar}
            hrId={hrId}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an employee to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
