import StatsCard from "../../components/barGraph/stats-card";
import { Users } from "lucide-react";
import DonutChart from "../../ui/chart/DonutChart";
import LineChart from "../../ui/chart/LineChart";
import MenteeList from "../../components/My-mentee";
import { useState, useEffect } from "react";
import axios from "axios";

const MentorDashboard = () => {
  const [menteesData, setMenteesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch mentees data from backend
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:4000/api/mentor/mentees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("result: ",response.data.mentees);
        if (response.data.mentees) {
          // Transform the API response to match the expected format
          const transformedMentees = response.data.mentees.map((mentee) => ({
            id: mentee.id.toString(),
            name: mentee.full_name,
            avatar:
              mentee.profile_photo_url ||
              `https://ui-avatars.com/api/?name=${mentee.full_name}&background=random`,
            student_id: mentee.student_id,
            email: mentee.email,
            department: mentee.department,
            year: mentee.year,
            status: mentee.status,
            bio: mentee.bio,
            about: mentee.about,
          }));
          setMenteesData(transformedMentees);
        } else {
          setMenteesData([]);
        }
      } catch (err) {
        console.error("Error fetching mentees:", err);
        setError(err.response?.data?.message || "Failed to fetch mentees");
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  const progressData = [
    { label: "February", value: 72, date: "Feb 14th, 2020" },
    { label: "March", value: 18, date: "Mar 22nd, 2020" },
    { label: "April", value: 45, date: "Apr 8th, 2020" },
    { label: "May", value: 89, date: "May 15th, 2020" },
    { label: "June", value: 34, date: "Jun 3rd, 2020" },
    { label: "July", value: 67, date: "Jul 12th, 2020" },
    { label: "August", value: 23, date: "Aug 28th, 2020" },
    { label: "September", value: 56, date: "Sep 5th, 2020" },
    { label: "October", value: 99, date: "Oct 18th, 2020" },
    { label: "November", value: 78, date: "Nov 9th, 2020" },
    { label: "December", value: 41, date: "Dec 25th, 2020" },
  ];

  if (loading) {
    return (
      <div className="flex flex-row bg-background text-foreground">
        <div className="rounded-lg px-5 w-full">
          <div className="flex items-center justify-center h-64">
            <div className="text-foreground/60">Loading mentees...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-row bg-background text-foreground">
        <div className="rounded-lg px-5 w-full">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500 text-center">
              <div className="text-lg font-medium">Error</div>
              <div className="text-sm mt-2">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row bg-background text-foreground">
      <div className="rounded-lg px-5 w-full">
        <div className="flex flex-row justify-between h-20 bg-background text-foreground border border-border mb-5 w-auto">
          <StatsCard
            title="Total Mentees"
            value={menteesData.length}
            subtitle="Assigned"
            icon={Users}
          />
          <StatsCard
            title="Active Mentees"
            value={
              menteesData.filter((mentee) => mentee.status === "active").length
            }
            subtitle="Currently Active"
            icon={Users}
          />
          <StatsCard
            title="Departments"
            value={new Set(menteesData.map((mentee) => mentee.department)).size}
            subtitle="Different Fields"
            icon={Users}
          />
        </div>
        <div className="flex flex-col bg-background text-foreground border border-border sm:flex-row justify-center items-center">
          <DonutChart />
          <LineChart
            data={progressData}
            title="Your past Progress"
            tooltipLabel="progress"
          />
        </div>
      </div>
      <div>
        <MenteeList mentees={menteesData} />
      </div>
    </div>
  );
};

export default MentorDashboard;
