import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card.jsx";

function DepartmentChart({ data, title }) {
  // Check if data is not an array or is an empty array to prevent errors.
  if (!Array.isArray(data) || data.length === 0) {
    return null; // or return a placeholder message, like <div>No data to display</div>
  }

  const totalValue = data.reduce((accumulator, currentValue) => {
    // Add a check here to ensure currentValue.value is a number
    const value =
      typeof currentValue.value === "number" ? currentValue.value : 0;
    return accumulator + value;
  }, 0);

  const calculatedMaxValue = totalValue === 0 ? 1 : totalValue;

  // Function to format the labels dynamically
  const formatLabel = (value) => {
    if (value >= 1000) {
      return `${Math.round(value / 1000)}K`;
    }
    return value.toLocaleString();
  };

  const labels = [
    0,
    parseFloat((calculatedMaxValue * 0.25).toFixed(1)),
    parseFloat((calculatedMaxValue * 0.5).toFixed(1)),
    parseFloat((calculatedMaxValue * 0.75).toFixed(1)),
    calculatedMaxValue,
  ];

  const uniqueLabels = [];
  labels.forEach((label) => {
    if (
      uniqueLabels.length === 0 ||
      uniqueLabels[uniqueLabels.length - 1] !== label
    ) {
      uniqueLabels.push(label);
    }
  });

  return (
    <Card className="bg-white w-[100%] sm:w-[50%] border-[#e7e7e7]">
      <CardHeader>
        <CardTitle className=" text-start  text-[#464255]">{title}</CardTitle>
        <p className=" text-start text-[#464255]">
          {totalValue.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((dept, index) => {
            // Check if dept.value is a valid number before rendering
            const departmentValue =
              typeof dept.value === "number" ? dept.value : 0;

            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm text-[#737373] text-right">
                  {dept.name}
                </div>
                <div className="flex-1 relative">
                  <div className="h-6 bg-[#f3f2f7] rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${Math.min(
                          (departmentValue / calculatedMaxValue) * 100,
                          100
                        )}%`,
                        backgroundColor: dept.color || "#1aa367",
                      }}
                    />
                  </div>
                  <span className="absolute right-2 top-0 text-xs text-white font-medium leading-6">
                    {departmentValue.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-[#737373] sm:ml-23 mt-4">
          {uniqueLabels.map((label, index) => (
            <span key={index}>{formatLabel(label)}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DepartmentChart;
