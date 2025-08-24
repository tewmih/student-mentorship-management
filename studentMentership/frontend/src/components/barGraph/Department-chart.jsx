import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card.jsx";

function DepartmentChart({ title, totalValue, data, maxValue }) {
  const calculatedMaxValue = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <Card className="bg-white w-[100%] border-[#e7e7e7]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#464255]">
          {title}
        </CardTitle>
        <p className="text-2xl font-bold text-[#464255]">
          {typeof totalValue === "number"
            ? totalValue.toLocaleString()
            : totalValue}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((dept, index) => (
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
                        (dept.value / calculatedMaxValue) * 100,
                        100
                      )}%`,
                      backgroundColor: dept.color || "#1aa367",
                    }}
                  />
                </div>
                <span className="absolute right-2 top-0 text-xs text-white font-medium leading-6">
                  {dept.value.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#737373] mt-4">
          <span>0</span>
          <span>{Math.round((calculatedMaxValue * 0.25) / 1000)}K</span>
          <span>{Math.round((calculatedMaxValue * 0.5) / 1000)}K</span>
          <span>{Math.round((calculatedMaxValue * 0.75) / 1000)}K</span>
          <span>{Math.round(calculatedMaxValue / 1000)}K</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default DepartmentChart;
