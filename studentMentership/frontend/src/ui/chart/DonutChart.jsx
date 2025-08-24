import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DonutChart = ({
  percentage = 0,
  title = "Progress",
  size = 200,
  strokeWidth = 20,
  activeColor = "#10b981", // emerald-500
  backgroundColor = "#d1fae5", // emerald-100
  centerTextColor = "#1f2937", // gray-800
  titleColor = "#6b7280", // gray-500
  showTooltip = true,
  className = "",
}) => {
  // Create data for the donut chart
  const data = [
    { name: "completed", value: percentage, color: activeColor },
    { name: "remaining", value: 100 - percentage, color: backgroundColor },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (
      active &&
      payload &&
      payload.length &&
      payload[0].payload.name === "completed"
    ) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{`${payload[0].value}% ${title}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={size * 0.3}
              outerRadius={size * 0.45}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-2xl font-bold"
            style={{ color: centerTextColor }}
          >
            {percentage}%
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="mt-4 text-sm font-medium text-center"
        style={{ color: titleColor }}
      >
        {title}
      </h3>
    </div>
  );
};

export default DonutChart;
