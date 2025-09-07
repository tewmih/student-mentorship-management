import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { submitApplication } from "../../services/SIMS";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MentorApplicationForm() {
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
      setMessage({
        type: "success",
        text: "Application submitted successfully! ✅",
      });
      reset();
    },
    onError: () => {
      setMessage({ type: "error", text: "Failed to submit application ❌" });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-2xl mx-auto px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-background text-foreground border border-border rounded-lg shadow-lg p-8 space-y-6"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Mentor Application
            </h2>
            <p className="text-foreground/60">
              Apply to become a mentor and help guide fellow students
            </p>
          </div>

          {message && (
            <div
              className={`px-4 py-3 rounded-lg text-sm font-medium text-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Mentor ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("mentor_id", {
                  required: "Mentor ID is required",
                })}
                className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your student ID"
              />
              {errors.mentor_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mentor_id.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Full name is required",
                })}
                className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                {...register("department", {
                  required: "Department is required",
                })}
                className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select your department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Biomedical Engineering">
                  Biomedical Engineering
                </option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Academic Year <span className="text-red-500">*</span>
              </label>
              <select
                {...register("year", {
                  required: "Academic year is required",
                })}
                className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select your year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
                <option value="6">6th Year</option>
              </select>
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.year.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Motivation <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("motivation", {
                required: "Motivation is required",
                minLength: {
                  value: 50,
                  message: "Motivation must be at least 50 characters",
                },
              })}
              rows={4}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Explain why you want to become a mentor and how you can help other students..."
            />
            {errors.motivation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.motivation.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("experience", {
                required: "Experience is required",
                minLength: {
                  value: 50,
                  message: "Experience must be at least 50 characters",
                },
              })}
              rows={4}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe your relevant experience, achievements, and skills that make you a good mentor..."
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Region <span className="text-red-500">*</span>
            </label>
            <select
              {...register("region", {
                required: "Region is required",
              })}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select your region</option>
              <option value="Tigray">Tigray</option>
              <option value="Afar">Afar</option>
              <option value="Amhara">Amhara</option>
              <option value="Oromia">Oromia</option>
              <option value="Somali">Somali</option>
              <option value="Benishangul-Gumuz">Benishangul-Gumuz</option>
              <option value="Gambela">Gambela</option>
              <option value="Harari">Harari</option>
              <option value="Sidama">Sidama</option>
              <option value="South West Ethiopia Peoples' Region">
                South West Ethiopia Peoples' Region
              </option>
              <option value="Central Ethiopia Region">
                Central Ethiopia Region
              </option>
              <option value="South Ethiopia Region">
                South Ethiopia Region
              </option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Dire Dawa">Dire Dawa</option>
            </select>
            {errors.region && (
              <p className="text-red-500 text-sm mt-1">
                {errors.region.message}
              </p>
            )}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
              Technical Skills Assessment
            </h3>
            <p className="text-sm text-foreground/60">
              Rate your technical skills from 1 (beginner) to 10 (expert)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Internet & Web Skills
                </label>
                <input
                  type="number"
                  {...register("technical_internet", {
                    min: { value: 1, message: "Minimum rating is 1" },
                    max: { value: 10, message: "Maximum rating is 10" },
                  })}
                  className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  min="1"
                  max="10"
                  placeholder="Rate 1-10"
                />
                {errors.technical_internet && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.technical_internet.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Social Media & Communication
                </label>
                <input
                  type="number"
                  {...register("technical_social_networks", {
                    min: { value: 1, message: "Minimum rating is 1" },
                    max: { value: 10, message: "Maximum rating is 10" },
                  })}
                  className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  min="1"
                  max="10"
                  placeholder="Rate 1-10"
                />
                {errors.technical_social_networks && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.technical_social_networks.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting || isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting Application...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MentorApplicationForm;
