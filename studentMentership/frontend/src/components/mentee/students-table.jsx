"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card.jsx";
import { Button } from "../../ui/button.jsx";
import { Input } from "../../ui/input.jsx";
import { Badge } from "../../ui/badge.jsx";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import DepartmentChart from "../../components/barGraph/Department-chart";
import StatsCard from "../../components/barGraph/stats-card";
import { Users } from "lucide-react";
import PieChartComponent from "../../ui/chart/PieChartComponent";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentData } from "../../api/client.js";
import Spinner from "../../ui/Spinner";

export function StudentsTable({ title, subtitle, students }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const displayedStudents = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    const filtered = !normalizedQuery
      ? students
      : students.filter(
          (s) =>
            String(s.name || "")
              .toLowerCase()
              .includes(normalizedQuery) ||
            String(s.id || "")
              .toLowerCase()
              .includes(normalizedQuery) ||
            String(s.department || "")
              .toLowerCase()
              .includes(normalizedQuery)
        );

    if (!sortKey) {
      return filtered;
    }

    const sorted = [...filtered];

    sorted.sort((a, b) => {
      const aVal = String(a[sortKey] ?? "").toLowerCase();
      const bVal = String(b[sortKey] ?? "").toLowerCase();

      if (aVal < bVal) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [students, searchTerm, sortKey, sortDirection]);

  const totalPages = Math.ceil(displayedStudents.length / itemsPerPage);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return displayedStudents.slice(startIndex, endIndex);
  }, [displayedStudents, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Card className="bg-background text-foreground border border-border rounded-xl ">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-[#464255]">
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-sm text-[#00b087] mt-1">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#737373]" />
              <Input
                placeholder="Search by name or ID"
                className="pl-10 w-64 border-[#e7e7e7] rounded-lg shadow-sm outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <span>Sort by</span>
              <div className="relative">
                <select
                  className={`${
                    sortKey ? "border-[#2d9cdb]" : "border-[#e7e7e7]"
                  } appearance-none pr-8 rounded-lg px-3 py-2 text-[#464255] outline-none focus:outline-none focus:ring-2 focus:ring-[#2d9cdb] transition-all duration-200`}
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="name">Name</option>
                  <option value="id">ID</option>
                  <option value="department">Department</option>
                </select>
                <ChevronDown
                  className={`w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${
                    sortKey ? "text-[#2d9cdb]" : "text-[#737373]"
                  }`}
                />
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className={`p-1 rounded-lg border border-[#e7e7e7] text-[#464255] outline-none focus:outline-none ${
                    sortDirection === "asc" ? "bg-[#f3f2f7]" : "bg-white"
                  } transition-all duration-200 hover:bg-[#f3f2f7]`}
                  aria-label="Sort ascending"
                  onClick={() => setSortDirection("asc")}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className={`p-1 rounded-lg border border-[#e7e7e7] text-[#464255] outline-none focus:outline-none ${
                    sortDirection === "desc" ? "bg-[#f3f2f7]" : "bg-white"
                  } transition-all duration-200 hover:bg-[#f3f2f7]`}
                  aria-label="Sort descending"
                  onClick={() => setSortDirection("desc")}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-foreground/20">
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                  Student name
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                  Id
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                  Department
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                  Country
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student, index) => (
                <tr key={index} className="border-b border-[#f3f2f7]">
                  <td className="py-4 px-4 text-sm text-[#464255] font-medium">
                    {student.name}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#737373]">
                    {student.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#737373]">
                    {student.department}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#737373]">
                    {student.email}
                  </td>
                  <td className="py-4 px-4 text-sm text-[#737373]">
                    {student.country}
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      className={`${
                        student.status === "Active"
                          ? "bg-[#00b087]/10 text-[#00b087] hover:bg-[#00b087]/20"
                          : "bg-[#ffc5c5] text-[#df0404] hover:bg-[#ffc5c5]/80"
                      }`}
                    >
                      {student.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedStudents.length === 0 && (
            <div className="py-10 text-center text-[#737373]">
              No students found. Try a different search term.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
          <p className="text-sm text-[#737373]">
            Showing data{" "}
            {displayedStudents.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, displayedStudents.length)}{" "}
            of {displayedStudents.length.toLocaleString()} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#737373] hover:bg-[#f3f2f7] transition-colors"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              ‹
            </Button>
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              const isCurrentPage = page === currentPage;

              const shouldRender =
                totalPages <= 5 ||
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);
              if (!shouldRender) return null;

              const isEllipsis =
                totalPages > 5 &&
                (page === currentPage - 2 || page === currentPage + 2);
              if (isEllipsis) {
                return (
                  <span key={page} className="text-[#737373] px-2">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={page}
                  variant="ghost"
                  size="sm"
                  className={
                    isCurrentPage
                      ? "bg-[#2d9cdb] text-foreground hover:bg-[#2d9cdb]/80 shadow-md"
                      : "text-foreground/60 hover:bg-[#f3f2f7] transition-colors"
                  }
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/60 hover:bg-[#f3f2f7] transition-colors"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              ›
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const processStudentDataForChart = (students) => {
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

  students.forEach((student) => {
    const department = student.department;
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

const filterAndFormatStudents = (students) => {
  return students.map((student) => ({
    name: student.full_name,
    id: student.student_id,
    department: student.department,
    email: student.email,
    status: student.status === "active" ? "Active" : "Inactive",
    country: student.country,
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

  const processedChartData = processStudentDataForChart(studentsData);
  const dynamicPieChartData = processPieChartData(studentsData);
  const totalStudents = studentsData.length;

  const formattedStudents = filterAndFormatStudents(studentsData);

  const maxDepartmentCount = Math.max(
    ...processedChartData.map((d) => d.value)
  );
  const dynamicMaxValue = maxDepartmentCount > 0 ? maxDepartmentCount + 1 : 10;

  return (
    <div className="flex flex-col sm:flex-row overflow-y-scroll h-screen w-[100%] bg-gray-50">
      <div className=" rounded-lg px-5 w-full">
        <div className="min-h-screen">
          <div className="flex flex-row justify-between h-20 bg-background text-foreground border border-border mb-5 w-auto">
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
        />
      </div>
    </div>
  );
}

export default AASTUStudent;
