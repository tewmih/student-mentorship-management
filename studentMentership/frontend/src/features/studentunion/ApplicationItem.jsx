import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function ApplicationItem({ item, onStatusChange }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusClasses =
    item.status?.toLowerCase() === "active"
      ? "bg-green-400 text-green-800"
      : "bg-red-400 text-red-800";

  const handleAccept = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/student-union/mentor-applications/${item.id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Application approved successfully!");
      onStatusChange?.(item.id, "approved");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error(
        error.response?.data?.message || "Failed to approve application"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/student-union/mentor-applications/${item.id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Application rejected successfully!");
      onStatusChange?.(item.id, "rejected");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error(
        error.response?.data?.message || "Failed to reject application"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <NavLink to={`/application-detail/${item.id}`} className="w-full">
      <li className="flex w-full items-center px-6 py-4 hover:bg-background text-foreground border border-border transition-colors">
        <div className="w-1/6 text-foreground/60 truncate">
          {item.mentor_id}
        </div>
        <div
          className="w-1/4 text-foreground font-medium truncate"
          title={item.motivation}
        >
          {item.motivation ? `${item.motivation.substring(0, 20)}...` : "N/A"}
        </div>
        <div
          className="w-1/4 text-foreground font-medium truncate"
          title={item.experience}
        >
          {item.experience ? `${item.experience.substring(0, 20)}...` : "N/A"}
        </div>
        <div className="w-1/6 flex justify-end">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClasses}`}
          >
            {item.status || "Pending"}
          </span>
        </div>
        <div className="w-1/6 flex justify-end relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
            disabled={
              isProcessing ||
              item.status === "approved" ||
              item.status === "rejected"
            }
            className={`text-xs font-semibold px-3 py-1 rounded-md border transition-colors ${
              item.status === "approved" || item.status === "rejected"
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            }`}
          >
            {isProcessing ? "Processing..." : "Actions ▼"}
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full right-0 mb-1 w-20 bg-background border border-gray-200 rounded-md shadow-lg z-50">
              <button
                onClick={handleAccept}
                disabled={isProcessing || item.status === "approved"}
                className={`w-full text-left px-3 text-xs hover:bg-gray-100 transition-colors cursor-pointer  border-b border-border ${
                  item.status === "approved"
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-600 hover:bg-green-50"
                }`}
              >
                ✓ Accept
              </button>
              <button
                onClick={handleReject}
                disabled={isProcessing || item.status === "rejected"}
                className={`w-full text-left px-3 text-xs hover:bg-gray-100 transition-colors cursor-pointer ${
                  item.status === "rejected"
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                ✗ Reject
              </button>
            </div>
          )}
        </div>
      </li>
    </NavLink>
  );
}

export default ApplicationItem;
