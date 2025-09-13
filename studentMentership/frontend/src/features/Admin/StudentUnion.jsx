import DepartmentChart from "../../components/barGraph/Department-chart";
import StatsCard from "../../components/barGraph/stats-card";
import { useQuery } from "@tanstack/react-query";
import { studentUnionAPI } from "../../api/client.js";
import { Users } from "lucide-react";
import PieChartComponent from "../../ui/chart/PieChartComponent";
import { StudentsTable } from "../../components/mentee/students-table";
import Spinner from "../../ui/Spinner";

// This function processes the raw student data to calculate department counts.
const processStudentUnionDataForChart = (studentUnionMembers) => {
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

  studentUnionMembers.forEach((member) => {
    const department = member.department;
    if (department) {
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

// This function filters and formats student union data.
const filterAndFormatStudentUnion = (studentUnionMembers) => {
  return studentUnionMembers.map((member) => ({
    name: member.full_name,
    id: member.student_id,
    department: member.department,
    email: member.email,
    status: member.status === "active" ? "Active" : "Inactive",
  }));
};

// This function processes data for the pie chart.
const processPieChartData = (studentUnionMembers) => {
  const totalStudents = studentUnionMembers.length;

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

  studentUnionMembers.forEach((member) => {
    const year = parseInt(member.year);
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

function StudentUnion() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["studentunion"],
    queryFn: studentUnionAPI.getStudents,
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;

  // Filter the fetched data to include only student union members
  const studentUnionData = data.filter(
    (student) => student.role === "student_union"
  );

  const processedChartData = processStudentUnionDataForChart(studentUnionData);
  const totalStudentUnion = studentUnionData.length;
  const pieChartData = processPieChartData(studentUnionData);
  const formattedStudentUnion = filterAndFormatStudentUnion(studentUnionData);

  return (
    <div className="flex flex-col sm:flex-row w-[100%] bg-gray-50">
      <div className=" rounded-lg overflow-y-scroll h-screen px-5 w-full">
        <div className="h-screen">
          <div className="flex flex-row justify-between h-20 bg-white mb-5  w-auto">
            <StatsCard
              title="Student Union Members"
              value={totalStudentUnion}
              subtitle="2025"
              icon={Users}
            />
            <StatsCard
              title="Active Members"
              value={
                studentUnionData.filter((s) => s.status === "active").length
              }
              subtitle="2025"
              icon={Users}
            />
            <StatsCard
              title="Inactive Members"
              value={
                studentUnionData.filter((s) => s.status === "inactive").length
              }
              subtitle="2025"
              icon={Users}
            />
          </div>
          <div className="flex flex-col gap-4 mb-5 bg-gray-50 sm:flex-row justify-center items-center">
            <DepartmentChart
              data={processedChartData}
              title="AASTU Student Union by Department"
              totalValue={totalStudentUnion}
            />
            <div>
              <PieChartComponent data={pieChartData} />
            </div>
          </div>
        </div>
        <StudentsTable
          title="AASTU Student Union List"
          subtitle="Active members"
          students={formattedStudentUnion}
          totalEntries={totalStudentUnion}
          currentPage={1}
          totalPages={Math.ceil(totalStudentUnion / 10)}
          onSearch={(term) => console.log("Search:", term)}
          onSort={(field) => console.log("Sort by:", field)}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  );
}

export default StudentUnion;
