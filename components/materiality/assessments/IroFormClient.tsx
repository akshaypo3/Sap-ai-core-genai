"use client"

import React, { useState } from "react";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { saveIroEntries } from "@/lib/assessments/action";
import { useTranslations } from "next-intl";

export default function IroFormClient({ initialData, id, stakeholders }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const t = useTranslations("materiality-com")

  return (
    <div className="">
      <Card className="rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{formData.code} / {formData.topic}</CardTitle>
          <p className="text-l font-semibold">{formData.sub_topic}</p>
          <p className="text-sm text-gray-500">{formData.sub_sub_topic}</p>
        </CardHeader>
        <CardContent>
          <form action={saveIroEntries} className="space-y-6">
            <input type="hidden" name="iro_id" value={id} />
            <input type="hidden" name="assessment_id" value={formData.assessment_id} />
            {/* Stakeholders Section */}
            {/* <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Assigned Stakeholders</h3>
              <Select 
                name="stakeholders" 
                value={formData.stakeholders?.map(s => s.id) || []}
                onValueChange={(value) => handleChange('stakeholders', value.map(id => stakeholders.find(s => s.id === id)))}
                multiple
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Stakeholders" />
                </SelectTrigger>
                <SelectContent>
                  {stakeholders.map((stakeholder) => (
                    <SelectItem key={stakeholder.id} value={stakeholder.id}>
                      {stakeholder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.stakeholders && formData.stakeholders.map((stakeholder) => (
                  <Badge key={stakeholder.id} variant="secondary">
                    {stakeholder.name}
                  </Badge>
                ))}
              </div>
            </div> */}

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Label htmlFor="iro_description">{t("Description")}</Label>
                <p className="text-sm text-gray-500 mb-2">{t("Describe how this topic has an impact on your company or how your company has an impact on the environment")}</p>
                <Input 
                  type="text" 
                  name="iro_description" 
                  value={formData.iro_description || ''} 
                  onChange={(e) => handleChange('iro_description', e.target.value)}
                  placeholder="" 
                  className="w-full"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <Label htmlFor="materiality_type">{t("Materiality Type")}</Label>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-bold">{t("Impact materiality")}</span> {t("refers to how a particular topic or issue influences the company's impact on the economy, environment, or society.")} 
                  <span className="font-bold">{t("Financial materiality")}</span> {t("is concerned with how a particular topic or issue affects the financial performance or value of the company.")}
                </p>
                <Select 
                  name="materiality_type" 
                  value={formData.materiality_type || ''}
                  onValueChange={(value) => handleChange('materiality_type', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("Impact Materiality")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="impact">{t("Impact")}</SelectItem>
                    <SelectItem value="financial">{t("Financial")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <Label htmlFor="impact">{t("Impact")}</Label>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-bold">"{t("For Impact materiality:")}"</span> {t("Does this topic have a positive or negative impact?")}
                  <span className="font-bold">{t("For Financial materiality:")}</span> {t("Is this topic a chance or a risk.")}
                </p>
                <Select 
                  name="impact" 
                  value={formData.impact || ''}
                  onValueChange={(value) => handleChange('impact', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("Impact")} />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.materiality_type === 'impact' ? (
                      <>
                        <SelectItem value="positive">{t("Positive")}</SelectItem>
                        <SelectItem value="negative">{t("Negative")}</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="chance">{t("Chance")}</SelectItem>
                        <SelectItem value="risk">{t("Risk")}</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {formData.materiality_type === 'impact' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label htmlFor="impact_state">{t("Impact State")}</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-bold">{t("For Impact materiality:")}</span> {t("Is this an actual or a potential impact?")}
                  </p>
                  <Select 
                    name="impact_state" 
                    value={formData.impact_state || ''}
                    onValueChange={(value) => handleChange('impact_state', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("Actual Impact")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="actual">{t("Actual Impact")}</SelectItem>
                      <SelectItem value="potential">{t("Potential Impact")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <Label htmlFor="scale_score">{t("Scale")}</Label>
                <p className="text-sm text-gray-500 mb-2">{t("The \"Scale\" field refers to the extent or reach of the impact caused by a specific topic or issue...")}</p>
                <Select 
                  name="scale_score" 
                  value={formData.scale_score?.toString() || ''}
                  onValueChange={(value) => handleChange('scale_score', parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("Medium")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">{t("Very Low")}</SelectItem>
                    <SelectItem value="2">{t("Low")}</SelectItem>
                    <SelectItem value="3">{t("Medium")}</SelectItem>
                    <SelectItem value="4">{t("High")}</SelectItem>
                    <SelectItem value="5">{t("Very High")}</SelectItem>
                  </SelectContent>
                </Select>
                <Label htmlFor="scale_reason" className="mt-2">{t("Reason for scale")}</Label>
                <Input 
                  type="text" 
                  name="scale_reason" 
                  value={formData.scale_reason || ''} 
                  onChange={(e) => handleChange('scale_reason', e.target.value)}
                  placeholder="" 
                  className="w-full mt-1"
                />
              </div>

              {formData.impact_state && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label htmlFor="scope_score">{t("Scope")}</Label>
                  <p className="text-sm text-gray-500 mb-2">T{t("The \"Scope\" field measures the breadth or range of the impact related to a specific topic or issue...")}</p>
                  <Select 
                    name="scope_score" 
                    value={formData.scope_score?.toString() || ''}
                    onValueChange={(value) => handleChange('scope_score', parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("Limited")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{t("Limited")}</SelectItem>
                      <SelectItem value="2">{t("Moderate")}</SelectItem>
                      <SelectItem value="3">{t("Extended")}</SelectItem>
                      <SelectItem value="4">{t("Far-reaching")}</SelectItem>
                      <SelectItem value="5">{t("Global")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label htmlFor="scope_reason" className="mt-2">{t("Reason for scope")}</Label>
                  <Input 
                    type="text" 
                    name="scope_reason" 
                    value={formData.scope_reason || ''} 
                    onChange={(e) => handleChange('scope_reason', e.target.value)}
                    placeholder="" 
                    className="w-full mt-1"
                  />
                </div>
              )}

              {formData.impact === 'negative' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label htmlFor="irremediability_score">{t("Irremediability")}</Label>
                  <p className="text-sm text-gray-500 mb-2">{t("The \"Irremediability\" field evaluates the difficulty in reversing or mitigating the impact of a particular issue or topic...")}</p>
                  <Select 
                    name="irremediability_score" 
                    value={formData.irremediability_score?.toString() || ''}
                    onValueChange={(value) => handleChange('irremediability_score', parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("Easy")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{t("Relatively easy / short-term")}</SelectItem>
                      <SelectItem value="2">{t("Moderately difficult / medium-term")}</SelectItem>
                      <SelectItem value="3">{t("Difficult / long-term")}</SelectItem>
                      <SelectItem value="4">{t("Very severe")}</SelectItem>
                      <SelectItem value="5">{t("Irreversible")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label htmlFor="irremediability_reason" className="mt-2">{t("Reason for irremediability")}</Label>
                  <Input 
                    type="text" 
                    name="irremediability_reason" 
                    value={formData.irremediability_reason || ''} 
                    onChange={(e) => handleChange('irremediability_reason', e.target.value)}
                    placeholder="" 
                    className="w-full mt-1"
                  />
                </div>
              )}

              {formData.impact_state === 'potential' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label htmlFor="probability_score">{t("Probability")}</Label>
                  <p className="text-sm text-gray-500 mb-2">{t("The \"Probability\" field assesses the likelihood that a particular event, issue, or impact will occur...")}</p>
                  <Select 
                    name="probability_score" 
                    value={formData.probability_score?.toString() || ''}
                    onValueChange={(value) => handleChange('probability_score', parseFloat(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("Easy")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.75">{t("Unlikely")}</SelectItem>
                      <SelectItem value="0.85">{t("Likely")}</SelectItem>
                      <SelectItem value="0.90">{t("Very likely")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label htmlFor="probability_reason" className="mt-2">{t("Reason for probability")}</Label>
                  <Input 
                    type="text" 
                    name="probability_reason" 
                    value={formData.probability_reason || ''} 
                    onChange={(e) => handleChange('probability_reason', e.target.value)}
                    placeholder="" 
                    className="w-full mt-1"
                  />
                </div>
              )}
            </div>

            <div className="pt-5">
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">{t("Save")}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}