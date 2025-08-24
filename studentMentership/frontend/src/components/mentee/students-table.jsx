"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card.jsx";
import { Button } from "../../ui/button.jsx";
import { Input } from "../../ui/input.jsx";
import { Badge } from "../../ui/badge.jsx";
import { Search, ChevronDown } from "lucide-react";

export function StudentsTable({
  title,
  subtitle,
  students,
  totalEntries = students.length,
  currentPage = 1,
  totalPages = 1,
  onSearch,
  onSort,
  onPageChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <Card className="bg-white border-[#e7e7e7]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-[#464255]">
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-sm text-[#00b087] mt-1">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#737373]" />
              <Input
                placeholder="Search by name or ID"
                className="pl-10 w-64 border-[#e7e7e7]"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center gap-2 text-sm text-[#737373]">
              <span>Filter by</span>
              <select
                className="border-[#e7e7e7] rounded px-2 py-1 text-[#464255]"
                value={"filterValue"} // pass from parent StudentsTable state
                onChange={(e) => onFilter?.(e.target.value)}
              >
                <option value="">All</option>
                <option value="name">Name</option>
                <option value="id">ID</option>
              </select>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e7e7]">
                <th className="text-left py-3 text-sm font-medium text-[#737373]">
                  Student name
                </th>
                <th className="text-left py-3 text-sm font-medium text-[#737373]">
                  Id
                </th>
                <th className="text-left py-3 text-sm font-medium text-[#737373]">
                  department
                </th>
                <th className="text-left py-3 text-sm font-medium text-[#737373]">
                  Email
                </th>
                <th className="text-left py-3 text-sm font-medium text-[#737373]">
                  Country
                </th>
                <th className="text-left py-3 text-sm font-medium text-[#737373]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b border-[#f3f2f7]">
                  <td className="py-4 text-sm text-[#464255] font-medium">
                    {student.name}
                  </td>
                  <td className="py-4 text-sm text-[#737373]">{student.id}</td>
                  <td className="py-4 text-sm text-[#737373]">
                    {student.department}
                  </td>
                  <td className="py-4 text-sm text-[#737373]">
                    {student.email}
                  </td>
                  <td className="py-4 text-sm text-[#737373]">
                    {student.country}
                  </td>
                  <td className="py-4">
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
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-[#737373]">
            Showing data 1 to {students.length} of{" "}
            {totalEntries.toLocaleString()} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#737373]"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              ‹
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant="ghost"
                  size="sm"
                  className={
                    page === currentPage
                      ? "bg-[#2d9cdb] text-white hover:bg-[#2d9cdb]/80"
                      : "text-[#737373]"
                  }
                  onClick={() => onPageChange?.(page)}
                >
                  {page}
                </Button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span className="text-[#737373]">...</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#737373]"
                  onClick={() => onPageChange?.(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-[#737373]"
              onClick={() => onPageChange?.(currentPage + 1)}
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
