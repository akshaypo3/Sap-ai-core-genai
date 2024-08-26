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
import { AddStakeholderButton, AddStakeholderGroupButton, DeleteStakeholderButton } from "@/components/materiality/stakeholders/buttons";
import StakeholderMatrix from "@/components/materiality/stakeholders/StakeholderMatrix";

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

  const getBadgeProps = (score, isRelevance = false) => {
    if (isRelevance) {
      // Logic for relevance score (1-6)
      if (score >= 1 && score <= 2) {
        return { label: "Low", color: "bg-green-300" };
      } else if (score >= 3 && score <= 4) {
        return { label: "Medium", color: "bg-green-500" };
      } else if (score >= 5 && score <= 6) {
        return { label: "High", color: "bg-green-700" };
      }
    } else {
      // Logic for interest, influence, and knowledge scores (1-3)
      switch (score) {
        case 1:
          return { label: "Low", color: "bg-green-300" };
        case 2:
          return { label: "Medium", color: "bg-green-500" };
        case 3:
          return { label: "High", color: "bg-green-700" };
        default:
          return { label: "Unknown", color: "bg-gray-500" };
      }
    }
  };

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
          {/* <AddStakeholderButton/> */}
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
              {/* <p className="text-xs text-muted-foreground">
                -4 from last year
              </p> */}
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
              {/* <p className="text-xs text-muted-foreground">
                -1 from last year
              </p> */}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Survey Completion Rate</CardTitle>
              {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              {/* <p className="text-xs text-muted-foreground">
                -100% from last year
              </p> */}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Survey Response Rate</CardTitle>
              {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              {/* <p className="text-xs text-muted-foreground">
                -0% from last year
              </p> */}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
        <AddStakeholderButton/>
      <Table>
        <TableCaption>Stakeholders List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Inluence</TableHead>
            <TableHead>Relevance</TableHead>
            <TableHead>Knowledge</TableHead>
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
                {Array.isArray(item.stakeholder_groups)
                  ? item.stakeholder_groups[0].group
                  : item.stakeholder_groups.group}
              </TableCell>
              <TableCell>
                <Badge className={getBadgeProps(item.interest_score).color}>
                  {getBadgeProps(item.interest_score).label}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getBadgeProps(item.influence_score).color}>
                  {getBadgeProps(item.influence_score).label}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getBadgeProps(item.relevance_score, true).color}>
                  {getBadgeProps(item.relevance_score, true).label}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getBadgeProps(item.knowledge_score).color}>
                  {getBadgeProps(item.knowledge_score).label}
                </Badge>
              </TableCell>
              <TableCell>
                <DeleteStakeholderButton id={item.id}/>
              </TableCell>
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
      <StakeholderMatrix/>


    </ContentLayout>
    </>
  );
}
