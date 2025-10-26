import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { score: 1, value: 2 },
  { score: 2, value: 5 },
  { score: 3, value: 8 },
  { score: 4, value: 10 },
  { score: 5, value: 15 },
];

// custome colors for each score
const COLORS = ["#ef4444", "#f97316", "#eab308", "#3b82f6", "#22c55e"];

const PieChart = () => {
  const total = mockData.reduce((sum, item) => sum + item.value, 0);
  const average =
    mockData.reduce((sum, item) => sum + item.score * item.value, 0) / total;

  return (
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">
        Feedback Score Distribution
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Average Score:{" "}
        <span className="font-medium text-gray-800">{average.toFixed(2)}</span>
      </p>

      <div className="w-full flex justify-center">
        <div className="w-[40%]">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={mockData}
                dataKey="value"
                nameKey="score"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.score}`}
              >
                {mockData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
