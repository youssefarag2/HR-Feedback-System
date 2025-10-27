interface Feedback {
  id: string;
  date: string;
  employeeName: string;
  score: number;
  notes: string;
}

const FeedbackTable = ({ feedback }: { feedback: Feedback[] }) => {
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
          {feedback.map((item) => (
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
