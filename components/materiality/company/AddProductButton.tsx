"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import AddLocationForm from "@/components/materiality/company/AddLocationForm";
  import AddLocationFormAssessment from "@/components/materiality/assessments/AddLocationFormAssessment";
  import AddProductForm from "@/components/materiality/company/AddProductForm";
  import { deleteCompanyLocationWithId } from "@/lib/company/action";
import AddLocationIROForm from "./AddLocationIROForm";
import AddProductIROForm from "./AddProductIROForm";
import { useTranslations } from "next-intl";
import React from 'react';

export function AddProductButton(){
    const [open, setOpen] = React.useState(false);
      return (
          <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger><Button>Add Product/Service</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product/Service</DialogTitle>
            <DialogDescription>
              Add the products and services accounting for 90% of the turnover
            </DialogDescription>
          </DialogHeader>
          <AddProductForm open={open}  setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
          
      )
  }