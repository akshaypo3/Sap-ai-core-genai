"use client";

import { useTransition } from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { CdpDeleteAssessmentDialog } from "./CdpDeleteAssessmentDialog";

export function CdpAssessmentsActionsMenu({
  id,
  step,
}: {
  id: string;
  step: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const t = useTranslations("reporting-com")
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="px-3 border-none">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{t("cdp.Actions")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={`/reporting/frameworks/cdp/${id}/${step}`}
              className="hover:cursor-pointer"
            >
              {t("cdp.View")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="hover:cursor-pointer"
          >
            {t("cdp.Delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CdpDeleteAssessmentDialog
        assessmentId={id}
        isOpen={showDeleteDialog}
        setIsOpen={setShowDeleteDialog}
      />
    </>
  );
}
