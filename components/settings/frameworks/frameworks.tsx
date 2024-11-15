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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { frameworkSchema } from "@/schemas/FrameworkSchema";


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

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(frameworkSchema),
    defaultValues: {
      title: "",
      description: "",
      isActive: "",
      needsAssessment: "",
    },
  });
  useEffect(() => {
    form.reset({
      title: "",
      description: "",
      isActive: "",
      needsAssessment: "",
      link: "",
    });
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

  // const onSubmit = async (data) => {
  //   console.log("newFormData", data);
  //   console.log("newFormData", id);
  //   const formData = new FormData();
  //   formData.append("title", data.title);
  //   formData.append("description", data.description);
  //   formData.append("isActive", data.isActive);
  //   formData.append("needsAssessment", data.needsAssessment);
  //   formData.append("link", uploadedImageUrl || data.link);

  //   if (isEditing) {
  //     console.log("formData Update", formData);
  //     //await updateFramework(data.id, formData);
  //   } else {
  //     console.log("formData Insert", formData);
  //     await insertFramework(formData);
  //   }

  //   loadFrameworks();
  //   resetForm();
  //   setShowModal(false);

  //   //await createGroup(formData);
  //   //closeDialoge();
  // };

  const onSubmit = async (data) => {
    try {
      const formDataToSubmit = {
        id: formData.id, // Use the ID stored in the formData state
        title: data.title,
        description: data.description,
        isActive: data.isActive === "true",
        needsAssessment: data.needsAssessment === "true",
        link: uploadedImageUrl || data.link,
      };

      if (isEditing) {
        console.log("Updating Framework", formDataToSubmit);
        await updateFramework(formDataToSubmit.id, formDataToSubmit); // Pass the ID explicitly
      } else {
        console.log("Inserting Framework", formDataToSubmit);
        await insertFramework(formDataToSubmit);
      }

      loadFrameworks(); // Reload the data
      resetForm(); // Reset the form
      setShowModal(false); // Close the modal
      toast({
        variant: "success",
        title: `Framework ${isEditing ? "Updated" : "Added"} Successfully`,
      });
    } catch (error) {
      console.error("Error in form submission:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const onSubmit1 = async (e) => {
    console.log("newFormData", newFormData);
    e.preventDefault();

    const newFormData = {
      ...formData,
      link: uploadedImageUrl || formData.link,
    };

    if (isEditing) {
      //await updateFramework(formData.id, newFormData);
    } else {
      //await insertFramework(newFormData);
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

  // const handleEdit = (item) => {
  //   console.log("item", item);
  //   setFormData({
  //     id: item.id,
  //     title: item.frameworkTitle,
  //     description: item.frameworkDescription,
  //     isActive: item.instancesStatus === "Active" ? "true" : "false",
  //     needsAssessment:
  //       item.materialityAssessmentNeeded === "Materiality Assessment needed"
  //         ? "true"
  //         : "false",
  //     link: item.link,
  //   });
  //   setImageFile(null);
  //   setUploadedImageUrl(item.link);
  //   setIsEditing(true);
  //   setShowModal(true);
  // };

  const handleEdit = (item) => {
    console.log("itemID", item.id);
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

    // Update form default values explicitly for React Hook Form
    form.reset({
      title: item.frameworkTitle,
      description: item.frameworkDescription,
      isActive: item.instancesStatus === "Active" ? "true" : "false",
      needsAssessment:
        item.materialityAssessmentNeeded === "Materiality Assessment needed"
          ? "true"
          : "false",
    });

    setImageFile(null);
    setUploadedImageUrl(item.link);
    setIsEditing(true);
    setShowModal(true);
  };

  const openModal = () => {
    resetForm();
    form.reset({
      title: "",
      description: "",
      isActive: "false", // default value as per your form requirement
      needsAssessment: "false", // default value as per your form requirement
      link: "",
    });
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
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="bg-white p-6 rounded shadow-lg w-full sm:w-96 md:w-[600px] lg:w-[800px]">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Framework" : "Add Framework"}
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="title"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="description"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select
                          className="w-full p-2 border rounded mb-4"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="needsAssessment"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Materiality Assessment Needed</FormLabel>
                      <FormControl>
                        <select
                          className="w-full p-2 border rounded mb-4"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="true">Needed</option>
                          <option value="false">Not Needed</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="needsAssessment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Materiality Assessment Needed</FormLabel>
                      <FormControl>
                        <select
                          value={formData.needsAssessment}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded mb-4"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <option value="true">Needed</option>
                          <option value="false">Not Needed</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-4"
                  required
                /> */}

                {/* <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-4"
                  required
                /> */}

                {/* <label className="block mb-2">Status</label>
                <select
                  name="isActive"
                  value={formData.isActive}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-4"
                  required
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select> */}

                {/* <label className="block mb-2">
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
                </select> */}

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
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Frameworks;
