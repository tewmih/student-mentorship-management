import DepartmentChart from "../../components/barGraph/Department-chart";
import StatsCard from "../../components/barGraph/stats-card";
import { useQuery } from "@tanstack/react-query";
import { fetchMentees } from "../../services/SIMS";
import { Users } from "lucide-react";
import PieChartComponent from "../../ui/chart/PieChartComponent";
import Spinner from "../../ui/Spinner";

const data1 = [
  { label: "1st year", value: 7, percentage: 75 },
  { label: "2nd year", value: 4, percentage: 42 },
  { label: "3rd year", value: 9, percentage: 91 },
  { label: "4th year", value: 2, percentage: 28 },
  { label: "5th year", value: 6, percentage: 63 },
];

function MenteeAnalysis() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["studentData"],
    queryFn: fetchMentees,
  });
  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;
  return (
    <div className="flex flex-row  bg-gray-50">
      <div className=" rounded-lg overflow-y-scroll h-screen px-5 w-full">
        <div className="flex flex-row justify-between h-20 bg-white mb-5  w-auto">
          <StatsCard
            title="Students"
            value={5423}
            subtitle="2025"
            icon={Users}
          />
          <StatsCard
            title="Students"
            value={5423}
            subtitle="2025"
            icon={Users}
          />
          <StatsCard
            title="Students"
            value={5423}
            subtitle="2025"
            icon={Users}
          />
        </div>
        <div className="flex flex-col gap-4 mb-5 bg-gray-50 sm:flex-row justify-center items-center">
          <DepartmentChart
            data={data}
            title="AASTU Mentee"
            totalValue={207388}
            maxValue={80000}
          />
          <div>
            <PieChartComponent data={data1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeAnalysis;
