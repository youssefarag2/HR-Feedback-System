import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Feedback {
  id: string;
  date: string;
  employeeName: string;
  score: number;
  notes: string;
}

// custome colors for each score
const COLORS = ["#ef4444", "#f97316", "#eab308", "#3b82f6", "#22c55e"];

const PieChart = ({
  feedback,
  averageScore,
}: {
  feedback: Feedback[];
  averageScore: number;
}) => {
  const scoreData = [1, 2, 3, 4, 5].map((s) => ({
    name: `${s} Stars`,
    value: feedback.filter((f) => f.score === s).length,
  }));
  return (
    <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">
        Feedback Score Distribution
      </h2>
      <p className="text-gray-500 text-sm mb-4">
        Average Score:{" "}
        <span className="font-medium text-gray-800">
          {averageScore.toFixed(2)}
        </span>
      </p>

      <div className="w-full flex justify-center">
        <div className="max-w-md w-full">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={scoreData.filter((d) => d.value > 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {scoreData
                  .filter((d) => d.value > 0)
                  .map((entry) => {
                    // Get the original index from the unfiltered array
                    const originalIndex = scoreData.findIndex(
                      (d) => d.name === entry.name
                    );
                    return (
                      <Cell
                        key={entry.name}
                        fill={COLORS[originalIndex % COLORS.length]}
                      />
                    );
                  })}
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
