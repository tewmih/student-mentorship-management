import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function Profile() {
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [formValues, setFormValues] = useState({});
  const [previewCoverPhoto, setPreviewCoverPhoto] = useState(null);
  const [previewProfilePhoto, setPreviewProfilePhoto] = useState(null);
  const [isCoverPhotoChanged, setIsCoverPhotoChanged] = useState(false);
  const [isProfilePhotoChanged, setIsProfilePhotoChanged] = useState(false);

  // Refs for hidden file inputs
  const coverPhotoInputRef = useRef(null);
  const profilePhotoInputRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProfileData(res.data);
        setFormValues(res.data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setIsEditing((prev) => ({ ...prev, [name]: true }));
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prev) => ({ ...prev, cover_photo: file }));
      setPreviewCoverPhoto(URL.createObjectURL(file));
      setIsCoverPhotoChanged(true);
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prev) => ({ ...prev, profile_photo: file }));
      setPreviewProfilePhoto(URL.createObjectURL(file));
      setIsProfilePhotoChanged(true);
    }
  };

  const handleRemoveCoverPhoto = () => {
    setPreviewCoverPhoto(null);
    setFormValues((prev) => ({ ...prev, cover_photo: null }));
    setIsCoverPhotoChanged(true);
  };

  const handleRemoveProfilePhoto = () => {
    setPreviewProfilePhoto(null);
    setFormValues((prev) => ({ ...prev, profile_photo: null }));
    setIsProfilePhotoChanged(true);
  };

  const handleSave = () => {
    const formData = new FormData();

    // Append non-file fields
    Object.entries(formValues).forEach(([key, value]) => {
      if (key !== "profile_photo" && key !== "cover_photo" && value !== undefined) {
        formData.append(key, value);
      }
    });

    // Append files only if changed
    if (isProfilePhotoChanged) {
      formData.append("profile_photo", formValues.profile_photo || "");
    }
    if (isCoverPhotoChanged) {
      formData.append("cover_photo", formValues.cover_photo || "");
    }

    axios
      .put(`http://localhost:4000/api/profile/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProfileData(res.data);
        setIsEditing({});
        setPreviewCoverPhoto(null);
        setPreviewProfilePhoto(null);
        setIsCoverPhotoChanged(false);
        setIsProfilePhotoChanged(false);
      })
      .catch((err) => {
        alert(
          err.response?.data?.message || err.message || "Failed to update profile"
        );
      });
  };

  const renderField = (label, field, isTextArea = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      {isEditing[field] ? (
        isTextArea ? (
          <textarea
            name={field}
            value={formValues[field] || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        ) : (
          <input
            name={field}
            value={formValues[field] || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        )
      ) : (
        <div className="flex items-center justify-between border p-2 rounded bg-gray-50">
          <span>{profileData[field] || "Not provided"}</span>
          <FaEdit
            className="cursor-pointer text-gray-500 hover:text-blue-500"
            onClick={() => toggleEdit(field)}
          />
        </div>
      )}
    </div>
  );

  const isAnyFieldEditing =
    Object.values(isEditing).some((v) => v === true) ||
    isCoverPhotoChanged ||
    isProfilePhotoChanged;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Cover photo */}
      <div className="relative w-full h-64 mb-6">
        <img
          src={
            previewCoverPhoto
              ? previewCoverPhoto
              : profileData.cover_photo
              ? `http://localhost:4000/public/uploads/${profileData.cover_photo}`
              : "/default-cover.jpg"
          }
          alt="Cover"
          className="w-full h-full object-cover rounded-lg shadow"
        />
        <input
          type="file"
          accept="image/*"
          ref={coverPhotoInputRef}
          onChange={handleCoverPhotoChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => coverPhotoInputRef.current?.click()}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          aria-label="Change cover photo"
        >
          <FaEdit className="text-gray-600" />
        </button>
        {previewCoverPhoto && (
          <button
            onClick={handleRemoveCoverPhoto}
            className="absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm"
          >
            Remove
          </button>
        )}
      </div>

      {/* Profile photo */}
      <div className="relative w-32 h-32 mx-auto -mt-20 mb-4">
        <img
          src={
            previewProfilePhoto
              ? previewProfilePhoto
              : profileData.profile_photo
              ? `http://localhost:4000/public/uploads/${profileData.profile_photo}`
              : "/default-profile.jpg"
          }
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-4 border-white shadow"
        />
        <input
          type="file"
          accept="image/*"
          ref={profilePhotoInputRef}
          onChange={handleProfilePhotoChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => profilePhotoInputRef.current?.click()}
          className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          aria-label="Change profile photo"
        >
          <FaEdit className="text-gray-600" />
        </button>
        {previewProfilePhoto && (
          <button
            onClick={handleRemoveProfilePhoto}
            className="absolute -bottom-8 right-0 bg-red-600 text-white px-2 py-1 rounded text-sm"
          >
            Remove
          </button>
        )}
      </div>

      {/* Fields */}
      {renderField("Full Name", "full_name")}
      {renderField("Email", "email")}
      {renderField("Year", "year")}
      {renderField("Department", "department")}
      {renderField("Bio", "bio", true)}
      {renderField("Experience", "experience", true)}
      {renderField("About", "about", true)}

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={!isAnyFieldEditing}
          className={`px-4 py-2 rounded text-white ${
            isAnyFieldEditing
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Profile;
