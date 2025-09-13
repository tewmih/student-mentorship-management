import { useState } from "react";
import ApplicationItem from "./ApplicationItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { studentUnionAPI } from "../../api/client.js";
import Spinner from "../../ui/Spinner";

function ApplicationList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["studentData"],
    queryFn: studentUnionAPI.getApplications,
  });

  console.log(data);
  const { applications } = data || {};

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;

  if (!applications || applications.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-xl font-semibold text-gray-500">
        There are no applications yet.
      </div>
    );
  }

  // Handle status change after accept/reject
  const handleStatusChange = (applicationId, newStatus) => {
    // Invalidate and refetch the data
    queryClient.invalidateQueries({ queryKey: ["studentData"] });
  };

  // Filtering based on search term - now using applications instead of mentors
  const filteredData =
    applications?.filter(
      (item) =>
        String(item.Mentor?.Student?.full_name)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(item.id)?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = String(a[sortField]).toLowerCase();
    const bValue = String(b[sortField]).toLowerCase();

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-8 font-sans">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Mentor Applications</h1>
        <p className="text-sm text-green-500 font-semibold">
          Pending applications
        </p>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Sort by:</span>
          <select
            className="border rounded-md px-3 py-2"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="region">Region</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
      <div className="bg-background rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center px-6 py-3 bg-background text-foreground font-medium uppercase tracking-wider">
            <div
              className="w-1/6 cursor-pointer"
              onClick={() => handleSort("mentor_id")}
            >
              Mentor ID
            </div>
            <div
              className="w-1/4 cursor-pointer"
              onClick={() => handleSort("motivation")}
            >
              Motivation
            </div>
            <div
              className="w-1/4 cursor-pointer"
              onClick={() => handleSort("experience")}
            >
              Experience
            </div>
            <div
              className="w-1/6 text-right cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status
            </div>
            <div className="w-1/6 text-right">Action</div>
          </li>
          {currentItems.map((item) => (
            <ApplicationItem
              item={item}
              key={item.id}
              onStatusChange={handleStatusChange}
            />
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          Showing data {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border"
          >
            &lt;
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === number + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationList;
