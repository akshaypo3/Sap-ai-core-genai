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
import { Slash, Trash2,Pencil } from "lucide-react"
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
import { getStakeholders, getStakeholderGroups } from "@/lib/stakeholders/data";
import { AddStakeholderButton, AddStakeholderGroupButton } from "@/components/materiality/stakeholderanalysis/buttons";

export default async function Home() {
  const supabase = createClient();

  const stakeholders = await getStakeholders();
  const stakeholderGroups = await getStakeholderGroups();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <ContentLayout title="Materiality Assessments">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Stakeholder Analysis for 2024</h1>
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
                    <BreadcrumbLink href="/materiality/stakeholders">Stakeholders</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          <AddStakeholderButton/>
          <Button>Group Editor</Button>
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Identified Stakeholders
              </CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                -4 from last year
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Stakeholder Groups engaged
              </CardTitle>
              {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                -1 from last year
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Survey Completion Rate</CardTitle>
              {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">
                -100% from last year
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Survey Response Rate</CardTitle>
              {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">
                -0% from last year
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
        <Button className="bg-green-600 mb-5">Add stakeholder</Button>
      <Table>
        <TableCaption>Stakeholders List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Inluence</TableHead>
            <TableHead>Knowledge</TableHead>
            <TableHead>Relevance</TableHead>
            <TableHead>Actions</TableHead>
            {/* <TableHead>Survey</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {stakeholders?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                {Array.isArray(item.stakeholder_groups) ? item.stakeholder_groups[0].group : item.stakeholder_groups.group}
              </TableCell>
              <TableCell><Badge className="bg-green-700">high</Badge></TableCell>
              <TableCell><Badge className="bg-green-700">high</Badge></TableCell>
              <TableCell><Badge className="bg-yellow-500">medium</Badge></TableCell>
              <TableCell><Badge className="bg-green-700">high</Badge></TableCell>
              <TableCell>
                <button className="rounded-md border p-2 hover:bg-gray-100">
                  <span className="sr-only">Edit</span>
                  <Pencil className="w-4" />
                </button> 
                <button className="rounded-md border p-2 hover:bg-gray-100 ml-1">
                  <span className="sr-only">Delete</span>
                  <Trash2 className="w-4" />
                </button>
              </TableCell>
              {/* <TableCell><Badge variant="secondary">Started</Badge></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
        {/* <Button className="bg-green-600 mb-5">Add Group</Button> */}
        <AddStakeholderGroupButton/>
      <Table>
        <TableCaption>Stakeholder Groups</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stakeholderGroups?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.group}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>


    </ContentLayout>
    </>
  );
}
