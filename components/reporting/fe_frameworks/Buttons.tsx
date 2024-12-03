"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateActiveAssessmentForm from "./ActiveAssessmentForm";
import { useState } from "react";

export function ActiveFrameworkAssessmentButton({
  framework,
  frameworkId,
}: {
  framework: string;
  frameworkId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Create Assessment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Assessment</DialogTitle>
          <DialogDescription>
            New Assessment function description
          </DialogDescription>
        </DialogHeader>
        <CreateActiveAssessmentForm
          open={open}
          setOpen={setOpen}
          framework={framework}
          frameworkId={frameworkId}
        />
      </DialogContent>
    </Dialog>
  );
}
