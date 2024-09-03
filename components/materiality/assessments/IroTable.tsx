"use server"
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
import { Badge } from "@/components/ui/badge";


export default async function IroTable(assessmentid:any){
    const id = assessmentid.id;
    console.log(id);
    const assessmentData = await getAssessmentData(id);

    return(
        <>
        <Table>
        <TableCaption>Topics</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ESRS Source</TableHead>
            {/* <TableHead className="w-[100px]">ESRS ID</TableHead> */}
            <TableHead>Topic</TableHead>
            <TableHead>Sub-topic</TableHead>
            <TableHead className="text-right">Sub-sub-topic</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessmentData?.map((item) => (
            <TableRow key={item.id}>
            <TableCell className="font-medium">{item.code}</TableCell>
            {/* <TableCell>{item.esrs_id}</TableCell> */}
            <TableCell>{item.topic}</TableCell>
            <TableCell>{item.sub_topic}</TableCell>
            <TableCell className="text-right">{item.sub_sub_topic}</TableCell>
            <TableHead className="text-right">New</TableHead>
            <TableCell className="text-right"><a href={process.env.BASE_URL+"/materiality/assessments/"+id+"/"+item.id}><Button className="text-xs px-2 py-1 bg-green-500 hover:bg-green-600">Bearbeiten</Button></a></TableCell>
          </TableRow>
          ))};
        </TableBody>
      </Table>
        </>
    )
}