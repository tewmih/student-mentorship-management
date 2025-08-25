import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
  valueLabel = "progress",
  showDate = true,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg  ">
        <p className="text-sm font-semibold text-gray-800">{`${payload[0].value}% ${valueLabel}`}</p>
        {showDate && payload[0].payload.date && (
          <p className="text-xs text-gray-500">{payload[0].payload.date}</p>
        )}
      </div>
    );
  }
  return null;
};

function LineChart({
  data = [],
  title = "Your past Progress",
  width = "100%",
  height = 320,
  strokeColor = "#3B82F6",
  fillColor = "#3B82F6",
  valueLabel = "progress",
  showDate = true,
  className = "",
  containerClassName = "w-full h-90 text-start  mx-auto  bg-white",
}) {
  const defaultData = [
    { label: "February", value: 72, date: "Feb 14th, 2020" },
    { label: "March", value: 18, date: "Mar 22nd, 2020" },
    { label: "April", value: 91, date: "Apr 8th, 2020" },
    { label: "May", value: 34, date: "May 15th, 2020" },
    { label: "June", value: 65, date: "Jun 12th, 2020" },
    { label: "July", value: 50, date: "Jul 25th, 2020" },
    { label: "August", value: 83, date: "Aug 3rd, 2020" },
    { label: "September", value: 27, date: "Sep 18th, 2020" },
    { label: "October", value: 99, date: "Oct 18th, 2020" },
    { label: "November", value: 12, date: "Nov 7th, 2020" },
    { label: "December", value: 58, date: "Dec 30th, 2020" },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  if (!chartData || chartData.length === 0) {
    return (
      <div className={containerClassName}>
        <h2 className=" font-medium text-gray-800 mb-8">{title}</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClassName} ${className}`}>
      <h2 className="text-2xl font-medium text-gray-800 ">{title}</h2>

      <ResponsiveContainer width={width} height={height}>
        <AreaChart
          data={chartData}
          margin={{ top: 40, right: 40, left: 20, bottom: 60 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fillColor} stopOpacity={0.6} />
              <stop offset="100%" stopColor={fillColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280", fontWeight: 500 }}
            dy={10}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis hide />
          <CartesianGrid strokeDasharray="none" stroke="transparent" />

          <Tooltip
            content={
              <CustomTooltip valueLabel={valueLabel} showDate={showDate} />
            }
          />

          <Area
            dataKey="value"
            type="monotone"
            stroke={strokeColor}
            strokeWidth={3}
            fill="url(#colorValue)"
            dot={{ fill: strokeColor, strokeWidth: 2, r: 4 }}
            activeDot={{
              r: 6,
              fill: strokeColor,
              strokeWidth: 2,
              stroke: "#fff",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
