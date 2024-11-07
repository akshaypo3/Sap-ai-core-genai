"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchAssessments, createAssessment, updateAssessment } from "@/lib/brsr/action";
import { Menu } from "@headlessui/react"; // Using Headless UI for dropdown menu

export default function BRSROverview() {
    const [brsrData, setBRSRData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showViewDialog, setShowViewDialog] = useState(false); // New state for View dialog
    const [newBRSR, setNewBRSR] = useState({
        fyear: '',
        description: '',
        total_data_points: 0,
        completed: 0,
        under_review: 0,
        to_be_assessed: 0
    });
    const [editBRSR, setEditBRSR] = useState({
        id: null,
        fyear: '',
        description: '',
        total_data_points: 0,
        completed: 0,
        under_review: 0,
        to_be_assessed: 0
    });

    useEffect(() => {
        const loadBRSR = async () => {
            setLoading(true);
            try {
                const data = await fetchAssessments();
                setBRSRData(data);
            } catch (err) {
                setError("Failed to fetch BRSR data.");
                console.error("Error fetching BRSR data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBRSR();
    }, []);

    const handleCreateBRSR = async () => {
        const success = await createAssessment(newBRSR);
        if (success) {
            const data = await fetchAssessments();
            setBRSRData(data);
            setShowDialog(false);
        }
    };

    const handleEditBRSR = async () => {
        const success = await updateAssessment(editBRSR);
        if (success) {
            const data = await fetchAssessments();
            setBRSRData(data);
            setShowEditDialog(false);
        }
    };

    return (
        <div className="bg-white min-h-screen p-6">
            <div className="mb-6 p-6 flex items-center justify-between bg-[#F9FAFB] rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700">BRSR Overview</h2>
                <Button onClick={() => setShowDialog(true)} className="px-6 py-3 bg-black text-white">
                    New Assessment
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner-border animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : brsrData.length > 0 ? (
                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr className=" text-left">
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">BRSR Year</th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">Total Data Points</th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">Completed</th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">Under Review</th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">To Be Assessed</th>
                            <th className="px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brsrData.map((brsr) => (
                            <tr key={brsr.id} className="border-t hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-3 text-sm text-gray-700">{brsr.fyear}</td>
                                <td className="px-6 py-3 text-sm text-gray-700">{brsr.total_data_points || "N/A"}</td>
                                <td className="px-6 py-3 text-sm text-gray-700">{brsr.completed || "N/A"}</td>
                                <td className="px-6 py-3 text-sm text-gray-700">{brsr.under_review || "N/A"}</td>
                                <td className="px-6 py-3 text-sm text-gray-700">{brsr.to_be_assessed || "N/A"}</td>
                                <td className="px-6 py-3">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <Menu.Button className="text-gray-700 hover:text-black">
                                            ...
                                        </Menu.Button>
                                        <Menu.Items className="absolute right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => {
                                                                setEditBRSR(brsr);
                                                                setShowEditDialog(true);
                                                            }}
                                                            className={`${
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => {
                                                                setEditBRSR(brsr);
                                                                setShowViewDialog(true); // Trigger view dialog
                                                            }}
                                                            className={`${
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                                                        >
                                                            View
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-600">No BRSR data available</p>
            )}

            {showEditDialog && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Edit BRSR</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">BRSR Year</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={editBRSR.fyear}
                                onChange={(e) => setEditBRSR({ ...editBRSR, fyear: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end mt-6 space-x-3">
                            <Button onClick={handleEditBRSR} className="bg-black text-white">
                                Update
                            </Button>
                            <Button variant="outline" color="gray" onClick={() => setShowEditDialog(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {showViewDialog && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">View BRSR</h2>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700">BRSR Year</p>
                            <p className="text-gray-700">{editBRSR.fyear}</p>
                        </div>
                        <div className="flex justify-end mt-6 space-x-3">
                            <Button variant="outline" color="gray" onClick={() => setShowViewDialog(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
