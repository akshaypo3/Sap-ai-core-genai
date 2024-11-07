"use client"; // Add this line at the top

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Import the Button component from ShadCN
import { fetchAssessments, createAssessment, updateAssessment } from "@/lib/esrs/action"; // Import all functions

export default function ESRSOverview() {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDialog, setShowDialog] = useState(false); // State to show/hide create dialog
    const [showEditDialog, setShowEditDialog] = useState(false); // State to show/hide edit dialog
    const [newAssessment, setNewAssessment] = useState({
        fyear: '',
        description: '',
        total_data_points: 0,
        completed: 0,
        under_review: 0,
        to_be_assessed: 0
    });
    const [editAssessment, setEditAssessment] = useState({
        id: null,
        fyear: '',
        description: '',
        total_data_points: 0,
        completed: 0,
        under_review: 0,
        to_be_assessed: 0
    });
    const [dropdownOpen, setDropdownOpen] = useState(null); // State to manage which row has the dropdown open

    // Fetch all assessments when the component mounts
    useEffect(() => {
        const loadAssessments = async () => {
            setLoading(true);
            try {
                const data = await fetchAssessments(); // Fetch all assessments
                if (Array.isArray(data)) {
                    setAssessments(data);
                } else {
                    setAssessments([]);
                }
            } catch (err) {
                console.error("Error fetching assessments:", err);
                setError("Failed to fetch assessments.");
            } finally {
                setLoading(false);
            }
        };

        loadAssessments();
    }, []);

    // Handle creating a new assessment
    const handleCreateAssessment = async () => {
        console.log("Creating new assessment with data:", newAssessment); // Debug: Check data being submitted
        const success = await createAssessment(newAssessment);
        if (success) {
            const data = await fetchAssessments();
            setAssessments(data);
            setShowDialog(false);
        }
    };

    // Handle editing an existing assessment
    const handleEditAssessment = async () => {
        console.log("Submitting edit form with data:", editAssessment); // Debug: Check what data is being passed

        try {
            // Ensure you are sending the correct data to the backend
            const success = await updateAssessment(editAssessment);
            console.log("Update success:", success); // Debug: Check if the update function returns true/false
            if (success) {
                const data = await fetchAssessments();
                setAssessments(data);
                setShowEditDialog(false);
            } else {
                console.error("Failed to update assessment.");
            }
        } catch (error) {
            console.error("Error updating assessment:", error);
        }
    };

    // Handle viewing an assessment
    const handleViewAssessment = (assessment) => {
        console.log("Viewing assessment:", assessment);
        // Implement your view logic here, maybe open a modal or show more details
    };

    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id); // Toggle the dropdown for a specific row
    };

    return (
        <div className="bg-white min-h-screen p-6">
            {/* Header Section */}
            <div className="mb-6 p-6 bg-[#F9FAFB] rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-700">ESRS</h2>
                    <Button
                        onClick={() => setShowDialog(true)}
                        variant="solid"
                        className="px-6 py-3 bg-black text-white hover:bg-gray-800"
                    >
                        New Assessment
                    </Button>
                </div>
            </div>

            {/* Assessments Table */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner-border animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : assessments.length > 0 ? (
                <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-white">
                        <tr className="text-left border-b">
                            <th className="px-4 py-2 text-sm font-medium text-gray-700">Assessment Year</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-700">Total Data Points</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-700">Completed</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-700">Under Review</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-700">To Be Assessed</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map((assessment) => (
                            <tr key={assessment.id} className="border-t hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2 text-sm text-gray-700">{assessment.fyear}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{assessment.total_data_points || "N/A"}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{assessment.completed || "N/A"}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{assessment.under_review || "N/A"}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{assessment.to_be_assessed || "N/A"}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {/* Action Button (Ellipsis) */}
                                    <button
                                        onClick={() => toggleDropdown(assessment.id)}
                                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                                    >
                                        <span className="text-lg">...</span>
                                    </button>

                                    {/* Dropdown menu for View and Edit options */}
                                    {dropdownOpen === assessment.id && (
                                        <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-40 right-0 z-10">
                                            <div
                                                onClick={() => handleViewAssessment(assessment)}
                                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            >
                                                View
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setEditAssessment(assessment); // Set data to edit
                                                    setShowEditDialog(true);
                                                    toggleDropdown(assessment.id); // Close dropdown
                                                }}
                                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            >
                                                Edit
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-600">No assessments available</p>
            )}

            {/* Create Assessment Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Start new ERSR Reporing Process</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Assessment Year</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={newAssessment.fyear}
                                onChange={(e) => setNewAssessment({ ...newAssessment, fyear: e.target.value })}
                            />
                        </div>
                        {/* <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={newAssessment.description}
                                onChange={(e) => setNewAssessment({ ...newAssessment, description: e.target.value })}
                            />
                        </div> */}
                        {/* Add other fields as necessary */}
                        <div className="flex justify-end">
                            <Button
                                onClick={handleCreateAssessment}
                                className="mr-3 px-6 py-3 bg-black text-white hover:bg-gray-800"
                            >
                                Submit
                            </Button>
                            <Button
                                variant="outline"
                                color="gray"
                                onClick={() => setShowDialog(false)}
                                className="px-6 py-3 text-gray-700 border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Assessment Dialog */}
            {showEditDialog && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Edit Assessment</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Assessment Year</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={editAssessment.fyear}
                                onChange={(e) => setEditAssessment({ ...editAssessment, fyear: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={editAssessment.description}
                                onChange={(e) => setEditAssessment({ ...editAssessment, description: e.target.value })}
                            />
                        </div>
                        {/* Add other fields as necessary */}
                        <div className="flex justify-end">
                            <Button
                                onClick={handleEditAssessment}
                                className="mr-3 px-6 py-3 bg-black text-white hover:bg-gray-800"
                            >
                                Submit
                            </Button>
                            <Button
                                variant="outline"
                                color="gray"
                                onClick={() => setShowEditDialog(false)}
                                className="px-6 py-3 text-gray-700 border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
