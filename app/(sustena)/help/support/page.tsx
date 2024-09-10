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
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon, MailIcon, PhoneIcon, BookOpenIcon ,Slash} from "lucide-react"
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
      <ContentLayout title="Support">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Support</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/help/guidance">Help</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/help/support">Support</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          {/* <Button variant="outline">Add new</Button> */}
        </div>
      </div>
      <div className="bg-white dark:bg-black rounded-md border">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for help topics..."
              className="pl-10"
            />
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I start a new sustainability report?</AccordionTrigger>
              <AccordionContent>
                To start a new sustainability report, log in to your EcoReport account and click on the "New Report" button on your dashboard. Follow the step-by-step guide to input your organization's data and generate your report.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I import data from previous years?</AccordionTrigger>
              <AccordionContent>
                Yes, you can import data from previous years. Go to the "Data Management" section and select "Import Historical Data". You can then upload your past reports or data files in supported formats (CSV, Excel, etc.).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How often should I update my sustainability metrics?</AccordionTrigger>
              <AccordionContent>
                We recommend updating your sustainability metrics at least quarterly to maintain accurate and up-to-date reports. However, some organizations prefer monthly updates for more granular tracking. You can set custom reminders in your EcoReport settings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MailIcon className="mr-2" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>help@sustena.com</p>
                <p className="text-sm text-muted-foreground mt-2">
                  We aim to respond within 24 hours.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PhoneIcon className="mr-2" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>+49 622 7859 0888</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Available Monday-Friday, 9am-5pm EST
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center">
              <BookOpenIcon className="mb-2" />
              <span>User Guide</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center">
              <BookOpenIcon className="mb-2" />
              <span>Video Tutorials</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center">
              <BookOpenIcon className="mb-2" />
              <span>Best Practices</span>
            </Button>
          </div>
        </section>
      </main>
      </div>
    </ContentLayout>
    </>
  );
}
