import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { submitApplication } from "../../services/SIMS";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MentorApplicationForm() {
  // State for success/error messages
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      setMessage({ type: "success", text: "Application submitted ✅" });
      reset();
    },
    onError: () => {
      setMessage({ type: "error", text: "Failed to submit ❌" });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Mentor Application
      </h2>

      {/* Conditional message display */}
      {message && (
        <div
          className={`px-4 py-2 rounded-md text-sm text-center font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mentor ID (REQUIRED) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Mentor ID
          </label>
          <input
            type="text"
            {...register("mentor_id", { required: "Mentor ID is required" })}
            className="w-full border px-3 py-2 focus:outline-none rounded-md mt-1"
          />
          {errors.mentor_id && (
            <p className="text-red-500 text-sm">{errors.mentor_id.message}</p>
          )}
        </div>

        {/* Name (REQUIRED) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border px-3 py-2 focus:outline-none rounded-md mt-1"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Age (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Age</label>
          <input
            type="number"
            {...register("age")}
            className="w-full border px-3 py-2 focus:outline-none rounded-md mt-1"
          />
        </div>

        {/* Location (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Location
          </label>
          <input
            type="text"
            {...register("location")}
            className="w-full border px-3 py-2 focus:outline-none rounded-md mt-1"
          />
        </div>
      </div>

      {/* Motivation (REQUIRED) */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Motivation
        </label>
        <textarea
          {...register("motivation", { required: "Motivation is required" })}
          className="w-full border focus:outline-none px-3 py-2 rounded-md mt-1"
        />
        {errors.motivation && (
          <p className="text-red-500 text-sm">{errors.motivation.message}</p>
        )}
      </div>

      {/* Goals (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Goals</label>
        <textarea
          {...register("goals")}
          className="w-full border focus:outline-none px-3 py-2 rounded-md mt-1"
        />
      </div>

      {/* Experience (REQUIRED) */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Experience
        </label>
        <textarea
          {...register("experience", { required: "Experience is required" })}
          className="w-full border px-3 focus:outline-none py-2 rounded-md mt-1"
        />
        {errors.experience && (
          <p className="text-red-500 text-sm">{errors.experience.message}</p>
        )}
      </div>

      {/* Region (REQUIRED) */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Region
        </label>
        <select
          {...register("region", { required: "Region is required" })}
          className="w-full border px-3 focus:outline-none py-2 rounded-md mt-1"
        >
          <option value="">Select a region</option>
          <option value="Tigray">Tigray</option>
          <option value="Amhara">Amhara</option>
          <option value="Oromia">Oromia</option>
          <option value="SNNP">SNNP</option>
          <option value="Afar">Afar</option>
          <option value="Somali">Somali</option>
        </select>
        {errors.region && (
          <p className="text-red-500 text-sm">{errors.region.message}</p>
        )}
      </div>

      {/* Personality Traits (Optional) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Personality</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Introvert vs Extrovert (1-100)
            </label>
            <input
              type="number"
              {...register("personality_introvert")}
              className="w-full border px-3 py-2 focus:outline-none rounded-md mt-1"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Technical Skills (Optional) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Technical Skills (1-10)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Internet Skill
            </label>
            <input
              type="number"
              {...register("technical_internet")}
              className="w-full border px-3 py-2 focus:outline-none rounded-md mt-1"
              min="1"
              max="10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Social Networks Skill
            </label>
            <input
              type="number"
              {...register("technical_social_networks")}
              className="w-full border px-3 py-2 focus:outline-none rounded-md mt-1"
              min="1"
              max="10"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting || isLoading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
export default MentorApplicationForm;
