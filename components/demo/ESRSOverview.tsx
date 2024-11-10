"use client"; // Ensure this is at the top of the file

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchAssessments, createAssessment, deleteAssessment } from "@/lib/esrs/action";
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTranslations } from 'next-intl/server';
export default function ESRSOverview() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAssessment, setNewAssessment] = useState({
    fyear: '2024', 
  });
  const [showDialog, setShowDialog] = useState(false); // For managing dialog visibility

  const router = useRouter();

  const loadAssessments = async () => {
    setLoading(true);
    try {
      const data = await fetchAssessments();
      setAssessments(data);
    } catch (err) {
      setError("Failed to fetch assessments.");
      console.error("Error fetching assessments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssessments();
  }, []);

  const handleCreateAssessment = async () => {
    try {
      const success = await createAssessment(newAssessment);
      if (success) {
        setShowDialog(false); // Close the dialog after successful submission
        await loadAssessments();
      }
    } catch (error) {
      console.error("Error creating assessment:", error);
    }
  };

  const handleDeleteAssessment = async (id) => {
    try {
      const success = await deleteAssessment(id);
      if (success) {
        await loadAssessments();
      } else {
        console.warn("Failed to delete assessment:", id);
      }
    } catch (error) {
      console.error("Error deleting assessment:", error);
    }
  };

  const handleViewAssessment = (id) => {
    // Redirect to the details page (example)
    router.push(`/reporting/frameworks/esrs/${id}`);
  };
  

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t">
        <h3 className="text-xl font-semibold">Materiality Assessment</h3>

        {/* Dialog inside the parent div */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          {/* Dialog Trigger Button */}
          <DialogTrigger asChild>
            <Button className="px-4 py-2 bg-black text-white rounded mt-2">
              New Assessment
            </Button>
          </DialogTrigger>

          {/* Dialog Content */}
          <DialogContent className="w-full max-w-md h-auto p-6">
            <DialogHeader>
              <DialogTitle>Start New Assessment</DialogTitle>
             <DialogDescription>New Assessment Function description</DialogDescription>
            </DialogHeader>

            {/* Form Inputs */}
            <div className="flex flex-col space-y-4">
              <label> Year</label>
              <Input
                type="number"
                name="fyear"
                placeholder="Assessment Year"
                value={newAssessment.fyear}
                onChange={(e) => setNewAssessment({ ...newAssessment, fyear: e.target.value })}
              />
            </div>

            {/* Dialog Actions */}
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleCreateAssessment}
                className="w-full px-6 py-3 bg-black text-white hover:bg-gray-800"
              >
                Create Assessment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assessments Table */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : assessments.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fiscal Year</TableHead>
              <TableHead>Framework</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total IORs</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Not Material</TableHead>
              <TableHead>Under Review</TableHead>
              <TableHead>To Be Assessed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>{assessment.fyear}</TableCell>
                <TableCell>{assessment.frameworks}</TableCell> 
                <TableCell><Badge className="bg-slate-500">{assessment.status }</Badge></TableCell>
                <TableCell>{assessment.total_data_points }</TableCell>
                <TableCell>{assessment.material }</TableCell>
                <TableCell>{assessment.non_material }</TableCell>
                <TableCell>{assessment.under_review }</TableCell>
                <TableCell>{assessment.to_be_assessed }</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="px-2 py-1">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewAssessment(assessment.id)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteAssessment(assessment.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-600">No assessments available</p>
      )}
    </div>
  );
}
