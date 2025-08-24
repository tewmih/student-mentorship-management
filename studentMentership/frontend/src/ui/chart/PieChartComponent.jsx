import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DEFAULT_COLORS = [
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#EAB308",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
        <p className="text-sm font-bold text-gray-900 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-700">{`Value: ${payload[0].value}`}</p>
        <p
          className="text-sm font-semibold"
          style={{ color: payload[0].color }}
        >
          {`${payload[0].payload.percentage}%`}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-col space-y-2 ml-8">
      <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-600 mb-2">
        <span>batch</span>
        <span>Value</span>
        <span>%</span>
      </div>
      {payload.map((entry, index) => (
        <div
          key={index}
          className="grid grid-cols-3 gap-4 items-center text-sm"
        >
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-700">{entry.value}</span>
          </div>
          <span className="text-gray-900 font-medium">
            {entry.payload.value}
          </span>
          <span className="text-gray-600">{entry.payload.percentage}%</span>
        </div>
      ))}
    </div>
  );
};

function PieChartComponent({
  data = [], // Added default empty array for data prop
  title = "Pie Chart",
  colors = DEFAULT_COLORS,
  width = 240,
  height = 240,
  innerRadius = 60,
  outerRadius = 100,
  showLegend = true,
  centerLabel = "Total Value",
}) {
  const totalValue =
    data && data.length > 0
      ? data.reduce((sum, item) => sum + (item.value || 0), 0)
      : 0;

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>
        <div className="flex items-center justify-center h-48 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg ">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>

      <div className="flex items-center flex-col sm:flex-row">
        <div className="relative mb-10">
          <ResponsiveContainer height={height} width={width}>
            <PieChart>
              <Pie
                data={data}
                nameKey="label"
                dataKey="value"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                cx="50%"
                cy="50%"
                paddingAngle={3}
                className="px-10"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500">{centerLabel}</span>
            <span className="text-2xl font-bold text-gray-900">
              {totalValue}
            </span>
          </div>
        </div>

        {showLegend && (
          <CustomLegend
            payload={data.map((item, index) => ({
              value: item.label,
              color: colors[index % colors.length],
              payload: item,
            }))}
          />
        )}
      </div>
    </div>
  );
}

export default PieChartComponent;
