"use client"; // Ensure this is at the top of the file

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
import { useTranslations } from 'next-intl';


export default function BRSROverview() {
  const [brsrData, setBRSRData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAssessment, setNewAssessment] = useState({
    fyear: '2024',
  });
  const [newBRSR, setNewBRSR] = useState({
    fyear: '2024'
  });
  const [key, setKey] = useState(0);  // State to trigger component re-render
  const [refreshToggle, setRefreshToggle] = useState(false);  // State to trigger re-fetching
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);  // State for delete dialog
  const [assessmentToDelete, setAssessmentToDelete] = useState(null); // State to track which assessment to delete
  const [deleting, setDeleting] = useState(false);  // New state for deleting status
  const router = useRouter();

  // Function to load BRSR data
  const loadBRSRData = async () => {
    setLoading(true);
    try {
      const data = await fetchAssessments();  // Fetch data using your API or logic
      if (data && Array.isArray(data)) {
        setBRSRData(data);
        console.log("Updated BRSR Data:", data);  // Log data to verify updates
      } else {
        console.error("Unexpected data format or empty data:", data);
        setError("Failed to fetch BRSR data.");
      }
    } catch (err) {
      setError("Failed to fetch BRSR data.");
      console.error("Error fetching BRSR data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBRSRData();  // Load the data when component mounts or refreshToggle changes
  }, [refreshToggle]);

  // Function to create a new BRSR assessment
  const handleCreateBRSR = async () => {
    try {
      const success = await createAssessment(newBRSR);
      if (success) {
        console.log("Assessment created successfully!");
        setKey((prevKey) => prevKey + 1);  // Trigger re-render by updating key
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
        setRefreshToggle((prev) => !prev);  // Toggle to trigger re-fetching data
      } else {
        console.warn("Failed to create assessment.");
      }
    } catch (error) {
      console.error("Error creating BRSR:", error);
    }
  };

  // Function to delete a BRSR assessment by ID
  const handleDeleteBRSR = async () => {
    if (!assessmentToDelete) return;

    setDeleting(true);  // Set deleting to true when the process starts

    try {
      const success = await deleteAssessment(assessmentToDelete);
      if (success) {
        console.log(`Assessment with ID ${assessmentToDelete} deleted successfully!`);
        setKey((prevKey) => prevKey + 1);  // Trigger re-render by updating key
        setRefreshToggle((prev) => !prev);  // Toggle to trigger re-fetching data
        setDeleteDialogOpen(false);  // Close the dialog after deletion
      } else {
        console.warn("Failed to delete assessment:", assessmentToDelete);
      }
    } catch (error) {
      console.error("Error deleting BRSR:", error);
    } finally {
      setDeleting(false);  // Set deleting to false when the process is complete
    }
  };
  const t = useTranslations('reporting');
  return (
    <div key={key} className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t">
        <h3 className="text-xl font-semibold">{t('frameworks.brsr.title')}</h3>

        {/* Dialog inside the parent div */}
        <Dialog>
          {/* Dialog Trigger Button */}
          <DialogTrigger asChild>
            <Button className="px-4 py-2 bg-black text-white rounded mt-2">
            {t('frameworks.brsr.New Assessment')}
            </Button>
          </DialogTrigger>

          {/* Dialog Content */}
          <DialogContent className="w-full max-w-md h-auto p-6">
            <DialogHeader>
              <DialogTitle>{t('frameworks.brsr.Start BRSR New Assessment')}</DialogTitle>
              <DialogDescription>{t('frameworks.brsr.New Assessment Function description')}</DialogDescription>
            </DialogHeader>

            {/* Form Inputs */}
            <div className="flex flex-col space-y-4">
              <label>{t('frameworks.brsr.Year')}</label>
              <Input
                type="number"
                name="fyear"
                placeholder="2024"
                onChange={(e) => setNewBRSR({ ...newBRSR, fyear: e.target.value })}
              />
            </div>

            {/* Dialog Actions */}
            <div className="flex justify-end mt-4">
              <Button onClick={handleCreateBRSR} className="bg-black text-white w-full">
              {t('frameworks.brsr.Create Assesment')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : brsrData.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('frameworks.brsr.Fiscal Year')}</TableHead>
              <TableHead>{t('frameworks.brsr.Framework')}</TableHead>
              <TableHead>{t('frameworks.brsr.Status')}</TableHead>
              <TableHead>{t('frameworks.brsr.Total Data Points')}</TableHead>
              <TableHead>{t('frameworks.brsr.Material')}</TableHead>
              <TableHead>{t('frameworks.brsr.Not Material')}</TableHead>
              <TableHead>{t('frameworks.brsr.Under Review')}</TableHead>
              <TableHead>{t('frameworks.brsr.To Be Assessed')}</TableHead>
              <TableHead>{t('frameworks.brsr.Actions')}</TableHead>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="px-3 border-none">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t('frameworks.brsr.Actions')}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={`/reporting/frameworks/brsr/${brsr.id}`} passHref>
                        {t('frameworks.brsr.View')}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setAssessmentToDelete(brsr.id); setDeleteDialogOpen(true); }}>
                      {t('frameworks.brsr.Delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> {t('frameworks.brsr.Delete BSRS Assessment')}</DialogTitle>
          </DialogHeader>
          <p>{t('frameworks.brsr.Are you sure you want to delete this assessment?')}</p>
          <div className="flex justify-end mt-4 space-x-1">
            <Button className="bg-green-500 hover:bg-green-600" onClick={() => setDeleteDialogOpen(false)}>
            {t('frameworks.brsr.Cancel')} 
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteBRSR}
              disabled={deleting}
              className={deleting ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"}
            >
              {deleting ? t("frameworks.brsr.Deleting") : t("frameworks.brsr.Delete")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
