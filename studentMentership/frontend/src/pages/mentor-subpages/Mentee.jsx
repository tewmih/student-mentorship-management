import DepartmentChart from "../../components/barGraph/Department-chart";
import StatsCard from "../../components/barGraph/stats-card";
import { useQuery } from "@tanstack/react-query";
import { fetchMentees } from "../../api/client.js";
import { Users } from "lucide-react";
import PieChartComponent from "../../ui/chart/PieChartComponent";
import { StudentsTable } from "../../components/mentee/students-table";
import Spinner from "../../ui/Spinner";

// This function processes the raw student data to calculate department counts.
const processMenteeDataForChart = (mentees) => {
  console.log("mentees: ", mentees);
  const departmentCounts = new Map();
  const chartData = [];
  const departmentColors = {
    "Computer Science": "#42a5f5",
    "Electrical Engineering": "#66bb6a",
    Law: "#ef5350",
    "IT Administration": "#ab47bc",
    "Civil Engineering": "#ffa726",
    Medicine: "#26c6da",
    "Political Science": "#7e57c2",
    Economics: "#ff7043",
    Architecture: "#8d6e63",
    "Biomedical Engineering": "#bdbdbd",
  };

  mentees.forEach((mentee) => {
    const department = mentee.department;
    if (department) {
      // Added a check to ensure department exists
      departmentCounts.set(
        department,
        (departmentCounts.get(department) || 0) + 1
      );
    }
  });

  departmentCounts.forEach((count, department) => {
    chartData.push({
      name: department,
      value: count,
      color: departmentColors[department] || "#9e9e9e",
    });
  });

  return chartData;
};

// This function filters and formats mentee data.
const filterAndFormatMentees = (mentees) => {
  return mentees.map((mentee) => ({
    name: mentee.full_name,
    id: mentee.student_id,
    department: mentee.department,
    email: mentee.email,
    status: mentee.status === "active" ? "Active" : "Inactive",
  }));
};

// This function processes data for the pie chart.
const processPieChartData = (mentees) => {
  const totalStudents = mentees.length;

  if (totalStudents === 0) {
    return [];
  }

  const yearCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  mentees.forEach((mentee) => {
    // Corrected logic: Ensure mentee.year is a valid key before incrementing
    const year = parseInt(mentee.year);
    if (!isNaN(year) && year in yearCounts) {
      yearCounts[year]++;
    }
  });

  let rawData = Object.keys(yearCounts).map((year) => {
    const value = yearCounts[year];
    const rawPercentage = (value / totalStudents) * 100;
    const label = `${year}${
      year === "1" ? "st" : year === "2" ? "nd" : year === "3" ? "rd" : "th"
    } year`;
    return {
      label,
      value,
      rawPercentage,
      percentage: Math.floor(rawPercentage),
    };
  });

  const zeroValueData = rawData.filter((item) => item.value === 0);
  const nonZeroValueData = rawData.filter((item) => item.value > 0);

  nonZeroValueData.sort((a, b) => b.rawPercentage - a.rawPercentage);

  let roundedSum = nonZeroValueData.reduce(
    (sum, item) => sum + item.percentage,
    0
  );
  let remainder = 100 - roundedSum;

  for (let i = 0; i < remainder; i++) {
    if (nonZeroValueData[i]) {
      nonZeroValueData[i].percentage += 1;
    }
  }

  const finalData = nonZeroValueData.concat(
    zeroValueData.map((item) => ({ ...item, percentage: 0 }))
  );

  finalData.sort((a, b) => parseInt(a.label) - parseInt(b.label));

  return finalData;
};

function Mentee() {
  const {
    data: studentsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentData"],
    queryFn: fetchMentees,
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;

  // Add safety check for mentees
  const mentees = studentsData?.mentees || [];
  console.log(mentees);

  // Early return if no mentees data
  if (!mentees || mentees.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-foreground/60">No mentees found</div>
      </div>
    );
  }

  const processedChartData = processMenteeDataForChart(mentees);
  const formattedMentees = filterAndFormatMentees(mentees);
  const totalMentees = mentees.length;
  const pieChartData = processPieChartData(mentees);

  return (
    <div className="flex flex-col sm:flex-row overflow-y-scroll h-screen w-[100%] bg-background text-foreground border border-border rounded-lg">
      <div className=" rounded-lg px-5 w-full">
        <div className="min-h-screen">
          <div className="flex flex-row justify-between h-20 bg-background text-foreground border border-border mb-5 w-auto">
            <StatsCard
              title="Mentees"
              value={totalMentees}
              subtitle="2025"
              icon={Users}
            />
            <StatsCard
              title="Active Mentees"
              value={mentees.filter((m) => m.status === "active").length}
              subtitle="2025"
              icon={Users}
            />
            <StatsCard
              title="Inactive Mentees"
              value={mentees.filter((m) => m.status === "inactive").length}
              subtitle="2025"
              icon={Users}
            />
          </div>
          <div className="flex flex-col gap-4 mb-5 bg-gray-50 sm:flex-row justify-center items-center">
            <DepartmentChart
              data={processedChartData}
              title="AASTU Mentees by Department"
              totalValue={totalMentees}
              maxValue={10}
            />
            <div>
              <PieChartComponent data={pieChartData} />
            </div>
          </div>
        </div>
        <StudentsTable
          title="AASTU Mentees List"
          subtitle="Active mentees"
          students={formattedMentees}
          totalEntries={totalMentees}
          currentPage={1}
          totalPages={Math.ceil(totalMentees / 10)}
          onSearch={(term) => console.log("Search:", term)}
          onSort={(field) => console.log("Sort by:", field)}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  );
}

export default Mentee;
