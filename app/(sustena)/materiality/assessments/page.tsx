import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
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
import { Slash, Trash2,Pencil,Plus } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import Subheader from "@/components/Subheader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAssessments } from "@/lib/assessments/data";
import { AddAssessmentButton } from "@/components/materiality/buttons";


export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const assessments = await getAssessments();

  return (
    <>
      <ContentLayout title="Materiality Assessments">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Materiality Assessments</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/dashboard/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/dashboard">Materiality</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/assessments">Assessments</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          {/* <Button variant="outline">Add new</Button> */}
        </div>
      </div>

      {/* <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Latest Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2024</div>
              <p className="text-xs text-muted-foreground">
                
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Assessments finished
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Due Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Assessment time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85 min</div>
              <p className="text-xs text-muted-foreground">
                +0% from last year
              </p>
            </CardContent>
          </Card>
        </div>
      </div> */}


      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <h1 className="font-bold p-3">Assessments</h1>
      <Table>
        {/* <TableCaption>Stakeholders List</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Fiscal Year</TableHead>
            <TableHead className="w-[100px]">Framework</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Report Download</TableHead>
            <TableHead>Actions</TableHead>
            {/* <TableHead>Survey</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium"><a href={process.env.BASE_URL+"/materiality/assessments/"+item.id}>{item.fyear}</a></TableCell>
              <TableCell className="font-medium">{item.frameworks?.title || "No Framework"}</TableCell>
              <TableCell><Badge className="bg-slate-500">{item.state}</Badge></TableCell>
              <TableCell><Badge variant="destructive">Not finished</Badge></TableCell>
              <TableCell>
                <button className="rounded-md border p-2 hover:bg-gray-100">
                  <span className="sr-only">Edit</span>
                  <Pencil className="w-4" />
                </button> 
              </TableCell>
              {/* <TableCell><Badge variant="secondary">Started</Badge></TableCell> */}
            </TableRow>
            ))}
        </TableBody>
      </Table>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
        <div className="flex items-center">
          {/* <span className="hover:font-medium">New assessment</span> */}
          <AddAssessmentButton/>
        </div>
      </div>
    </ContentLayout>
    </>
  );
}
