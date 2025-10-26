import FeedbackTable from "../components/FeedbackTable";
import FeedbackPieChart from "../charts/PieChart";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-6 w-full overflow-y-auto">
      <FeedbackTable />
      <FeedbackPieChart />
    </div>
  );
};

export default Dashboard;
