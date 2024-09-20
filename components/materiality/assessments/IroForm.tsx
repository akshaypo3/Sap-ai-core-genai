"use server"
import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getIroData } from "@/lib/assessments/data";
import { saveIroEntries } from "@/lib/assessments/action";

export default async function IroForm(iroId: any) {
    const id = iroId.id;
    let iroData = await getIroData(id);
    const iroDataString = JSON.stringify(iroData);

    return (
        <>
            <p className="text-xl font-bold">{iroData[0].code} / {iroData[0].topic}</p>
            <p className="text-l font-bold">{iroData[0].sub_topic}</p>
            <p className="text-sm font-bold">{iroData[0].sub_sub_topic}</p>

            <form action={saveIroEntries}>
                <div className="grid w-full items-center gap-1.5 mb-2 mt-3">
                    <input type="hidden" name="iro_id" value={id} />
                    <input type="hidden" name="assessment_id" value={iroData[0].assessment_id} />
                    <Label htmlFor="iro_description">Description</Label>
                    <p className="text-sm">Describe how this topic has an impact on your company or how your company has an impact on the environment</p>
                    <Input type="text" name="iro_description" defaultValue={iroData[0].iro_description || ''} placeholder="" />

                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="materiality_type">Materiality Type</Label>
                            <p className="text-sm"><span className="font-bold">Impact materiality</span> refers to how a particular topic or issue influences the company's impact on the economy, environment, or society. This type of materiality considers the extent to which the company's activities or decisions contribute to or alleviate broader environmental, social, or economic challenges. In this context, the significance is determined by the potential consequences of the company's actions on external stakeholders, ecosystems, or societal structures.</p>
                            <p className="text-sm mt-2 mb-2"><span className="font-bold">Financial materiality</span> is concerned with how a particular topic or issue affects the financial performance or value of the company. This includes factors that could impact the company's revenue, costs, assets, liabilities, or overall market value. The focus is on identifying issues that are significant enough to influence the financial decisions of investors, shareholders, and other financial stakeholders.</p>

                            <Select name="materiality_type" defaultValue={iroData[0].materiality_type || ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Impact Materiality" />
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
                            <p className="text-sm"><span className="font-bold">For Impact materiality:</span> Does this topic have a positive or negative impact?</p>
                            <p className="text-sm"><span className="font-bold">For Financial materiality:</span> Is this topic a chance or a risk.</p>
                            <Select name="impact" defaultValue={iroData[0].impact || ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Impact" />
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

                    {iroData[0].materiality_type === 'impact' && (
                        <div className="w-full pt-5">
                            <div>
                                <Label htmlFor="impact_state">Impact State</Label>
                                <p className="text-sm"><span className="font-bold">For Impact materiality:</span> Is this an actual or a potential impact?</p>
                                <Select name="impact_state" defaultValue={iroData[0].impact_state || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Actual Impact" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="actual">Actual Impact</SelectItem>
                                        <SelectItem value="potential">Potential Impact</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="scale_score">Scale</Label>
                            <p className="text-sm">The "Scale" field refers to the extent or reach of the impact caused by a specific topic or issue. It evaluates how widespread the consequences of this issue are, considering both the geographical coverage (e.g., local, national, global) and the number of stakeholders or resources affected. The scale helps in understanding the magnitude of the impact, whether it affects a small group within a localized area or has broader implications across multiple regions or sectors.</p>
                            <Select name="scale_score" defaultValue={iroData[0].scale_score?.toString() || ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Medium" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Very Low</SelectItem>
                                    <SelectItem value="2">Low</SelectItem>
                                    <SelectItem value="3">Medium</SelectItem>
                                    <SelectItem value="4">High</SelectItem>
                                    <SelectItem value="5">Very High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Label htmlFor="scale_reason">Reason for scale</Label>
                        <Input type="text" name="scale_reason" defaultValue={iroData[0].scale_reason || ''} placeholder="" />
                    </div>

                    {iroData[0].impact_state && (
                        <div className="w-full pt-5">
                            <div>
                                <Label htmlFor="scope_score">Scope</Label>
                                <p className="text-sm">The "Scope" field measures the breadth or range of the impact related to a specific topic or issue. It assesses how many areas of the company's operations, stakeholders, or activities are affected.</p>
                                <Select name="scope_score" defaultValue={iroData[0].scope_score?.toString() || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Limited" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Limited</SelectItem>
                                        <SelectItem value="2">Moderate</SelectItem>
                                        <SelectItem value="3">Extended</SelectItem>
                                        <SelectItem value="4">Far-reaching</SelectItem>
                                        <SelectItem value="5">Global</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Label htmlFor="scope_reason">Reason for scope</Label>
                            <Input type="text" name="scope_reason" defaultValue={iroData[0].scope_reason || ''} placeholder="" />
                        </div>
                    )}

                    {iroData[0].impact === 'negative' && (
                        <div className="w-full pt-5">
                            <div>
                                <Label htmlFor="irremediability_score">Irremediability</Label>
                                <p className="text-sm">The "Irremediability" field evaluates the difficulty in reversing or mitigating the impact of a particular issue or topic. It considers how permanent or long-lasting the consequences are if the issue is not adequately addressed. </p>
                                <Select name="irremediability_score" defaultValue={iroData[0].irremediability_score?.toString() || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Easy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Relatively easy / short-term</SelectItem>
                                        <SelectItem value="2">Moderately difficult / medium-term</SelectItem>
                                        <SelectItem value="3">Difficult / long-term</SelectItem>
                                        <SelectItem value="4">Very severe</SelectItem>
                                        <SelectItem value="5">Irreversible</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Label htmlFor="irremediability_reason">Reason for irremediability</Label>
                            <Input type="text" name="irremediability_reason" defaultValue={iroData[0].irremediability_reason || ''} placeholder="" />
                        </div>
                    )}

                    {iroData[0].impact_state === 'potential' && (
                        <div className="w-full pt-5">
                            <div>
                                <Label htmlFor="probability_score">Probability</Label>
                                <p className="text-sm">The "Probability" field assesses the likelihood that a particular event, issue, or impact will occur. It helps to gauge the risk associated with the issue based on its anticipated frequency or likelihood. </p>
                                <Select name="probability_score" defaultValue={iroData[0].probability_score?.toString() || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Easy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0.75">Unlikely</SelectItem>
                                        <SelectItem value="0.85">Likely</SelectItem>
                                        <SelectItem value="0.90">Very likely</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Label htmlFor="probability_reason">Reason for probability</Label>
                            <Input type="text" name="probability_reason" defaultValue={iroData[0].probability_reason || ''} placeholder="" />
                        </div>
                    )}

                    <div className="flex pt-5">
                        <Button type="submit" className="bg-green-500 hover:bg-green-600">Save</Button>
                    </div>
                </div>
            </form>
        </>
    )
}