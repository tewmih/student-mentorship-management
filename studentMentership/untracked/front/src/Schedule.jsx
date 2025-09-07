import React, { useMemo, useState } from "react";

export default function Schedule({ apiUrl = "http://localhost:4000/api/mentor/session/create" }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    scheduled_at: "",
    session_type: "group",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const canSubmit = useMemo(() => {
    return (
      form.title.trim() !== "" &&
      form.scheduled_at.trim() !== "" &&
      ["group", "individual"].includes(form.session_type)
    );
  }, [form]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function clearMessages() {
    setMessage(null);
    setErrors({});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    clearMessages();

    if (!canSubmit) {
      setMessage({ type: "error", text: "Please complete the required fields." });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        scheduled_at: new Date(form.scheduled_at).toISOString(),
        session_type: form.session_type,
      };

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data && data.errors) {
          setErrors(data.errors);
          setMessage({ type: "error", text: "Please fix the highlighted fields." });
        } else {
          setMessage({ type: "error", text: data?.message || "Failed to create session." });
        }
        return;
      }

      setMessage({ type: "success", text: "Mentorship session created successfully." });
      setForm({ title: "", description: "", scheduled_at: "", session_type: "group" });
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Network error." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Schedule a Mentorship Session</h1>

      {message && (
        <div
          className={`mb-4 rounded-2xl p-3 text-sm shadow-sm ${
            message.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={onChange}
            maxLength={255}
            className={`w-full rounded-2xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.title ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="e.g., Weekly check-in"
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
            className={`w-full rounded-2xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.description ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Optional notes..."
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="scheduled_at">
            Scheduled At<span className="text-red-500">*</span>
          </label>
          <input
            id="scheduled_at"
            name="scheduled_at"
            type="datetime-local"
            value={form.scheduled_at}
            onChange={onChange}
            className={`w-full rounded-2xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.scheduled_at ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.scheduled_at && <p className="mt-1 text-xs text-red-600">{errors.scheduled_at[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="session_type">
            Session Type<span className="text-red-500">*</span>
          </label>
          <select
            id="session_type"
            name="session_type"
            value={form.session_type}
            onChange={onChange}
            className={`w-full rounded-2xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 ${
              errors.session_type ? "border-red-400" : "border-gray-300"
            }`}
          >
            <option value="group">Group</option>
            <option value="individual">Individual</option>
          </select>
          {errors.session_type && <p className="mt-1 text-xs text-red-600">{errors.session_type[0]}</p>}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className={`rounded-2xl px-4 py-2 font-medium shadow-sm transition ${
              !canSubmit || submitting
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {submitting ? "Saving…" : "Create Session"}
          </button>

          <button
            type="button"
            onClick={() => setForm({ title: "", description: "", scheduled_at: "", session_type: "group" })}
            disabled={submitting}
            className="rounded-2xl px-4 py-2 font-medium shadow-sm border border-gray-300 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
