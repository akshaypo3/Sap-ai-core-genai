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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
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
import { getIroData } from "@/lib/assessments/data";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";


export default async function IroForm(iroId:any){
    const id = iroId.id;
    console.log(id);
    let iroData = await getIroData(id);
    const iroDataString = JSON.stringify(iroData);
    console.log(iroDataString);

    return(
        <>
        {/* <p className="text-xs">DEBUG: {iroDataString}</p><br/> */}
        <p className="text-xl font-bold">{iroData[0].code} / {iroData[0].topic}</p>
        <p className="text-l font-bold">{iroData[0].sub_topic}</p>
        <p className="text-sm font-bold">{iroData[0].sub_sub_topic}</p>

        <form>
                <div className="grid w-full items-center gap-1.5 mb-2 mt-3">
                    <Label htmlFor="description">Description</Label>
                    <Input type="text" name="description" placeholder=""/>
                    <div className="w-full pt-2">
                        <div>
                            <Label htmlFor="materiality_type">Materiality Type</Label>
                            <Select name="materiality_type">
                                <SelectTrigger>
                                    <SelectValue placeholder="Impact Materiality"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="impact">Impact</SelectItem>
                                        <SelectItem value="financial">Financial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="w-full pt-2">
                        <div>
                            <Label htmlFor="impact">Impact</Label>
                            <Select name="impact">
                                <SelectTrigger>
                                    <SelectValue placeholder="Impact"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="positive">Positive</SelectItem>
                                        <SelectItem value="negative">Negative</SelectItem>
                                        <SelectItem value="chance">Chance</SelectItem>
                                        <SelectItem value="risk">Risk</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="w-full pt-2">
                        <div>
                            <Label htmlFor="impactstate">Impact State</Label>
                            <Select name="impactstate">
                                <SelectTrigger>
                                    <SelectValue placeholder="Actual Impact"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="actualimpact">Actual Impact</SelectItem>
                                        <SelectItem value="potentialimpact">Potential Impact</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="w-full pt-2">
                        <div>
                            <Label htmlFor="scale">Scale</Label>
                            <Select name="scale">
                                <SelectTrigger>
                                    <SelectValue placeholder="Medium"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="verylow">Very Low</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="veryhigh">Very High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Label htmlFor="scalereason">Reason for scale</Label>
                      <Input type="text" name="scalereason" placeholder=""/>
                    </div>

                    <div className="w-full pt-2">
                        <div>
                            <Label htmlFor="scope">Scope</Label>
                            <Select name="scope">
                                <SelectTrigger>
                                    <SelectValue placeholder="Limited"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="limited">Limited</SelectItem>
                                        <SelectItem value="far">Far</SelectItem>
                                        <SelectItem value="globally">Globally</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Label htmlFor="scopereason">Reason for scope</Label>
                      <Input type="text" name="scopereason" placeholder=""/>
                    </div>     

                    <div className="w-full pt-2">
                        <div>
                            <Label htmlFor="irremediability">Irremediability</Label>
                            <Select name="irremediability">
                                <SelectTrigger>
                                    <SelectValue placeholder="Easy"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="easy">Easy</SelectItem>
                                        <SelectItem value="severe">Severe</SelectItem>
                                        <SelectItem value="irreversible">Irreversible</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Label htmlFor="irremediabilityreason">Reason for irremediability</Label>
                      <Input type="text" name="irremediabilityreason" placeholder=""/>
                    </div>

                    <div className="w-full pt-2">
                        <div>
                            <Label htmlFor="probability">Probability</Label>
                            <Select name="probability">
                                <SelectTrigger>
                                    <SelectValue placeholder="Easy"/>
                                </SelectTrigger>
                                <SelectContent>
                                        <SelectItem value="unlikely">Unlikely</SelectItem>
                                        <SelectItem value="ratherunlikely">Rather unlikely</SelectItem>
                                        <SelectItem value="likely">Likely</SelectItem>
                                        <SelectItem value="verylikely">Very Likely</SelectItem>
                                        <SelectItem value="inevitable">Inevitable</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Label htmlFor="probabilityreason">Reason for probability</Label>
                      <Input type="text" name="probabilityreason" placeholder=""/>
                    </div>                                             
                    
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <Button className="w-full" type="submit">
                                Save
                            </Button>                       
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}