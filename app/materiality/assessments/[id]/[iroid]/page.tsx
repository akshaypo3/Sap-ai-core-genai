import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Slash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAssessmentData } from "@/lib/assessments/data";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dashboard } from "@/components/demo/materialityDashboardDemo";
import { Badge } from "@/components/ui/badge";
import IroForm from "@/components/materiality/assessments/IroForm";

// import Subheader from "@/components/Subheader";


export default function Home({ params }: { params: { iroid: string } }) {
  // const searchParams = useSearchParams();
  // const assessmentid = searchParams.get('id');

  const { iroid } = params;
  console.log("IroId: "+iroid);

  return (
    <>
      <ContentLayout title="Dashboard">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Materiality</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/dashboard/">Assessment</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/dashboard">2024</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          {/* <Button variant="outline">Add new</Button> */}
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <IroForm id={iroid}/>
      </div>
    </ContentLayout>
    </>
  );
}
