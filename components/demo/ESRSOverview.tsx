"use client"; // Ensure this is at the top of the file

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  fetchAssessments,
  createAssessment,
  deleteAssessment
} from "@/lib/esrs/action";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useTranslations } from 'next-intl';

export default function ESRSOverview() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAssessment, setNewAssessment] = useState({
    fyear: "2024"
  });
  const [showDialog, setShowDialog] = useState(false); // For creating a new assessment dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // For delete confirmation dialog
  const [assessmentToDelete, setAssessmentToDelete] = useState(null); // Store the assessment to delete
  const [deleting, setDeleting] = useState(false); // State to track if deletion is in progress

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
        setShowDialog(false);
        await loadAssessments(); // Refresh assessments after creation
      }
    } catch (error) {
      console.error("Error creating assessment:", error);
    }
  };

  const handleDeleteAssessment = async () => {
    if (!assessmentToDelete) return;
    setDeleting(true);
    try {
      const success = await deleteAssessment(assessmentToDelete);
      if (success) {
        await loadAssessments(); // Refresh assessments after deletion
        setShowDeleteDialog(false); // Close the delete dialog after deletion
      }
    } catch (error) {
      console.error("Error deleting assessment:", error);
    } finally {
      setDeleting(false); // Reset deleting state
    }
  };

  const handleViewAssessment = (id) => {
    router.push(`/reporting/frameworks/esrs/${id}`);
  };
  const t = useTranslations('reporting');
  return (
    <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t">
        <h3 className="text-xl font-semibold">{t('frameworks.esrs.title')}</h3>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="px-4 py-2 bg-black text-white rounded mt-2">
            {t('frameworks.esrs.New Assessment')}
            </Button>
          </DialogTrigger>

          <DialogContent className="w-full max-w-md h-auto p-6">
            <DialogHeader>
              <DialogTitle>{t('frameworks.esrs.Start ESRS New Assessment')}</DialogTitle>
              <DialogDescription>{t('frameworks.esrs.New Assessment Function description')}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col space-y-4">
              <label>{t('frameworks.esrs.Year')}</label>
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
                {t('frameworks.esrs.Create Assesment')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assessments Table */}
      {error ? (
  <p className="text-red-500">{error}</p>
) : assessments.length > 0 ? (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>{t('frameworks.esrs.Fiscal Year')}</TableHead>
        <TableHead>{t('frameworks.esrs.Framework')}</TableHead>
        <TableHead>{t('frameworks.esrs.Status')}</TableHead>
        <TableHead>{t('frameworks.esrs.Total IORs')}</TableHead>
        <TableHead>{t('frameworks.esrs.Material')}</TableHead>
        <TableHead>{t('frameworks.esrs.Not Material')}</TableHead>
        <TableHead>{t('frameworks.esrs.Under Review')}</TableHead>
        <TableHead>{t('frameworks.esrs.To Be Assessed')}</TableHead>
        <TableHead>{t('frameworks.esrs.Actions')}</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {assessments.map((assessment) => (
        <TableRow key={assessment.id}>
          <TableCell>{assessment.fyear}</TableCell>
          <TableCell>{assessment.frameworks}</TableCell>
          <TableCell><Badge className="bg-slate-500">{assessment.status}</Badge></TableCell>
          <TableCell>{assessment.total_data_points}</TableCell>
          <TableCell>{assessment.material}</TableCell>
          <TableCell>{assessment.non_material}</TableCell>
          <TableCell>{assessment.under_review}</TableCell>
          <TableCell>{assessment.to_be_assessed}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-3 border-none">...</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleViewAssessment(assessment.id)}>
                {t('frameworks.esrs.View')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setAssessmentToDelete(assessment.id);
                  setShowDeleteDialog(true);
                }}>
                  {t('frameworks.esrs.Delete')}
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
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('frameworks.esrs.Delete ESRS Assessment')}</DialogTitle>
          </DialogHeader>
          <p>{t('frameworks.esrs.Are you sure you want to delete this assessment?')}</p>
          <div className="flex justify-end mt-4 space-x-1">
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => setShowDeleteDialog(false)}
            >
             {t('frameworks.esrs.Cancel')} 
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAssessment}
              disabled={deleting}
            >
              {deleting ? t("frameworks.esrs.Deleting") :t("frameworks.esrs.Delete")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
