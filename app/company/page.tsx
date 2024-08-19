import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CircleHelp } from "lucide-react";



// import Subheader from "@/components/Subheader";


export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <ContentLayout title="Company Details">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Company</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          {/* <Button variant="outline">Add new</Button> */}
        </div>
      </div>
      <div className="bg-white dark:bg-neutrak-950 rounded-md border">
      <Alert>
        {/* <Terminal className="h-4 w-4" /> */}
        <AlertTitle>Step 1</AlertTitle>
        <AlertDescription>
          Collecting general information about your company. Please describe everything in natural language!
          {/* <Progress value={33} className="mt-2" /> */}
        </AlertDescription>
      </Alert>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-3">
        
        <Label htmlFor="text">Company Name</Label>
        <Input type="text" placeholder="Mustermann AG" />
        <Separator className="my-4"/>
        <Label htmlFor="company_strategy">Company Strategy</Label>
        <Textarea id="company_strategy"/>
        <Label htmlFor="strategy_documents">Company Strategy Documents</Label>
        <Input id="strategy_documents" type="file" />
        <Separator className="my-4"/>
        <Label htmlFor="business_model">Business Model</Label>
        <Textarea id="business_model"/>
        <Label htmlFor="products_services">Key products and services</Label>
        <Textarea id="products_services"/>
        <Separator className="my-4"/>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-3">
        <div className="mb-8 p-3 flex items-center justify-between bg-white dark:bg-neutral-950">
          <div>
            <h1 className="font-bold text-xl mb-2">Locations</h1>
          </div>
          <div className="flex space-x-4">
            {/* Button Section for Subheader */}
            <Button variant="outline">Add location</Button>
          </div>
        </div>
      </div>


    </ContentLayout>
    </>
  );
}
