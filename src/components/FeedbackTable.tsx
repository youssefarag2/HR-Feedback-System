import { useState } from "react";

interface Feedback {
  id: string;
  date: string;
  employeeName: string;
  score: number;
  notes: string;
}

const FeedbackTable = ({ feedback }: { feedback: Feedback[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(feedback.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = feedback.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="bg-gray-50 text-black font-bold tracking-wide">
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Employee Name</th>
            <th className="px-6 py-3">Score</th>
            <th className="px-6 py-3 w-1/3">Notes</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} className="border-t border-gray-200">
              <td className="px-6 py-3 text-gray-500">{item.date}</td>
              <td className="px-6 py-3 text-black">{item.employeeName}</td>
              <td className="px-6 py-3">
                <span className="px-5 py-1 bg-gray-100 rounded-md font-semibold text-black">
                  {item.score} stars
                </span>
              </td>
              <td className="px-6 py-3 text-gray-500 whitespace-normal w-1/3 max-w-[300px]">
                {item.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center px-6 py-4 bg-gray-50 border-t border-gray-200 space-x-3">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`w-28 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`w-24 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
        <span className="text-gray-700 text-sm">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default FeedbackTable;
