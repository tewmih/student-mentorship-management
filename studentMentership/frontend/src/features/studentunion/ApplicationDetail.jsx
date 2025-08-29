import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"; // Import useParams
import { fetchApplicationDetails } from "../../services/SIMS";
import Spinner from "../../ui/Spinner";

function ApplicationDetail() {
  // 1. Get the ID from the URL
  const { id } = useParams();

  // 2. Fetch all applications
  const { data, isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplicationDetails,
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No application details found.</p>;
  }

  // 3. Find the specific application by matching the ID
  const application = data.find((app) => app.id === Number(id));

  // 4. Handle no-match scenario
  if (!application) {
    return <p>Applicant with ID {id} not found.</p>;
  }

  const {
    name,
    age,
    location,
    motivation,
    goals,
    experience,
    region,
    personality_introvert,
    technical_internet,
    technical_social_networks,
    status,
  } = application;

  const ProgressBar = ({ value, minLabel, maxLabel }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-foreground/60 mb-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      <div className="relative h-2 bg-foreground/20 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-purple-600 rounded-full"
          style={{ width: `${value}%`, left: `${(100 - value) / 2}%` }}
        />
      </div>
    </div>
  );

  const SkillDots = ({ label, score }) => (
    <div className="flex items-center mb-2">
      <span className="w-1/3 text-foreground/60">{label}</span>
      <div className="flex-1 flex space-x-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < score ? "bg-purple-600" : "bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8 pt-30 bg-background text-foreground border border-border max-w-7xl mx-auto rounded-lg shadow-xl font-sans">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Profile Header & Details */}
        <div className="col-span-1">
          <div className="text-center md:text-left mb-6">
            <div className="relative w-36 h-36 rounded-full mx-auto md:mx-0 overflow-hidden mb-4">
              <img src="" alt={name} className="object-cover w-full h-full" />
            </div>
            <h2 className="text-3xl font-semibold text-foreground/60">{name}</h2>
            <p className="text-foreground/60 text-sm">Age: {age}</p>
            <p className="text-foreground/60 text-sm">
              Location: {location}, {region}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Middle Column: Motivation, Goals, and Experience */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          {/* Motivation */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Motivation</h3>
            <p className="text-foreground/60 mb-6">{motivation}</p>
          </div>

          {/* Goals */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Goals</h3>
            <p className="text-foreground/60 mb-6">{goals}</p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Experience</h3>
            <p className="text-foreground/60 mb-6">{experience}</p>
          </div>
        </div>

        {/* Right Column: Personality and Technical Skills */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          {/* Personality */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Personality</h3>
            <ProgressBar
              value={Number(personality_introvert)}
              minLabel="Introvert"
              maxLabel="Extrovert"
            />
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Technical Skills</h3>
            <SkillDots label="Internet" score={Number(technical_internet)} />
            <SkillDots
              label="Social Networks"
              score={Number(technical_social_networks)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;
