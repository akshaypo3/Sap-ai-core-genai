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
import { performAIAssessment } from "@/lib/ai/anthropic";
import { useTranslations } from "next-intl";
import { Leaf, DollarSign  } from 'lucide-react';
import ChartCard from "./AssessmentCards";

export default function IroFormClient({ initialData, id, stakeholders }) {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const t = useTranslations();

  console.log("initial data: ", initialData)

  const handleChange = (name, value) => {
    console.log(`Setting ${name} to ${value}`);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAIAssist = async () => {
    setIsLoading(true);
    try {
      const aiResponse = await performAIAssessment(id);
      if (aiResponse.success) {
        setAiSuggestion(aiResponse.suggestion);
      } else {
        console.error("AI Assist failed:", aiResponse.message);
        alert("AI Assist failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during AI Assist:", error);
      alert("An error occurred during AI Assist. Please try again.");
    }
    setIsLoading(false);
  };

  const applySuggestion = () => {
    if (!aiSuggestion) return;

    const suggestionLines = aiSuggestion.split('\n');
    let suggestionData = {};

    for (const line of suggestionLines) {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        suggestionData[key] = value;
      }
    }

    setFormData(prev => ({
      ...prev,
      iro_description: suggestionData.iro_description || prev.iro_description,
      materiality_type: suggestionData.materiality_type || prev.materiality_type,
      impact: suggestionData.impact || prev.impact,
      impact_state: suggestionData.impact_state || prev.impact_state,
      scale_score: parseInt(suggestionData.scale_score) || prev.scale_score,
      scale_reason: suggestionData.scale_reason || prev.scale_reason,
      scope_score: parseInt(suggestionData.scope_score) || prev.scope_score,
      scope_reason: suggestionData.scope_reason || prev.scope_reason,
      irremediability_score: parseInt(suggestionData.irremediability_score) || prev.irremediability_score,
      irremediability_reason: suggestionData.irremediability_reason || prev.irremediability_reason,
      probability_score: parseFloat(suggestionData.probability_score) || prev.probability_score,
      probability_reason: suggestionData.probability_reason || prev.probability_reason,
    }));
  };

  const chartDetailsScale = [
    { value: "1", bar_value: 20, label: "Very Low", color: "#4caf50" },
    { value: "2", bar_value: 40, label: "Low", color: "#4caf50" },
    { value: "3", bar_value: 60, label: "Medium", color: "#4caf50" },
    { value: "4", bar_value: 80, label: "High", color: "#4caf50" },
    { value: "5", bar_value: 100, label: "Very High", color: "#4caf50" },
  ];

  const chartDetailsScope = [
    { value: "1", bar_value: 20, label: "Limited", color: "#4caf50" },
    { value: "2", bar_value: 40, label: "Moderate", color: "#4caf50" },
    { value: "3", bar_value: 60, label: "Extended", color: "#4caf50" },
    { value: "4", bar_value: 80, label: "Far-reaching", color: "#4caf50" },
    { value: "5", bar_value: 100, label: "Global", color: "#4caf50" },
  ];

  const chartDetailsIrremediability = [
    { value: "1", bar_value: 20, label: "Short-term", color: "#4caf50" },
    { value: "2", bar_value: 40, label: "Medium-term", color: "#4caf50"  },
    { value: "3", bar_value: 60, label: "Long-term", color: "#4caf50" },
    { value: "4", bar_value: 80, label: "Very severe", color: "#4caf50" },
    { value: "5", bar_value: 100, label: "Irreversible", color: "#4caf50" },
  ];

  const chartDetailsProbability = [
    { value: "0.75", bar_value: 33, label: "Unlikely", color: "#4caf50" },
    { value: "0.85", bar_value: 77, label: "Likely", color: "#4caf50" },
    { value: "0.90", bar_value: 100, label: "Very likely", color: "#4caf50" },
  ];

  console.log("Submitting FormData:", formData);
  return (
    <div className="">
      <Card className="rounded-md mb-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{formData.code} / {formData.topic}</CardTitle>
            <Button 
              onClick={handleAIAssist} 
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading ? "AI Assisting..." : "AI Assist"}
            </Button>
          </div>
          <p className="text-l font-semibold">{formData.sub_topic}</p>
          <p className="text-sm text-gray-500">{formData.sub_sub_topic}</p>
        </CardHeader>
      </Card>

      {aiSuggestion && (
        <Card className="rounded-md mb-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">AI Suggestion</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{aiSuggestion}</pre>
            <Button 
              onClick={applySuggestion}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white"
            >
              Apply Suggestion
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="rounded-md">
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
              <div className="bg-gray-50 p-4 rounded-lg border">
                <Label htmlFor="iro_description" className="text-lg">Description</Label>
                <p className="text-sm text-gray-500 mb-2">Describe how this topic has an impact on your company or how your company has an impact on the environment</p>
                <Input 
                  type="text" 
                  name="iro_description" 
                  value={formData.iro_description || ''} 
                  onChange={(e) => handleChange('iro_description', e.target.value)}
                  placeholder="Write Description" 
                  className="w-full"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <Label htmlFor="materiality_type" className="text-lg">Select Materiality Type</Label>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-bold">Impact materiality</span> refers to how a particular topic or issue influences the company's impact on the economy, environment, or society. 
                  <span className="font-bold">Financial materiality</span> is concerned with how a particular topic or issue affects the financial performance or value of the company.
                </p>
                <div className="flex gap-4">
                  <div 
                    tabIndex={0} 
                    className={`flex items-center justify-between border p-4 rounded shadow w-full cursor-pointer transition-all duration-300 
                      ${formData.materiality_type === 'impact' ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-600'} 
                      hover:border-green-500 hover:text-black`}
                    onClick={() => handleChange('materiality_type', 'impact')}
                  >
                    <div>
                      <h3 className="text-lg font-semibold">Impact Materiality</h3>
                      <p className="text-gray-600">Impact materiality refers to how a particular topic or issue influences the company's impact on the economy, environment, or society.</p>
                    </div>
                    <Leaf className="text-green-500 w-10 h-10" />
                  </div>

                  <div 
                    tabIndex={0}  
                    className={`flex items-center justify-between border p-4 rounded shadow w-full cursor-pointer transition-all duration-300 
                      ${formData.materiality_type === 'financial' ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-600'} 
                      hover:border-blue-500 hover:text-black`}
                    onClick={() => handleChange('materiality_type', 'financial')}
                  >
                    <div>
                      <h3 className="text-lg font-semibold">Financial Materiality</h3>
                      <p className="text-gray-600">Financial materiality is concerned with how a particular topic or issue affects the financial performance or value of the company.</p>
                    </div>
                    <DollarSign className="text-blue-500 w-10 h-10" />
                  </div>
                </div>
                <input type="hidden" name="materiality_type" value={formData.materiality_type} />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <Label htmlFor="impact" className="text-lg">Impact</Label>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-bold">For Impact materiality:</span> Does this topic have a positive or negative impact?
                  <span className="font-bold ms-3">For Financial materiality:</span> Is this topic a chance or a risk.
                </p>
                <div className="flex gap-4 justify-start cursor-pointer">
                {formData.materiality_type === 'impact' ? (
                  <>
                 <div
                 className={`flex items-center justify-between border p-4 rounded shadow w-64 transition-all duration-300 
                   ${formData.impact === 'positive' ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-600'} 
                   hover:border-green-500 hover:text-black`}
                 onClick={() => handleChange('impact', 'positive')}
               >
                 <div>
                   <h3 className="text-lg font-semibold">Positive</h3>
                 </div>
               </div>
               <div
                 className={`flex items-center justify-between border p-4 rounded shadow w-64 transition-all duration-300 
                   ${formData.impact === 'negative' ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600'} 
                   hover:border-red-500 hover:text-black`}
                 onClick={() => handleChange('impact', 'negative')}
               >
                <div>
                   <h3 className="text-lg font-semibold">Negative</h3>
                </div>
               </div>
               </>
                ) : (
                <>
                <div className={`flex items-center justify-between border p-4 rounded shadow w-64 transition-all duration-300 
                    ${formData.impact === 'chance' ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-600'} 
                    hover:border-green-500 hover:text-black`}
                  onClick={() => handleChange('impact', 'chance')}
                >
                  <div>
                    <h3 className="text-lg font-semibold">Chance</h3>
                  </div>
                </div>
                <div
                  className={`flex items-center justify-between border p-4 rounded shadow w-64 transition-all duration-300 
                    ${formData.impact === 'risk' ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600'} 
                    hover:border-red-500 hover:text-black`}
                  onClick={() => handleChange('impact', 'risk')}
                >
                  <div>
                    <h3 className="text-lg font-semibold">Risk</h3>
                  </div>
                </div>
                </>
                )}
                </div>
                <input type="hidden" name="impact" value={formData.impact} />
              </div>

              {formData.materiality_type === 'impact' && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <Label htmlFor="impact_state" className="text-lg">Impact State</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-bold">For Impact materiality:</span> Is this an actual or a potential impact?
                  </p>
                 <div className="flex gap-4 justify-start cursor-pointer">
                    <div
                      tabIndex={0}
                      className={`flex items-center justify-between border p-4 rounded shadow w-64 transition-all duration-300 
                        ${formData.impact_state === 'actual' ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-600'} 
                        hover:border-green-500 hover:text-black`}
                      onClick={() => handleChange('impact_state', 'actual')}
                    >
                      <div>
                        <h3 className="text-lg font-semibold">Actual Impact</h3>
                      </div>
                    </div>

                    <div
                      tabIndex={0} 
                      className={`flex items-center justify-between border p-4 rounded shadow w-64 transition-all duration-300 
                        ${formData.impact_state === 'potential' ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-600'} 
                        hover:border-green-500 hover:text-black`}
                      onClick={() => handleChange('impact_state', 'potential')}
                    >
                      <div>
                        <h3 className="text-lg font-semibold">Potential Impact</h3>
                      </div>
                    </div>
                  </div>
                  <input type="hidden" name="impact_state" value={formData.impact_state} />
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg border">
                <Label htmlFor="scale_score" className="text-lg">{t("Scale")}</Label>
                <p className="text-sm text-gray-500 mb-2">{t("The \"Scale\" field refers to the extent or reach of the impact caused by a specific topic or issue")}</p>
                <div className="grid max-w-5xl grid-cols-5 gap-4 mb-2">
                <input type="hidden" name="scale_score" value={formData.scale_score} />
                  {chartDetailsScale.map((chart, index) => (
                    <ChartCard
                      key={index}
                      value={chart.value}
                      bar_value={chart.bar_value}
                      label={chart.label}
                      color={chart.color}
                      isSelected={formData.scale_score === chart.value}
                      onClick={() => handleChange('scale_score', chart.value)} 
                      formData={initialData}
                    />
                  ))}
                </div>
                <Label htmlFor="scale_reason" className="mt-2">Reason for scale</Label>
                <Input 
                  type="text" 
                  name="scale_reason" 
                  value={formData.scale_reason || ''} 
                  onChange={(e) => handleChange('scale_reason', e.target.value)}
                  placeholder="Reason for scale" 
                  className="w-full mt-1"
                />
              </div>

              {formData.impact_state && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <Label htmlFor="scope_score" className="text-lg">{t("Scope")}</Label>
                  <p className="text-sm text-gray-500 mb-2">T{t("The \"Scope\" field measures the breadth or range of the impact related to a specific topic or issue")}</p>
                  <div className="grid max-w-5xl grid-cols-5 gap-4 mb-2">
                  <input type="hidden" name="scope_score" value={formData.scope_score} />
                  {chartDetailsScope.map((chart, index) => (
                    <ChartCard
                      key={index}
                      value={chart.value}
                      bar_value={chart.bar_value}
                      label={chart.label}
                      color={chart.color}
                      isSelected={formData.scope_score === chart.value}
                      onClick={() => handleChange('scope_score', chart.value)} 
                      formData={initialData}
                    />
                  ))}
                </div>
                  <Label htmlFor="scope_reason" className="mt-2">Reason for scope</Label>
                  <Input 
                    type="text" 
                    name="scope_reason" 
                    value={formData.scope_reason || ''} 
                    onChange={(e) => handleChange('scope_reason', e.target.value)}
                    placeholder="Reason for scope" 
                    className="w-full mt-1"
                  />
                </div>
              )}

              {formData.impact === 'negative' && (
               <div className="bg-gray-50 p-4 rounded-lg border">
                  <Label htmlFor="irremediability_score" className="text-lg">{t("Irremediability")}</Label>
                  <p className="text-sm text-gray-500 mb-2">{t("The \"Irremediability\" field evaluates the difficulty in reversing or mitigating the impact of a particular issue or topic")}</p>
                  <div className="grid max-w-5xl grid-cols-5 gap-4 mb-2">
                  <input type="hidden" name="irremediability_score" value={formData.irremediability_score} />
                  {chartDetailsIrremediability.map((chart, index) => (
                    <ChartCard
                      key={index}
                      value={chart.value}
                      bar_value={chart.bar_value}
                      label={chart.label}
                      color={chart.color}
                      isSelected={formData.irremediability_score === chart.value}
                      onClick={() => handleChange('irremediability_score', chart.value)}
                      formData={initialData}
                    />
                  ))}
                 </div>
                  <Label htmlFor="irremediability_reason" className="mt-2">Reason for irremediability</Label>
                  <Input 
                    type="text" 
                    name="irremediability_reason" 
                    value={formData.irremediability_reason || ''} 
                    onChange={(e) => handleChange('irremediability_reason', e.target.value)}
                    placeholder="Reason for irremediability" 
                    className="w-full mt-1"
                  />
                </div>
              )}

              {formData.impact_state === 'potential' && (
               <div className="bg-gray-50 p-4 rounded-lg border">
                  <Label htmlFor="probability_score" className="text-lg">{t("Probability")}</Label>
                  <p className="text-sm text-gray-500 mb-2">{t("The \"Probability\" field assesses the likelihood that a particular event, issue, or impact will occur")}</p>
                  <div className="grid max-w-5xl grid-cols-3 gap-4 mb-2">
                  <input type="hidden" name="probability_score" value={formData.probability_score} />
                  {chartDetailsProbability.map((chart, index) => (
                    <ChartCard
                      key={index}
                      value={chart.value}
                      bar_value={chart.bar_value}
                      label={chart.label}
                      color={chart.color}
                      isSelected={formData.probability_score === chart.value}
                      onClick={() => handleChange('probability_score', chart.value)} 
                      formData={initialData}
                    />
                  ))}
                </div>
                  <Label htmlFor="probability_reason" className="mt-2">Reason for probability</Label>
                  <Input 
                    type="text" 
                    name="probability_reason" 
                    value={formData.probability_reason || ''} 
                    onChange={(e) => handleChange('probability_reason', e.target.value)}
                    placeholder="Reason for probability" 
                    className="w-full mt-1"
                  />
                </div>
              )}
              <div className="pt-5">
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white w-52">Save</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}