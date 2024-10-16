"use client"

// import { PlusIcon, TrashIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';






export function MoveOnButton() {
  const t = useTranslations("reporting-com")
  return (
    <Button className="p-2 bg-green-500 hover:bg-green-600" asChild>
          <Link href={'/reporting/frameworks/esrs/s1/s1-59'}>
            {t("Move on smart")}
          </Link>
      </Button>
  );
}

export function MoveOnButton2() {
  return (
    <Button variant="outline" className="p-2 bg-slate-500 hover:bg-slate-600 ml-2" asChild>
          <Link href={'/reporting/frameworks/esrs/s1/s1-44'}>
            {t("Move on manually")}
          </Link>
      </Button>
  );
}
