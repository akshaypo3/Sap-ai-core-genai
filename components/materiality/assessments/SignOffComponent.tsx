"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SignOffComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFinishAndSignOff = async () => {
    setIsLoading(true);
    try {
      // Simulate an API call or database update
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After the action is complete, redirect to the dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error("Error during sign-off process:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-5">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-xl font-semibold">Sign-Off</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p>
            Congratulations! You have completed the Materiality Assessment. This is a crucial step in your sustainability reporting process.
          </p>
          <p>
            Obtaining sign-off for your Materiality Assessment is essential for several reasons:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>It ensures that all relevant stakeholders have reviewed and approved the assessment results.</li>
            <li>It provides official validation of the materiality topics identified, which will guide your sustainability strategy and reporting.</li>
            <li>It demonstrates commitment and accountability from your organization's leadership.</li>
            <li>It creates a formal record of the assessment process, which can be valuable for future reference and audits.</li>
          </ul>
          <p>
            By clicking the button below, you will finalize the assessment and initiate the sign-off process. This will notify the appropriate individuals to review and approve the results.
          </p>
          <div className="mt-6">
            <Button 
              onClick={handleFinishAndSignOff}
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Finish Assessment and Request Sign-Off"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}