"use client"; // Ensure this is at the top of the file

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle ,DialogDescription} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { fetchAssessments, createAssessment, deleteAssessment } from "@/lib/brsr/action";
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BRSROverview() {
  const [brsrData, setBRSRData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAssessment, setNewAssessment] = useState({
    fyear: '2024', 
  });
  const [newBRSR, setNewBRSR] = useState({
    fyear: '',
    total_data_points: 0,
    completed: 0,
    under_review: 0,
    to_be_assessed: 0,
    framework: '',
    status: '',
    material: 0,
    non_material: 0,
  });

  const router = useRouter();

  // Check if functions are imported correctly
  useEffect(() => {
    console.log("createAssessment:", createAssessment);
    console.log("deleteAssessment:", deleteAssessment);
  }, []);

  const loadBRSRData = async () => {
    setLoading(true);
    try {
      const data = await fetchAssessments();
      if (data) {
        setBRSRData(data);
      } else {
        throw new Error("No data returned from fetchAssessments");
      }
    } catch (err) {
      setError("Failed to fetch BRSR data.");
      console.error("Error fetching BRSR data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBRSRData();
  }, []);

  const handleCreateBRSR = async () => {
    try {
      const success = await createAssessment(newBRSR);
      if (success) {
        console.log("Assessment created successfully!");
        await loadBRSRData();
        // Reset form state after successful creation
        setNewBRSR({
          fyear: '',
          total_data_points: 0,
          completed: 0,
          under_review: 0,
          to_be_assessed: 0,
          framework: '',
          status: '',
          material: 0,
          non_material: 0,
        });
        router.refresh();
      } else {
        console.warn("Failed to create assessment.");
      }
    } catch (error) {
      console.error("Error creating BRSR:", error);
    }
  };

  const handleDeleteBRSR = async (id) => {
    try {
      const success = await deleteAssessment(id);
      if (success) {
        console.log(`Assessment with ID ${id} deleted successfully!`);
        await loadBRSRData();
        router.refresh();
      } else {
        console.warn("Failed to delete assessment:", id);
      }
    } catch (error) {
      console.error("Error deleting BRSR:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t">
        <h3 className="text-xl font-semibold">BRSR Assessment</h3>

        {/* Dialog inside the parent div */}
        <Dialog>
          {/* Dialog Trigger Button */}
          <DialogTrigger asChild>
            <Button className="px-4 py-2 bg-black text-white rounded mt-2">
              New Assessment
            </Button>
          </DialogTrigger>

          {/* Dialog Content */}
          <DialogContent className="w-full max-w-md h-auto p-6">
            <DialogHeader>
              <DialogTitle>New Assessment</DialogTitle>
              <DialogDescription>New Assessment Function description</DialogDescription>
            </DialogHeader>

            {/* Form Inputs */}
            <div className="flex flex-col space-y-4">
              <label>Year</label>
              <Input
                type="number"
                name="fyear"
                placeholder="2024"
                value={newAssessment.fyear}
                onChange={(e) => setNewBRSR({ ...newBRSR, fyear: e.target.value })}
              />
            </div>

            {/* Dialog Actions */}
            <div className="flex justify-end mt-4">
              <Button onClick={handleCreateBRSR} className="bg-black text-white w-full">
                Create Assessment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="spinner-border animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : brsrData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fiscal Year</TableHead>
              <TableHead>Framework</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Data Points</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Not Material</TableHead>
              <TableHead>Under Review</TableHead>
              <TableHead>To Be Assessed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brsrData.map((brsr) => (
              <TableRow key={brsr.id}>
                <TableCell>{brsr.fyear}</TableCell>
                <TableCell>{brsr.framework}</TableCell>
                <TableCell><Badge className="bg-slate-500">{brsr.status}</Badge></TableCell>
                <TableCell>{brsr.total_data_points}</TableCell>
                <TableCell>{brsr.material}</TableCell>
                <TableCell>{brsr.non_material}</TableCell>
                <TableCell>{brsr.under_review}</TableCell>
                <TableCell>{brsr.to_be_assessed}</TableCell>
                <TableCell className="flex justify-center">
                  {/* Dropdown Menu for Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link" className="text-black">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={`/reporting/frameworks/brsr/${brsr.id}`} passHref>
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteBRSR(brsr.id)}>
                        Delete
                      </DropdownMenuItem>
                      {/* Add other actions such as Edit */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-600 py-4">No BRSR data available</p>
      )}
    </div>
  );
}
