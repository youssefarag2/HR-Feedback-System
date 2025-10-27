import { Timestamp } from "firebase/firestore";

interface ChatMessageProps {
  senderId: string;
  senderName: string;
  avatar: string;
  text: string;
  isHR: boolean;
  timestamp: Timestamp;
}

const ChatMessage = ({
  senderName,
  avatar,
  text,
  isHR,
  timestamp,
}: ChatMessageProps) => {
  // Convert Firestore timestamp -> JS Date
  const date = timestamp?.toDate();

  const formatTimestamp = (date?: Date) => {
    if (!date) return "";
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const options: Intl.DateTimeFormatOptions = isToday
      ? { hour: "numeric", minute: "numeric", hour12: true }
      : {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };

    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return isToday ? `Today, ${formattedTime}` : formattedTime;
  };

  return (
    <div
      className={`flex items-start mb-4 ${
        isHR ? "justify-end" : "justify-start"
      }`}
    >
      {/* Employee message (avatar first) */}
      {!isHR && (
        <img
          src={avatar}
          alt={senderName}
          className="w-10 h-10 rounded-full mr-3"
        />
      )}

      <div className={`max-w-xs text-left`}>
        <p className="text-gray-500 text-sm mb-1">{senderName}</p>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isHR ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          <p>{text}</p>
          {date && (
            <span
              className={`text-xs ${
                isHR ? "text-blue-100" : "text-gray-500"
              } ml-2 block text-right`}
            >
              {formatTimestamp(date)}
            </span>
          )}
        </div>
      </div>

      {/* HR message (avatar after bubble) */}
      {isHR && (
        <img
          src={avatar}
          alt={senderName}
          className="w-10 h-10 rounded-full ml-3"
        />
      )}
    </div>
  );
};

export default ChatMessage;
