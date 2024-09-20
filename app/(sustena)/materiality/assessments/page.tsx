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
import { Slash, Trash2, Pencil, Plus, ZoomIn } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAssessments, getEsrsIrosStats } from "@/lib/assessments/data";
import { AddAssessmentButton } from "@/components/materiality/buttons";
import { DeleteAssessmentButton } from "@/components/materiality/assessments/buttons";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const assessments = await getAssessments();
  
  // Fetch stats for each assessment
  const assessmentsWithStats = await Promise.all(assessments.map(async (assessment) => {
    const stats = await getEsrsIrosStats(assessment.id);
    return { ...assessment, stats };
  }));

  return (
    <ContentLayout title="Materiality Assessments">
      {/* ... (previous breadcrumb and header code remains unchanged) ... */}

      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-top">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold">Materiality Assessments</h3>
          </div>
          <div className="mt-3">
            <AddAssessmentButton/>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Fiscal Year</TableHead>
              <TableHead className="w-[100px]">Framework</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total IROs</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Not Material</TableHead>
              <TableHead>Under Review</TableHead>
              <TableHead>To Be Assessed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessmentsWithStats?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.fyear}</TableCell>
                <TableCell className="font-medium">{item.frameworks?.title || "No Framework"}</TableCell>
                <TableCell><Badge className="bg-slate-500">{item.state}</Badge></TableCell>
                <TableCell>{item.stats.total_count}</TableCell>
                <TableCell>{item.stats.material}</TableCell>
                <TableCell>{item.stats.not_material}</TableCell>
                <TableCell>{item.stats.under_review}</TableCell>
                <TableCell>{item.stats.to_be_assessed}</TableCell>
                <TableCell className="text-right">
                  <Link href={`${process.env.BASE_URL}/materiality/assessments/${item.id}`}>
                    <Button className="p-2 bg-green-500 hover:bg-green-600">
                      <span className="sr-only">View</span>
                      <ZoomIn className="w-4" />
                    </Button>
                  </Link>
                  {/* <DeleteAssessmentButton assessmentId={item.id}/> */}
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentLayout>
  );
}