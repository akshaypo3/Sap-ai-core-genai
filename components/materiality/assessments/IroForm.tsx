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
import { getTranslations } from "next-intl/server";

export default async function IroForm(iroId: any) {
    const id = iroId.id;
    let iroData = await getIroData(id);
    const iroDataString = JSON.stringify(iroData);
    const t = await getTranslations("materiality-com")

    return (
        <>
            <p className="text-xl font-bold">{iroData[0].code} / {iroData[0].topic}</p>
            <p className="text-l font-bold">{iroData[0].sub_topic}</p>
            <p className="text-sm font-bold">{iroData[0].sub_sub_topic}</p>

            <form action={saveIroEntries}>
                <div className="grid w-full items-center gap-1.5 mb-2 mt-3">
                    <input type="hidden" name="iro_id" value={id} />
                    <input type="hidden" name="assessment_id" value={iroData[0].assessment_id} />
                    <Label htmlFor="iro_description">{t("assessment.Description")}</Label>
                    <p className="text-sm">{t("assessment.Describe how this topic has an impact on your company or how your company has an impact on the environment")}</p>
                    <Input type="text" name="iro_description" defaultValue={iroData[0].iro_description || ''} placeholder="" />

                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="materiality_type">{t("assessment.Materiality Type")}</Label>
                            <p className="text-sm"><span className="font-bold">{t("assessment.Impact materiality")}</span>{t("assessment.refers to how a particular topic or issue influences the company's impact on the economy, environment, or society_This type of materiality considers the extent to which the company's activities or decisions contribute to or alleviate broader environmental, social, or economic challenges_In this context, the significance is determined by the potential consequences of the company's actions on external stakeholders, ecosystems, or societal structures")}</p>
                            <p className="text-sm mt-2 mb-2"><span className="font-bold">{t("assessment.Financial materiality")}</span>{t("assessment.is concerned with how a particular topic or issue affects the financial performance or value of the company_This includes factors that could impact the company's revenue, costs, assets, liabilities, or overall market value_The focus is on identifying issues that are significant enough to influence the financial decisions of investors, shareholders, and other financial stakeholders")}</p>

                            <Select name="materiality_type" defaultValue={iroData[0].materiality_type || ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("assessment.Impact Materiality")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="impact">{t("assessment.Impact")}</SelectItem>
                                    <SelectItem value="financial">{t("assessment.Financial")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="impact">{t("assessment.Impact")}</Label>
                            <p className="text-sm"><span className="font-bold">{t("assessment.For Impact materiality:")}</span> {t("assessment.Does this topic have a positive or negative impact?")}</p>
                            <p className="text-sm"><span className="font-bold">{t("assessment.For Financial materiality:")}</span> {t("assessment.Is this topic a chance or a risk")}</p>
                            <Select name="impact" defaultValue={iroData[0].impact || ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("assessment.Impact")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="positive">{t("assessment.Positive")}</SelectItem>
                                    <SelectItem value="negative">{t("assessment.Negative")}</SelectItem>
                                    <SelectItem value="chance">{t("assessment.Chance")}</SelectItem>
                                    <SelectItem value="risk">{t("assessment.Risk")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {iroData[0].materiality_type === 'impact' && (
                        <div className="w-full pt-5">
                            <div>
                                <Label htmlFor="impact_state">{t("assessment.Impact State")}</Label>
                                <p className="text-sm"><span className="font-bold">{t("assessment.For Impact materiality:")}</span> {t("assessment.Is this an actual or a potential impact?")}</p>
                                <Select name="impact_state" defaultValue={iroData[0].impact_state || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("assessment.Actual Impact")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="actual">{t("assessment.Actual Impact")}</SelectItem>
                                        <SelectItem value="potential">{t("assessment.Potential Impact")}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    <div className="w-full pt-5">
                        <div>
                            <Label htmlFor="scale_score">{t("assessment.Scale")}</Label>
                            <p className="text-sm">{t("assessment.The \"Scale\" field refers to the extent or reach of the impact caused by a specific topic or issue_It evaluates how widespread the consequences of this issue are, considering both the geographical coverage (e_g_, local, national, global) and the number of stakeholders or resources affected_The scale helps in understanding the magnitude of the impact, whether it affects a small group within a localized area or has broader implications across multiple regions or sectors")}</p>
                            <Select name="scale_score" defaultValue={iroData[0].scale_score?.toString() || ''}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t("assessment.Medium")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">{t("assessment.Very Low")}</SelectItem>
                                    <SelectItem value="2">{t("assessment.Low")}</SelectItem>
                                    <SelectItem value="3">{t("assessment.Medium")}</SelectItem>
                                    <SelectItem value="4">{t("assessment.High")}</SelectItem>
                                    <SelectItem value="5">{t("assessment.Very High")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Label htmlFor="scale_reason">{t("assessment.Reason for scale")}</Label>
                        <Input type="text" name="scale_reason" defaultValue={iroData[0].scale_reason || ''} placeholder="" />
                    </div>

                    {iroData[0].impact_state && (
                        <div className="w-full pt-5">
                            <div>
                                <Label htmlFor="scope_score">{t("assessment.Scope")}</Label>
                                <p className="text-sm">{t("assessment.The \"Scope\" field measures the breadth or range of the impact related to a specific topic or issue_It assesses how many areas of the company's operations, stakeholders, or activities are affected")}</p>
                                <Select name="scope_score" defaultValue={iroData[0].scope_score?.toString() || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("assessment.Limited")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">{t("assessment.Limited")}</SelectItem>
                                        <SelectItem value="2">{t("assessment.Moderate")}</SelectItem>
                                        <SelectItem value="3">{t("assessment.Extended")}</SelectItem>
                                        <SelectItem value="4">{t("assessment.Far-reaching")}</SelectItem>
                                        <SelectItem value="5">{t("assessment.Global")}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Label htmlFor="scope_reason">{t("assessment.Reason for scope")}</Label>
                            <Input type="text" name="scope_reason" defaultValue={iroData[0].scope_reason || ''} placeholder="" />
                        </div>
                    )}

                    {iroData[0].impact === 'negative' && (
                        <div className="w-full pt-5">
                            <div>
                                <Label htmlFor="irremediability_score">{t("assessment.Irremediability")}</Label>
                                <p className="text-sm">{t("assessment.The \"Irremediability\" field evaluates the difficulty in reversing or mitigating the impact of a particular issue or topic_It considers how permanent or long-lasting the consequences are if the issue is not adequately addressed")} </p>
                                <Select name="irremediability_score" defaultValue={iroData[0].irremediability_score?.toString() || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("assessment.Easy")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">{t("assessment.Relatively easy / short-term")}</SelectItem>
                                        <SelectItem value="2">{t("assessment.Moderately difficult / medium-term")}</SelectItem>
                                        <SelectItem value="3">{t("assessment.Difficult / long-term")}</SelectItem>
                                        <SelectItem value="4">{t("assessment.Very severe")}</SelectItem>
                                        <SelectItem value="5">{t("assessment.Irreversible")}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Label htmlFor="irremediability_reason">{t("assessment.Reason for irremediability")}</Label>
                            <Input type="text" name="irremediability_reason" defaultValue={iroData[0].irremediability_reason || ''} placeholder="" />
                        </div>
                    )}

                    {iroData[0].impact_state === 'potential' && (
                        <div className="w-full pt-5">
                            <div>
                                <Label htmlFor="probability_score">{t("assessment.Probability")}</Label>
                                <p className="text-sm">{t("assessment.The \"Probability\" field assesses the likelihood that a particular event, issue, or impact will occur_It helps to gauge the risk associated with the issue based on its anticipated frequency or likelihood")} </p>
                                <Select name="probability_score" defaultValue={iroData[0].probability_score?.toString() || ''}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("assessment.Easy")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0.75">{t("assessment.Unlikely")}</SelectItem>
                                        <SelectItem value="0.85">{t("assessment.Likely")}</SelectItem>
                                        <SelectItem value="0.90">{t("assessment.Very likely")}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Label htmlFor="probability_reason">{t("assessment.Reason for probability")}</Label>
                            <Input type="text" name={t("assessment.probability_reason")} defaultValue={iroData[0].probability_reason || ''} placeholder="" />
                        </div>
                    )}

                    <div className="flex pt-5">
                        <Button type="submit" className="bg-green-500 hover:bg-green-600">{t("assessment.Save")}</Button>
                    </div>
                </div>
            </form>
        </>
    )
}