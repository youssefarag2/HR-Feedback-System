import "./App.css";
import FeedbackTable from "./components/FeedbackTable";
import PieChart from "./charts/PieChart";

function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-7xl p-8 space-y-6">
        <FeedbackTable />
        <PieChart />
      </div>
    </div>
  );
}

export default App;
