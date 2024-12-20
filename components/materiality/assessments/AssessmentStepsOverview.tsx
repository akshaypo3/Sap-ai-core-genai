import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const steps = [
  {
    id: 1,
    name: "Company Details",
    description: "Enter basic information about your company."
  },
  {
    id: 2,
    name: "Locations",
    description: "Specify the locations where your company operates."
  },
  {
    id: 3,
    name: "Products",
    description: "Identify key products and their Impact, Risks and Opportunities"
  },
  {
    id: 4,
    name: "Stakeholder Analysis",
    description: "Analyze and prioritize your stakeholders."
  },
  {
    id: 5,
    name: "IROs",
    description: "Identify and assess your Impact, Risks, and Opportunities."
  },
  {
    id: 6,
    name: "Sign Off",
    description: "Review and sign off on your materiality assessment."
  }
];

interface AssessmentStepsOverviewProps {
  id: string;
  step: string;
}

export default function AssessmentStepsOverview({ id, step }: AssessmentStepsOverviewProps) {
  const currentStepId = parseInt(step, 10);

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-6 mb-6">
      {steps.map((stepItem) => {
        const isActive = stepItem.id === currentStepId;
        const isFinished = stepItem.id < currentStepId;

        return (
          <Link href={`/materiality/assessments/${id}/${stepItem.id}`} key={stepItem.id}>
            <div
              className={`flex flex-col flex-grow border rounded-lg bg-white p-5 transition-all
                ${isActive ? 'border-green-500' : 'border-gray-300'} 
                ${!isActive && !isFinished ? 'opacity-50' : 'opacity-100'}`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="text-2xl font-bold text-gray-500">{stepItem.id}</div>
                {isFinished && <CheckCircle className="text-green-500" size={24} />}
              </div>
              <div className="font-bold text-xl text-gray-800">{stepItem.name}</div>
              <div className="text-sm text-gray-600 pt-3">{stepItem.description}</div>
              <Button
                variant="outline"
                className={`mt-auto w-full self-end 
                  ${isActive ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-300'}`}
              >
                {isActive ? 'Current step' : isFinished ? 'View' : 'Finish previous'}
              </Button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
