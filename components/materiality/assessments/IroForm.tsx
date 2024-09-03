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
import { SaveIroButton } from "./buttons";


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
                    <p className="text-sm">Describe how this topic has an impact on your company or how your company has an impact on the environment</p>
                    <Input type="text" name="description" placeholder=""/>
                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="materiality_type">Materiality Type</Label>
                            <p className="text-sm"><span className="font-bold">Impact materiality</span> refers to how a particular topic or issue influences the company’s impact on the economy, environment, or society. This type of materiality considers the extent to which the company's activities or decisions contribute to or alleviate broader environmental, social, or economic challenges. In this context, the significance is determined by the potential consequences of the company's actions on external stakeholders, ecosystems, or societal structures.</p>
                            <p className="text-sm mt-2 mb-2"><span className="font-bold">Financial materiality</span> is concerned with how a particular topic or issue affects the financial performance or value of the company. This includes factors that could impact the company's revenue, costs, assets, liabilities, or overall market value. The focus is on identifying issues that are significant enough to influence the financial decisions of investors, shareholders, and other financial stakeholders.</p>
                        
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
                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="impact">Impact</Label>
                            <p className="text-sm"><span className="font-bold">For Impact materiality:</span> Does this topic have a postive or negative impact?</p>
                            <p className="text-sm"><span className="font-bold">For Financial materiality:</span> Is this topic a chance or a risk.</p>
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
                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="impactstate">Impact State</Label>
                            <p className="text-sm"><span className="font-bold">For Impact materiality:</span> Is this an actual or a potential impact?</p>
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
                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="scale">Scale</Label>
                            <p className="text-sm">The "Scale" field refers to the extent or reach of the impact caused by a specific topic or issue. It evaluates how widespread the consequences of this issue are, considering both the geographical coverage (e.g., local, national, global) and the number of stakeholders or resources affected. The scale helps in understanding the magnitude of the impact, whether it affects a small group within a localized area or has broader implications across multiple regions or sectors.</p>
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

                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="scope">Scope</Label>
                            <p className="text-sm">The "Scope" field measures the breadth or range of the impact related to a specific topic or issue. It assesses how many areas of the company's operations, stakeholders, or activities are affected.</p>
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

                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="irremediability">Irremediability</Label>
                            <p className="text-sm">The "Irremediability" field evaluates the difficulty in reversing or mitigating the impact of a particular issue or topic. It considers how permanent or long-lasting the consequences are if the issue is not adequately addressed. </p>
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

                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="probability">Probability</Label>
                            <p className="text-sm">The "Probability" field assesses the likelihood that a particular event, issue, or impact will occur. It helps to gauge the risk associated with the issue based on its anticipated frequency or likelihood. </p>
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
                    
                    
                </div>
            </form>
            <div className="flex mt-5">
                        <div className="flex-auto">
                            <SaveIroButton/>                    
                        </div>
                    </div>
        </>
    )
}