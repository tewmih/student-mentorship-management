import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function ApplicationItem({ item, onStatusChange }) {
  const [isProcessing, setIsProcessing] = useState(false);

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
    <NavLink to={`/applicationlist/${item.id}`} className="w-full">
      <li className="flex w-full items-center px-6 py-4 hover:bg-background text-foreground border border-border transition-colors">
        <div className="w-1/6 text-foreground/60">{item.id}</div>
        <div className="w-1/6 text-foreground font-medium">
          {item.full_name}
        </div>
        <div className="w-1/6 flex justify-end">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClasses}`}
          >
            {item.status || "Pending"}
          </span>
        </div>
        <div className="w-1/6 flex justify-end">
          <button
            onClick={handleAccept}
            disabled={isProcessing || item.status === "approved"}
            className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${
              item.status === "approved"
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-300 hover:bg-green-400 cursor-pointer"
            }`}
          >
            {isProcessing ? "Processing..." : "Accept"}
          </button>
        </div>
        <div className="w-1/6 flex justify-end">
          <button
            onClick={handleReject}
            disabled={isProcessing || item.status === "rejected"}
            className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${
              item.status === "rejected"
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 cursor-pointer"
            }`}
          >
            {isProcessing ? "Processing..." : "Reject"}
          </button>
        </div>
      </li>
    </NavLink>
  );
}

export default ApplicationItem;
