"use client";

import React, { useEffect, useState } from "react";
import { fetchActiveFrameworks, insertFramework, updateFramework } from "@/lib/settings/frameworks/action";
import { uploadImage } from "@/utils/supabase/client"; 
import { Button } from "@/components/ui/button";
import ImageUploader from "./ImagesUploader";

const Frameworks = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        description: "",
        isActive: false,
        needsAssessment: false,
        link: "", 
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

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
                    materialityAssessmentNeeded: framework.needsAssessment ? "Materiality Assessment needed" : "Not needed",
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
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Client-side image upload
    const handleImageUpload = async () => {
        if (imageFile) {
            try {
                const uploadResult = await uploadImage(imageFile, `frameworks_img/${imageFile.name}`);
                if (uploadResult.success) {
                    setUploadedImageUrl(uploadResult.imageUrl); // Store signed URL for later form submission
                    console.log("Image uploaded successfully!");
                } else {
                    console.error("Failed to upload image:", uploadResult.error);
                }
            } catch (error) {
                console.error("Image upload error:", error);
            }
        }
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
            isActive: item.instancesStatus === "Active",
            needsAssessment: item.materialityAssessmentNeeded === "Materiality Assessment needed",
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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <ImageUploader/>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <h2 className="text-xl font-semibold text-gray-800">Frameworks</h2>
            <div className="flex justify-end mb-4">
                <button onClick={openModal} className="bg-black text-white py-2 px-4 rounded">
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
                        <th className="py-3 px-4 font-medium">Materiality Assessment needed</th>
                        <th className="py-3 px-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-all duration-200 ease-in-out border-b">
                            <td className="py-3 px-4">
                                {item.link ? (
                                    <img src={item.link} alt={item.frameworkTitle} className="h-12 w-12 object-cover" />
                                ) : (
                                    <div style={{ background: "linear-gradient(to right, #ff7e5f, #feb47b)" }} className="h-12 w-12"></div>
                                )}
                            </td>
                            <td className="py-3 px-4 text-gray-800 font-medium">{item.frameworkTitle}</td>
                            <td className="py-3 px-4 text-gray-600">{item.frameworkDescription}</td>
                            <td className="py-3 px-4 text-gray-800">{item.instancesStatus}</td>
                            <td className="py-3 px-4 text-gray-800">{item.materialityAssessmentNeeded}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => handleEdit(item)} className="bg-black text-white py-1 px-2 rounded">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Framework" : "Add Framework"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Is Active</label>
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Needs Assessment</label>
                                <input
                                    type="checkbox"
                                    name="needsAssessment"
                                    checked={formData.needsAssessment}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:text-sm file:bg-gray-200"
                                />
                                <Button type="button" onClick={handleImageUpload} className="bg-black text-white mt-2">
                                    Upload Image
                                </Button>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button type="submit" className="bg-black text-white">
                                    {isEditing ? "Update" : "Submit"}
                                </Button>
                                <Button onClick={closeModal} className="ml-2">
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
