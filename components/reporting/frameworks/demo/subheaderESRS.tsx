"use client"

import React from "react";
import { usePathname } from 'next/navigation'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Slash } from "lucide-react"
  import { AddEventButton } from "@/app/ui/buttons";
import { useTranslations } from "next-intl";

export default function SubheaderFrameworksESRS() {

    const pathName = usePathname();
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
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
        </div>
      </div>
    </>
  )
}
