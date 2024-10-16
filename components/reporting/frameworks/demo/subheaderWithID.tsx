"use client"

import React from "react";
import { usePathname, useParams } from 'next/navigation'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Slash } from "lucide-react"
  import { MoveOnButton,MoveOnButton2 } from "@/components/reporting/frameworks/demo/buttons";
import { useTranslations } from "next-intl";

export default function SubheaderFrameworks() {
  
  const pathName = usePathname();
  const { id } = useParams();
  const currentFramework = id.toUpperCase().replace(/(ESRS)(\w+)/, '$1 $2');
  
  console.log(currentFramework); // For debugging purposes
  const t = useTranslations("reporting-com")
      

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl mb-2">{t("Frameworks")}</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/internal/">{t("Dashboard")}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dev/reporting/frameworks">{t("Frameworks Overview")}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dev/reporting/frameworks/esrs">{t("ESRS")}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dev/reporting/frameworks">{currentFramework}</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          <MoveOnButton/>
          <MoveOnButton2/>
        </div>
      </div>
    </>
  )
}
