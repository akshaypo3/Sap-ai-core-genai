"use client";

import React, { useEffect, useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import {
  fetchActiveFrameworks,
  insertFramework,
  updateFramework,
} from "@/lib/settings/frameworks/action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/table/data-table";

const supabase = createClient();

const Frameworks = () => {
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    isActive: false,
    needsAssessment: false,
    link: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    loadFrameworks();
  }, []);

  const loadFrameworks = async () => {
    setLoading(true);
    try {
      const frameworks = await fetchActiveFrameworks();
      setData(
        frameworks.map((framework) => ({
          id: framework.id,
          frameworkTitle: framework.title,
          frameworkDescription: framework.description,
          instancesStatus: framework.isActive ? "Active" : "Inactive",
          materialityAssessmentNeeded: framework.needsAssessment
            ? "Materiality Assessment needed"
            : "Not needed",
          link: framework.link,
        }))
      );
    } catch (err) {
      setError("Failed to load frameworks.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "isActive" || name === "needsAssessment"
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = {
      ...formData,
      link: uploadedImageUrl || formData.link,
    };

    if (isEditing) {
      await updateFramework(formData.id, newFormData);
    } else {
      await insertFramework(newFormData);
    }

    loadFrameworks();
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      isActive: false,
      needsAssessment: false,
      link: "",
    });
    setImageFile(null);
    setUploadedImageUrl("");
    setIsEditing(false);
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      title: item.frameworkTitle,
      description: item.frameworkDescription,
      isActive: item.instancesStatus === "Active" ? "true" : "false",
      needsAssessment:
        item.materialityAssessmentNeeded === "Materiality Assessment needed"
          ? "true"
          : "false",
      link: item.link,
    });
    setImageFile(null);
    setUploadedImageUrl(item.link);
    setIsEditing(true);
    setShowModal(true);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setShowModal(true);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    setUploading(true);
    try {
      const { data, error } = await supabase.storage
        .from("Framework_Upload")
        .upload(`Images/${file.name}`, file);
      if (error) throw error;

      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from("Framework_Upload")
        .getPublicUrl(`Images/${file.name}`);

      if (publicUrlError) throw publicUrlError;

      setUploadedImageUrl(publicUrlData.publicUrl);
      toast({
        variant: "success",
        title: "File Uploaded Successfully!",
        description: `${file.name} File Uploaded Successfully to Supabase`,
      });
      console.log("Public URL:", publicUrlData.publicUrl);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error uploading file:",
        description: error.message,
      });
    } finally {
      setUploading(false);
      setFile(null);
      router.refresh();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <h2 className="text-xl font-semibold text-gray-800">Frameworks</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={openModal}
          className="bg-black text-white py-2 px-4 rounded"
        >
          Add Framework
        </button>
      </div>
      <table className="min-w-full bg-white text-sm border-t border-b border-gray-200">
        <thead>
          <tr className="text-left text-gray-800 border-b">
            <th className="py-3 px-4 font-medium">Image</th>
            <th className="py-3 px-4 font-medium">Framework</th>
            <th className="py-3 px-4 font-medium">Description</th>
            <th className="py-3 px-4 font-medium">Instance Status</th>
            <th className="py-3 px-4 font-medium">
              Materiality Assessment needed
            </th>
            <th className="py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-all duration-200 ease-in-out border-b"
            >
              <td className="py-4 px-4">
                {item.link ? (
                  <img
                    src={item.link}
                    alt={item.frameworkTitle}
                    className="h-12 w-12 object-cover"
                  />
                ) : (
                  <div
                    style={{
                      background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                    }}
                    className="h-12 w-12"
                  ></div>
                )}
              </td>
              <td className="py-3 px-4 text-gray-800 font-medium">
                {item.frameworkTitle}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {item.frameworkDescription}
              </td>
              <td className="py-3 px-4 text-gray-800">
                {item.instancesStatus}
              </td>
              <td className="py-3 px-4 text-gray-800">
                {item.materialityAssessmentNeeded}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-black text-white py-1 px-2 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full sm:w-96 md:w-[600px] lg:w-[800px]">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Framework" : "Add Framework"}
            </h3>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-4"
                required
              />

              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-4"
                required
              />

              <label className="block mb-2">Status</label>
              <select
                name="isActive"
                value={formData.isActive}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-4"
                required
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>

              <label className="block mb-2">
                Materiality Assessment Needed
              </label>
              <select
                name="needsAssessment"
                value={formData.needsAssessment}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-4"
                required
              >
                <option value="true">Needed</option>
                <option value="false">Not Needed</option>
              </select>

              <label className="block mb-2">Upload Framework Image</label>
              <Button
                type="button"
                variant="outline"
                className="mb-2"
                onClick={handleSelectFile}
              >
                {imageFile ? "Change Image" : "Select Image"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  handleFileChange(e);
                  setImageFile(e.target.files[0]);
                }}
              />
              {imageFile && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected file: {imageFile.name}
                </p>
              )}

              {uploadedImageUrl && (
                <img
                  src={uploadedImageUrl}
                  alt="Framework Image"
                  className="h-32 w-32 my-2 rounded-lg object-cover"
                />
              )}

              <Button type="button" onClick={handleUpload}>
                Upload Image
              </Button>

              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 ml-2 rounded"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Frameworks;