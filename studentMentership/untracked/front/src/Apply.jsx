import React, { useState } from "react";
import axios from "axios";

function Apply() {
  const [motivation, setMotivation] = useState("");
  const [experience, setExperience] = useState("");
  const [region, setRegion] = useState("Tigray");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send only the fields backend expects; mentor_id comes from JWT
      await axios.post(
        "http://localhost:4000/api/mentor/application/",
        {
          motivation,
          experience,
          region,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitted(true);
      setMotivation("");
      setExperience("");
      setRegion("Tigray");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(error.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Mentor Application</h1>

      {submitted && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Thank you for applying! We will review your application soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
            Motivation
          </label>
          <textarea
            id="motivation"
            rows="4"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="Why do you want to be a mentor?"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <textarea
            id="experience"
            rows="4"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Describe your experience"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Tigray">Tigray</option>
            <option value="Amhara">Amhara</option>
            <option value="Oromia">Oromia</option>
            <option value="SNNP">SNNP</option>
            <option value="Afar">Afar</option>
            <option value="Somali">Somali</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded font-semibold text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          }`}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default Apply;
