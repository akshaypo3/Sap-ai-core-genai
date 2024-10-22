import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
  

export default function ReportsTable(){
    const t = useTranslations();
    return(
        <>
        <div className="mt-10 px-5 py-3 bg-white rounded-md border">
            <Table>
                <TableCaption>{t("A list of your reports in progress")}</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">FY</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Link</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">2023</TableCell>
                    <TableCell>In Progress</TableCell>
                    <Link href="/BRSR Sample Report.pdf"><TableCell><Button className="bg-yellow-500 hover:bg-yellow-600">Show progress</Button></TableCell></Link>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        </>
    )
}