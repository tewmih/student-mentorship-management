import DepartmentChart from "../../components/barGraph/Department-chart";
import StatsCard from "../../components/barGraph/stats-card";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentData } from "../../services/SIMS";
import { Users } from "lucide-react";
import PieChartComponent from "../../ui/chart/PieChartComponent";
import { StudentsTable } from "../../components/mentee/students-table";
import Spinner from "../../ui/Spinner";

// This function processes the raw student data to calculate department counts
// for only the users with the 'mentor' role.
const processMentorDataForChart = (students) => {
  // Filter students to include only those with the 'mentor' role.
  const mentors = students.filter((student) => student.role === "mentor");

  // Use a Map to store department counts for efficient lookups.
  const departmentCounts = new Map();
  // An array to store the final chart data.
  const chartData = [];
  // Hardcoded colors for each department to ensure consistency.
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

  // Iterate through the filtered mentors and count them by department.
  mentors.forEach((mentor) => {
    const department = mentor.department;
    departmentCounts.set(
      department,
      (departmentCounts.get(department) || 0) + 1
    );
  });

  // Convert the Map to the array format required by the chart.
  departmentCounts.forEach((count, department) => {
    chartData.push({
      name: department,
      value: count,
      color: departmentColors[department] || "#9e9e9e", // Fallback color
    });
  });

  return chartData;
};

// This function filters the raw student data to only include users with the 'mentor' role
// and formats the data for the StudentsTable component.
const filterAndFormatMentors = (students) => {
  const mentors = students.filter((student) => student.role === "mentor");

  // Format the mentor data to match the expected format for the StudentsTable component.
  // This assumes the StudentsTable expects 'name', 'id', 'department', 'email', and 'status'.
  return mentors.map((mentor) => ({
    name: mentor.full_name,
    id: mentor.student_id,
    department: mentor.department,
    email: mentor.email,
    status: mentor.status === "active" ? "Active" : "Inactive", // Map the status to the required string
  }));
};

// New function to process data for the pie chart
const processPieChartData = (students, role) => {
  const filteredStudents = students.filter((student) => student.role === role);
  const totalStudents = filteredStudents.length;
  const yearCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  filteredStudents.forEach((student) => {
    if (student.year in yearCounts) {
      yearCounts[student.year]++;
    }
  });

  return Object.keys(yearCounts).map((year) => {
    const value = yearCounts[year];
    const percentage = totalStudents > 0 ? (value / totalStudents) * 100 : 0;
    const label = `${year}${
      year === "1" ? "st" : year === "2" ? "nd" : year === "3" ? "rd" : "th"
    } year`;
    return {
      label,
      value,
      percentage: Math.round(percentage),
    };
  });
};

function Mentor() {
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

  // Filter and process the fetched student data for mentors.
  const mentorData = studentsData.filter(
    (student) => student.role === "mentor"
  );
  const processedChartData = processMentorDataForChart(studentsData);
  const formattedMentors = filterAndFormatMentors(studentsData);
  const totalMentors = mentorData.length;
  const pieChartData = processPieChartData(studentsData, "mentor");

  return (
    <div className="flex flex-col sm:flex-row overflow-y-scroll h-screen w-[100%] bg-background text-foreground border border-border rounded-lg">
      <div className=" rounded-lg px-5 w-full">
        <div className="min-h-screen">
          <div className="flex flex-row justify-between h-20 bg-background text-foreground border border-border mb-5 w-auto">
            <StatsCard
              title="Mentors"
              value={totalMentors}
              subtitle="2025"
              icon={Users}
            />
            <StatsCard
              title="Active Mentors"
              value={mentorData.filter((m) => m.status === "active").length}
              subtitle="2025"
              icon={Users}
            />
            <StatsCard
              title="Inactive Mentors"
              value={mentorData.filter((m) => m.status === "inactive").length}
              subtitle="2025"
              icon={Users}
            />
          </div>
            <div className="flex flex-col gap-4 mb-5 bg-background text-foreground border border-border sm:flex-row justify-center items-center">
            <DepartmentChart
              data={processedChartData}
              title="AASTU Mentors by Department"
              totalValue={totalMentors}
              maxValue={10}
            />
            <div>
              <PieChartComponent data={pieChartData} />
            </div>
          </div>
        </div>
        <StudentsTable
          title="AASTU Mentors List"
          subtitle="Active mentors"
          students={formattedMentors}
          totalEntries={totalMentors}
          currentPage={1}
          totalPages={Math.ceil(totalMentors / 10)}
          onSearch={  (term) => console.log("Search:", term)}
          onSort={(field) => console.log("Sort by:", field)}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  );
}

export default Mentor;
