interface Feedback {
  id: number;
  date: string;
  employeeName: string;
  score: number;
  notes: string;
}

const mockData: Feedback[] = [
  {
    id: 1,
    date: "2024-07-26",
    employeeName: "Alice Johnson",
    score: 5,
    notes: "Excellent teamwork and communication.",
  },
  {
    id: 2,
    date: "2024-07-25",
    employeeName: "Bob Smith",
    score: 4,
    notes: "Good performance but needs to meet deadlines.",
  },
  {
    id: 3,
    date: "2024-07-23",
    employeeName: "Charlie Brown",
    score: 3,
    notes: "Average contribution, can improve further.",
  },
];

const FeedbackTable = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-gray-50 text-black font-bold tracking-wide">
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Employee Name</th>
            <th className="px-6 py-3">Score</th>
            <th className="px-6 py-3">Notes</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <tr key={item.id} className="border-t border-gray-200">
              <td className="px-6 py-3 text-gray-500">{item.date}</td>
              <td className="px-6 py-3 text-black">{item.employeeName}</td>
              <td className="px-6 py-3">
                <span className="px-5 py-1 bg-gray-100 rounded-md font-semibold text-black">
                  {item.score} stars
                </span>
              </td>
              <td className="px-6 py-3 text-gray-500">{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
