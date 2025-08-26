import React from "react";
import { useForm } from "react-hook-form";
import { submitApplication } from "../services/SIMS";
import { useMutation } from "@tanstack/react-query";

function MentorApplicationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      alert("Application submitted ✅");
      reset();
    },
    onError: () => {
      alert("Failed to submit ❌");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 shadow rounded space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700">
        Mentor Application
      </h2>

      {/* Mentor ID */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Mentor ID
        </label>
        <input
          type="text"
          {...register("mentor_id", { required: "Mentor ID is required" })}
          className="w-full border px-3 py-2 focus:outline-none rounded mt-1"
        />
        {errors.mentor_id && (
          <p className="text-red-500 text-sm">{errors.mentor_id.message}</p>
        )}
      </div>

      {/* Motivation */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Motivation
        </label>
        <textarea
          {...register("motivation")}
          className="w-full border focus:outline-none px-3 py-2 rounded mt-1"
        />
      </div>

      {/* Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Experience
        </label>
        <textarea
          {...register("experience")}
          className="w-full border px-3 focus:outline-none py-2 rounded mt-1"
        />
      </div>

      {/* Region */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Region
        </label>
        <select
          {...register("region", { required: "Region is required" })}
          className="w-full border px-3 focus:outline-none py-2 rounded mt-1"
        >
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting || isLoading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

export default MentorApplicationForm;
