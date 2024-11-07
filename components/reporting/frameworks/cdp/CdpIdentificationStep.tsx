import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ZoomIn } from "lucide-react";
import { AddLocationButtonAssessment } from "@/components/materiality/assessments/AddLocationButton";
import { DeleteLocationButton } from "@/components/materiality/company/DeleteLocationButton";
import { DataTable } from "@/components/table/data-table";
import { columns_location } from "@/components/table/LocationsTableColumns";
import { getLocations } from "@/lib/company/data";
import NextStepButton from "./NextStepButton";
// import { useTranslations } from "next-intl";

export default function CdpIdentificationStep(id: any) {
  // const t = useTranslations("materiality");
  const assessmentId = id.id;
  const assessmentLink = "/materiality/assessments/" + assessmentId + "/3";

  const timeHorizonFields = [
    {
      label: "Time horizon",
      name: "time-horizon",
      type: "select",
      options: ["Short-term", "Medium-term", "Long-term"],
    },
    {
      label: "From year",
      name: "from-year",
      type: "date",
      placeholder: "Enter start year",
    },
    {
      label: "To year",
      name: "to-year",
      type: "date",
      placeholder: "Enter end year",
    },
    {
      label: "Is your long-term time horizon open-ended?",
      name: "open-ended",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      label:
        "How this time horizon is linked to strategic and/or financial planning",
      name: "strategic-link",
      type: "text",
      placeholder: "Write answer",
    },
  ];

  const biodiversityFields = [
    {
      label: "Process in place",
      name: "process-in-place",
      type: "select",
      options: [
        "Yes",
        "No, but we plan to within the next two years",
        "No, and we do not plan to within the next two years",
      ],
    },
    {
      label: "Dependencies and/or impacts evaluated in this process",
      name: "dependencies-impacts",
      type: "select",
      options: [
        "Dependencies only",
        "Impacts only",
        "Both dependencies and impacts",
      ],
    },
    {
      label:
        "Biodiversity impacts evaluated before the mining project development stage",
      name: "biodiversity-impacts",
      type: "select",
      options: ["Yes, in all cases", "Yes, in some cases", "No"],
    },
    {
      label: "Primary reason for not evaluating dependencies and/or impacts",
      name: "primary-reason",
      type: "select",
      options: [
        "Lack of internal resources, capabilities, or expertise (e.g., due to organization size)",
        "No standardized procedure",
        "Not an immediate strategic priority",
        "Judged to be unimportant or not relevant",
        "Other, please specify",
      ],
    },
    {
      label:
        "Explain why you do not evaluate dependencies and/or impacts and describe any plans to do so in the future",
      name: "explanation",
      type: "text",
      placeholder: "Write your answer here…",
    },
  ];

  const riskOpportunityFields = [
    {
      label: "Process in place",
      name: "process-in-place",
      type: "select",
      options: [
        "Yes",
        "No, but we plan to within the next two years",
        "No, and we do not plan to within the next two years",
      ],
    },
    {
      label: "Risks and/or opportunities evaluated in this process",
      name: "risks-opportunities",
      type: "select",
      options: [
        "Risks only",
        "Opportunities only",
        "Both risks and opportunities",
      ],
    },
    {
      label:
        "Is this process informed by the dependencies and/or impacts process?",
      name: "informed-by-dependencies",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      label: "Primary reason for not evaluating risks and/or opportunities",
      name: "primary-reason",
      type: "select",
      options: [
        "Lack of internal resources, capabilities, or expertise (e.g., due to organization size)",
        "No standardized procedure",
        "Not an immediate strategic priority",
        "Judged to be unimportant or not relevant",
        "Other, please specify",
      ],
    },
    {
      label:
        "Explain why you do not evaluate risks and/or opportunities and describe any plans to do so in the future",
      name: "explain-no-evaluation",
      type: "text",
      placeholder: "Write your answer here…",
    },
    {
      label:
        "Explain why you do not have a process for evaluating both risks and opportunities that is informed by a dependencies and/or impacts process",
      name: "explain-no-process",
      type: "text",
      placeholder: "Write your answer here…",
    },
  ];

  const environmentalIssueFields = [
    {
      label: "Environmental issue",
      name: "environmental-issue",
      type: "select",
      options: [
        "Climate change",
        "Forests",
        "Water",
        "Plastics",
        "Biodiversity",
      ],
    },
    {
      label:
        "Indicate which of dependencies, impacts, risks, and opportunities are covered by the process for this environmental issue",
      name: "dependencies-impacts-risks-opportunities",
      type: "select",
      options: ["Dependencies", "Impacts", "Risks", "Opportunities"],
    },
    {
      label: "Value chain stages covered",
      name: "value-chain-stages",
      type: "select",
      options: [
        "Direct operations",
        "Upstream value chain",
        "Downstream value chain",
        "End of life management",
      ],
    },
    {
      label: "Coverage",
      name: "coverage",
      type: "select",
      options: ["Full", "Partial"],
    },
    {
      label: "Supplier tiers covered",
      name: "supplier-tiers",
      type: "select",
      options: [
        "Tier 1 suppliers",
        "Tier 2 suppliers",
        "Tier 3 suppliers",
        "Tier 4+ suppliers",
      ],
    },
    {
      label: "Mining projects covered",
      name: "mining-projects",
      type: "select",
      options: ["All disclosed mining projects"],
    },
    {
      label: "Type of assessment",
      name: "type-of-assessment",
      type: "select",
      options: [
        "Qualitative only",
        "Quantitative only",
        "Qualitative and quantitative",
      ],
    },
    {
      label: "Frequency of assessment",
      name: "frequency-of-assessment",
      type: "select",
      options: [
        "More than once a year",
        "Annually",
        "Every two years",
        "Every three years or more",
        "As important matters arise",
        "Not defined",
      ],
    },
    {
      label: "Time horizons covered",
      name: "time-horizons-covered",
      type: "select",
      options: ["Short-term", "Medium-term", "Long-term"],
    },
    {
      label: "Integration of risk management process",
      name: "integration-risk-management",
      type: "select",
      options: [
        "Integrated into multi-disciplinary organization-wide risk management process",
        "A specific environmental risk management process",
      ],
    },
    {
      label: "Location-specificity used",
      name: "location-specificity",
      type: "select",
      options: [
        "Site-specific",
        "Local",
        "Sub-national",
        "National",
        "Not location specific",
      ],
    },
    {
      label: "Tools and methods used",
      name: "tools-methods",
      type: "select",
      options: [
        "Commercially/publicly available tools (e.g., Beef on Track, BFC – Biodiversity Footprint Calculator, etc.)",
        "Enterprise Risk Management (e.g., COSO Enterprise Risk Management Framework, ISO 31000 Risk Management Standard, etc.)",
        "International methodologies and standards (e.g., Environmental Impact Assessment, ISO 14001, etc.)",
        "Databases (e.g., FAO/AQUASTAT, UNEP Vital Water Graphics, etc.)",
        "Other (e.g., Desk-based research, Partner and stakeholder consultation/analysis, etc.)",
      ],
    },
    {
      label: "Risk types and criteria considered",
      name: "risk-types-criteria",
      type: "select",
      options: [
        "Acute physical risks (e.g., Drought, Flood, Wildfires, etc.)",
        "Chronic physical risks (e.g., Changing precipitation patterns, Sea level rise, Soil erosion, etc.)",
        "Policy risks (e.g., Carbon pricing mechanisms, Changes to national legislation, etc.)",
        "Market risks (e.g., Availability and/or increased cost of certified sustainable material, Uncertainty about commodity origin, etc.)",
        "Reputation risks (e.g., Negative press coverage, Impact on human health, etc.)",
        "Technology risks (e.g., Data access/availability or monitoring systems, Transition to reusable products, etc.)",
        "Liability risks (e.g., Exposure to litigation, Non-compliance with regulations, etc.)",
      ],
    },
    {
      label: "Partners and stakeholders considered",
      name: "partners-stakeholders",
      type: "select",
      options: [
        "Customers",
        "Employees",
        "Investors",
        "Local communities",
        "Indigenous peoples",
        "NGOs",
        "Regulators",
        "Suppliers",
        "Water utilities at a local level",
        "Other commodity users/producers at a local level",
        "Other water users at the basin/catchment level",
        "Other, please specify",
      ],
    },
    {
      label: "Has this process changed since the previous reporting year?",
      name: "process-changed",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      label: "Further details of process",
      name: "further-details",
      type: "textarea",
      placeholder: "Write your answer here...",
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-xl font-bold mb-3">Module Overview</h4>
        <p className="text-sm">
          This module requests information about the time horizons at which
          organizations consider environmental issues, how an organization
          defines what is a substantive effect on its business, the procedures
          that organizations have in place to identify, assess and manage their
          environmental-related dependencies, impacts, risks, and opportunities
          relevant to their sector, and the identification of priority
          locations.
        </p>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">2.1</h4>
        <Label>
          How does your organization define short-, medium-, and long-term time
          horizons in relation to the identification, assessment, and management
          of your environmental dependencies, impacts, risks, and opportunities?
        </Label>
        <div className="w-full mt-3">
          {timeHorizonFields.map((field) => (
            <div className="mb-3" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "text" && (
                <Input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                />
              )}
              {field.type === "date" && (
                <Input
                  type="date"
                  name={field.name}
                  placeholder={field.placeholder}
                />
              )}
              {field.type === "select" && (
                <Select name={field.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">2.2</h4>
        <Label>
          Does your organization have a process for identifying, assessing, and
          managing environmental dependencies and/or impacts?
        </Label>
        <div className="w-full mt-3 mb-3">
          {biodiversityFields.map((field) => (
            <div className="mb-3" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "text" && (
                <Input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                />
              )}
              {field.type === "select" && (
                <Select name={field.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
        <h4 className="text-base font-bold mb-3">2.2.1</h4>
        <Label>
          Does your organization have a process for identifying, assessing, and
          managing environmental risks and/or opportunities?
        </Label>
        <div className="w-full mt-3 mb-3">
          {riskOpportunityFields.map((field) => (
            <div className="mb-3" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "text" && (
                <Input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                />
              )}
              {field.type === "select" && (
                <Select name={field.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
        <h4 className="text-base font-bold mb-3">2.2.2</h4>
        <Label>
          Provide details of your organization’s process for identifying,
          assessing, and managing environmental dependencies, impacts, risks,
          and/or opportunities
        </Label>
        <div className="w-full mt-3">
          {environmentalIssueFields.map((field) => (
            <div className="mb-3" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "select" && (
                <Select name={field.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === "textarea" && (
                <Textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex">
          <Button className="mt-5 justify-end">
            Update Details
          </Button>
        </div>
      </div>
    </>
  );
}
