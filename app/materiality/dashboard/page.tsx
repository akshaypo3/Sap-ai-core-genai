import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

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
import { getAR16Items } from "@/lib/assessments/data";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dashboard } from "@/components/demo/materialityDashboardDemo";

// import Subheader from "@/components/Subheader";


export default async function Home() {
  const supabase = createClient();
  const AR16Items = await getAR16Items();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <ContentLayout title="Dashboard">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Materiality</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/dashboard/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/dashboard">Overview</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          {/* <Button variant="outline">Add new</Button> */}
        </div>
      </div>
      <Dashboard />
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <Table>
        <TableCaption>ESRS AR16</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ESRS Source</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Sub-topic</TableHead>
            <TableHead className="text-right">Sub-sub-topic</TableHead>
            <TableHead className="text-right">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AR16Items?.map((item) => (
            <TableRow>
            <TableCell className="font-medium">{item.esrs_code}</TableCell>
            <TableCell>{item.topic}</TableCell>
            <TableCell>{item.sub_topic}</TableCell>
            <TableCell className="text-right">{item.sub_sub_topic}</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
          ))};
        </TableBody>
      </Table>




      </div>
    </ContentLayout>
    </>
  );
}
