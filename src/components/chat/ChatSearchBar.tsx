interface ChatSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const ChatSearchBar = ({ value, onChange }: ChatSearchBarProps) => {
  <div className="relative">
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />

    <svg
      className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-4.35-4.35m1.15-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>;
};

export default ChatSearchBar;
