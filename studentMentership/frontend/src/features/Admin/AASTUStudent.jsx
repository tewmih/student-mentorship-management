import DepartmentChart from "../../components/barGraph/Department-chart";
import StatsCard from "../../components/barGraph/stats-card";
import { Users } from "lucide-react";
import PieChartComponent from "../../ui/chart/PieChartComponent";
import { StudentsTable } from "../../components/mentee/students-table";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentData } from "../../services/SIMS";
import Spinner from "../../ui/Spinner";

// This function processes the raw student data to calculate department counts
const processStudentDataForChart = (students) => {
  // Use a Map to store department counts for efficient lookups
  const departmentCounts = new Map();
  // An array to store the final chart data
  const chartData = [];
  // Hardcoded colors for each department to ensure consistency
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

  // Iterate through the students and count them by department
  students.forEach((student) => {
    const department = student.department;
    if (department) {
      departmentCounts.set(
        department,
        (departmentCounts.get(department) || 0) + 1
      );
    }
  });

  // Convert the Map to the array format required by the chart
  departmentCounts.forEach((count, department) => {
    chartData.push({
      name: department,
      value: count,
      color: departmentColors[department] || "#9e9e9e", // Fallback color
    });
  });

  return chartData;
};

// This function processes data for the pie chart, ensuring percentages total 100%
const processPieChartData = (students) => {
  const totalStudents = students.length;

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

  students.forEach((student) => {
    const year = parseInt(student.year);
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

// This function filters and formats student data for the table.
const filterAndFormatStudents = (students) => {
  return students.map((student) => ({
    name: student.full_name,
    id: student.student_id,
    department: student.department,
    email: student.email,
    status: student.status === "active" ? "Active" : "Inactive",
  }));
};

function AASTUStudent() {
  const {
    data: studentsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studentData"],
    queryFn: fetchStudentData,
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;

  // Process the fetched student data for the chart
  const processedChartData = processStudentDataForChart(studentsData);
  const dynamicPieChartData = processPieChartData(studentsData);
  const totalStudents = studentsData.length;

  // Format the student data for the table
  const formattedStudents = filterAndFormatStudents(studentsData);

  // Calculate a suitable maxValue for the chart based on the data
  const maxDepartmentCount = Math.max(
    ...processedChartData.map((d) => d.value)
  );
  const dynamicMaxValue = maxDepartmentCount > 0 ? maxDepartmentCount + 1 : 10;

  return (
    <div className="flex flex-col sm:flex-row overflow-y-scroll h-screen w-[100%] bg-gray-50">
      <div className=" rounded-lg px-5 w-full">
        <div className="min-h-screen">
          <div className="flex flex-row justify-between h-20 bg-white mb-5 w-auto">
            <StatsCard
              title="Total Students"
              value={totalStudents}
              subtitle="2025"
              icon={Users}
            />
            <StatsCard
              title="Active Students"
              value={studentsData.filter((s) => s.status === "active").length}
              subtitle="2025"
              icon={Users}
            />
            <StatsCard
              title="Inactive Students"
              value={studentsData.filter((s) => s.status === "inactive").length}
              subtitle="2025"
              icon={Users}
            />
          </div>
          <div className="flex flex-col gap-4 mb-5 bg-gray-50 sm:flex-row justify-center items-center">
            <DepartmentChart
              data={processedChartData}
              title="AASTU Students by Department"
              totalValue={totalStudents}
              maxValue={dynamicMaxValue}
            />
            <div>
              <PieChartComponent data={dynamicPieChartData} />
            </div>
          </div>
        </div>
        <StudentsTable
          title="AASTU Students List"
          subtitle="Active students"
          students={formattedStudents}
          totalEntries={totalStudents}
          currentPage={1}
          totalPages={Math.ceil(totalStudents / 10)}
          onSearch={(term) => console.log("Search:", term)}
          onSort={(field) => console.log("Sort by:", field)}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  );
}

export default AASTUStudent;
