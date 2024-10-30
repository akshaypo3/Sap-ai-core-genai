"use client";

import React, { useEffect, useState } from "react";
import { fetchPlans, updatePlan } from "@/lib/settings/instances/action"; // Import fetch and update functions
import { Input } from "@/components/ui/input";


export default function Instances() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(null); // Track selected plan ID for editing

    useEffect(() => {
        const loadPlans = async () => {
            setLoading(true);
            try {
                const data = await fetchPlans();
                console.log("Fetched Plans Data in Instances:", data);
                if (Array.isArray(data)) {
                    setPlans(data);
                } else {
                    setPlans([]);
                }
            } catch (err) {
                console.error("Error fetching plans:", err);
                setError("Failed to fetch plans.");
            } finally {
                setLoading(false);
            }
        };

        loadPlans();
    }, []);

    const openEditDialog = () => {
        setIsEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setIsEditDialogOpen(false);
        setSelectedPlanId(null);
    };

    const handleSaveChanges = async () => {
        try {
            const activePlan = plans.find(plan => plan.active);
            if (activePlan && activePlan.id !== selectedPlanId) {
                await updatePlan(activePlan.id, { ...activePlan, active: false });
                setPlans((prevPlans) =>
                    prevPlans.map((plan) =>
                        plan.id === activePlan.id ? { ...plan, active: false } : plan
                    )
                );
            }

            await updatePlan(selectedPlanId, { active: true });
            setPlans((prevPlans) =>
                prevPlans.map((plan) =>
                    plan.id === selectedPlanId ? { ...plan, active: true } : plan
                )
            );

            closeEditDialog();
        } catch (error) {
            console.error("Error updating plan:", error);
            setError("Failed to update plan.");
        }
    };

    // Filter for active plans only
    const activePlans = plans.filter(plan => plan.active);

    return (
        <div style={{ backgroundColor: "#FAFAFA" }}>
            {loading ? (
                <p>Loading plans...</p>
            ) : error ? (
                <p>{error}</p>
            ) : activePlans.length > 0 ? (
                <div className="grid gap-4 mt-5">
                    {activePlans.map((plan) => (
                        <div key={plan.id} className="p-4 border rounded shadow relative">
                            <h2 className="text-lg font-bold"><strong>Instance Options</strong></h2>
                            <p className="mt-2">Plans:</p>
                            <div className="flex items-center mt-2">
                                <Input
                                    className=" text-lg  py-1 px-2 w-1/2"
                                    value={plan.name}
                                    readOnly />
                            </div>
                            <p className="mt-2"><strong>Max Users:</strong> {plan.maxusers} of 10</p>
                            <p className="mt-2"><strong>Max Companies:</strong> {plan.maxcompanies} of 5</p>
                            <p className="mt-2"><strong>Max Products:</strong> {plan.maxproducts}</p>
                            <button
                                onClick={openEditDialog}
                                className="absolute top-2 right-2 bg-[#16A34A] text-white px-4 py-2 text-lg rounded mt-5 me-3"
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No active plans available.</p>
            )}

            {isEditDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-1/3">
                        <h3 className="text-lg font-bold mb-4">Select Active Plan</h3>
                        <div className="mb-4">
                            {plans.map((plan) => (
                                <div key={plan.id} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="activePlan"
                                        checked={selectedPlanId === plan.id}
                                        onChange={() => setSelectedPlanId(plan.id)}
                                        className="mr-2"
                                    />
                                    <h2 className="text-lg font-bold">{plan.name}</h2>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={closeEditDialog} className="px-4 py-2 bg-gray-500 text-white rounded">
                                Cancel
                            </button>
                            <button onClick={handleSaveChanges} className="px-4 py-2 bg-green-500 text-white rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
