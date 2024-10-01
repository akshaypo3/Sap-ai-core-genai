import React from "react";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";


export default async function Home({ params }: { params: { id: string } }) {

  const { id } = params;

  return (
    <>
      <ContentLayout title="Dashboard">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Location</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/dashboard/">Company Location</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/materiality/dashboard">Location ID</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
      {/* <IroTable assessmentData={assessmentData} assessmentId={id} /> */}
      </div>
    </ContentLayout>
    </>
  );
}
