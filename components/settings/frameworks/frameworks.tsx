"use client";

import React, { useEffect, useState } from "react";
import { fetchActiveFrameworks, createFramework, updateFramework } from "@/lib/settings/frameworks/action"; // Adjust the import path based on your project structure
import image from "@/public/brsr_banner.png"; // Default image

const Frameworks = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [currentFramework, setCurrentFramework] = useState(null);
    const [newFramework, setNewFramework] = useState({
        frameworkTitle: "",
        frameworkDescription: "",
        materialityAssessmentNeeded: false,
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const frameworks = await fetchActiveFrameworks();

            const combinedData = frameworks.map((framework) => {
                return {
                    id: framework.id,
                    frameworkTitle: framework.title,
                    frameworkDescription: framework.description,
                    instancesStatus: framework.active ? "Active" : "Inactive", // Use active value
                    materialityAssessmentNeeded: framework.needsAssessment ? "Materiality Assessment needed" : "Not needed", // Use needsAssessment value
                    image: framework.image || image.src, // Default image if none is provided
                };
            });

            setData(combinedData);
            setLoading(false);
        };

        loadData();
    }, []);

    const openEditDialog = (framework) => {
        setCurrentFramework(framework);
        setIsDialogOpen(true);
        setImageFile(null); // Reset image file to ensure no leftover data
    };

    const closeEditDialog = () => {
        setIsDialogOpen(false);
        setCurrentFramework(null);
    };

    const openAddDialog = () => {
        setNewFramework({
            frameworkTitle: "",
            frameworkDescription: "",
            materialityAssessmentNeeded: false,
        });
        setImageFile(null); // Reset the image file
        setIsAddDialogOpen(true);
    };

    const closeAddDialog = () => {
        setIsAddDialogOpen(false);
    };

    const handleSave = async () => {
        const updatedFramework = {
            ...currentFramework,
            image: imageFile || currentFramework.image, // Use new image if uploaded
            needsAssessment: currentFramework.materialityAssessmentNeeded === "Materiality Assessment needed" // Map to needsAssessment
        };

        const { success, error } = await updateFramework(currentFramework.id, updatedFramework);

        if (success) {
            closeEditDialog();
            const frameworks = await fetchActiveFrameworks(); // Fetch updated frameworks
            setData(frameworks);
        } else {
            console.error("Failed to update framework:", error);
        }
    };

    const handleAddFramework = async () => {
        const newFrameworkData = {
            title: newFramework.frameworkTitle, // Updated to match your action.ts expectations
            description: newFramework.frameworkDescription, // Updated to match your action.ts expectations
            needsAssessment: newFramework.materialityAssessmentNeeded, // Use needsAssessment for backend
            active: true, // Set instance status to active by default
            image: imageFile || 'path/to/sample-image.png', // Use sample image if none is uploaded
        };

        const { success, error } = await createFramework(newFrameworkData);

        if (success) {
            closeAddDialog();
            const frameworks = await fetchActiveFrameworks(); // Fetch updated frameworks
            setData(frameworks);
        } else {
            console.error("Failed to add framework:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Frameworks</h2>
                <button
                    onClick={openAddDialog}
                    className="text-white bg-black px-3 py-1 rounded hover:bg-gray-800"
                    style={{ backgroundColor: "#000000" }}
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
                        <th className="py-3 px-4 font-medium">Materiality Assessment needed</th>
                        <th className="py-3 px-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-all duration-200 ease-in-out border-b">
                            <td className="py-3 px-4">
                                <img src={item.image} alt="" className="w-20 h-10 object-cover" />
                            </td>
                            <td className="py-3 px-4 text-gray-800 font-medium">{item.frameworkTitle}</td>
                            <td className="py-3 px-4 text-gray-600">{item.frameworkDescription}</td>
                            <td className="py-3 px-4 text-gray-800">{item.instancesStatus}</td>
                            <td className="py-3 px-4 text-gray-800">{item.materialityAssessmentNeeded}</td>
                            <td className="py-3 px-4">
                                <button
                                    onClick={() => openEditDialog(item)}
                                    className="px-4 py-2 text-white bg-black rounded hover:bg-gray-800 transition-colors"
                                    style={{ backgroundColor: "#000000" }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-lg">
                        <h3 className="text-lg font-semibold mb-4">Edit Framework</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Framework Title</label>
                            <input
                                type="text"
                                value={currentFramework?.frameworkTitle || ""}
                                onChange={(e) =>
                                    setCurrentFramework({ ...currentFramework, frameworkTitle: e.target.value })
                                }
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Framework Description</label>
                            <textarea
                                value={currentFramework?.frameworkDescription || ""}
                                onChange={(e) =>
                                    setCurrentFramework({ ...currentFramework, frameworkDescription: e.target.value })
                                }
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Upload New Image (350x150px)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImageFile(file);
                                    }
                                }}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Materiality Assessment Needed</label>
                            <select
                                value={currentFramework?.materialityAssessmentNeeded || ""}
                                onChange={(e) =>
                                    setCurrentFramework({
                                        ...currentFramework,
                                        materialityAssessmentNeeded: e.target.value,
                                    })
                                }
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="Materiality Assessment needed">Materiality Assessment needed</option>
                                <option value="Not needed">Not needed</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeEditDialog}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Dialog */}
            {isAddDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-lg">
                        <h3 className="text-lg font-semibold mb-4">Add Framework</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Framework Title</label>
                            <input
                                type="text"
                                value={newFramework.frameworkTitle}
                                onChange={(e) => setNewFramework({ ...newFramework, frameworkTitle: e.target.value })}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Framework Description</label>
                            <textarea
                                value={newFramework.frameworkDescription}
                                onChange={(e) => setNewFramework({ ...newFramework, frameworkDescription: e.target.value })}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Upload Image (350x150px)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImageFile(file);
                                    }
                                }}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Materiality Assessment Needed</label>
                            <select
                                value={newFramework.materialityAssessmentNeeded}
                                onChange={(e) => setNewFramework({ ...newFramework, materialityAssessmentNeeded: e.target.value })}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value={false}>Not needed</option>
                                <option value={true}>Materiality Assessment needed</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeAddDialog}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddFramework}
                                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                            >
                                Add Framework
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Frameworks;
