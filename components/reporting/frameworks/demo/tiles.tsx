/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Z8zbruODVaI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("reporting-com")
  return (
    <>
    <div className="grid grid-cols-4 gap-4">
    <Card className="max-w-xs">
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <img src="/esrs_banner.png" alt="Banner" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      <div className="px-6 pt-4 pb-6 space-y-2">
        <h3 className="text-lg font-semibold">{t("ESRS")}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t("The European Sustainability Reporting Standards provide a framework for companies to report on their sustainability performance in compliance with EU regulations")}</p>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 dark:bg-gray-800">
              <BarChartIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{t("Data mapped")}</div>
              <div className="text-xs text-green-500">{t("All data sources connected")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 dark:bg-gray-800">
              <GaugeIcon className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{t("641/1242 KPIs")}</div>
              <div className="text-xs text-yellow-500">{t("KPIs defined and tracked")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 dark:bg-gray-800">
              <ActivityIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{t("Active")}</div>
              <div className="text-xs text-green-500">{t("Framework status")}</div>
            </div>
          </div>
        </div>
        <Link href="/dev/reporting/frameworks/esrs">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">{t("Configure Framework")}</Button>
        </Link>
      </CardContent>
    </Card>
    <Card className="max-w-xs gap-5">
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <img src="/brsr_banner.png" alt="Banner" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      <div className="px-6 pt-4 pb-6 space-y-2">
        <h3 className="text-lg font-semibold">{t("BRSR")}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t("The Business Responsibility and Sustainability Reporting framework is used by Indian companies to disclose their environmental, social, and governance performance")}.</p>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 dark:bg-gray-800">
              <BarChartIcon className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{t("Data not mapped")}</div>
              <div className="text-xs text-red-500">{t("No data sources connected")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 dark:bg-gray-800">
              <GaugeIcon className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{t("0 KPIs")}</div>
              <div className="text-xs text-red-500">{t("KPIs defined and tracke")}d</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 dark:bg-gray-800">
              <ActivityIcon className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{t("Inactive")}</div>
              <div className="text-xs text-red-500">{t("Framework status")}</div>
            </div>
          </div>
        </div>
        <Button className="w-full bg-slate-500 hover:bg-slate-600 text-white">{t("Configure Framework")}</Button>
      </CardContent>
    </Card>
    <Card className="max-w-xs gap-5">
      <div className="relative h-32 overflow-hidden rounded-t-lg">
        <img src="/gri_banner.png" alt="Banner" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      <div className="px-6 pt-4 pb-6 space-y-2">
        <h3 className="text-lg font-semibold">{t("GRI")}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t("The Global Reporting Initiative offers international standards for sustainability reporting, enabling organizations to communicate their impacts")}</p>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 dark:bg-gray-800">
              <BarChartIcon className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{t("Data not mapped")}</div>
              <div className="text-xs text-slate-500">{t("No data sources connected")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 dark:bg-gray-800">
              <GaugeIcon className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{t("0 KPIs")}</div>
              <div className="text-xs text-slate-500">{t("KPIs defined and tracked")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 dark:bg-gray-800">
              <ActivityIcon className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium">{t("Not available")}</div>
              <div className="text-xs text-slate-500">{t("Framework status")}</div>
            </div>
          </div>
        </div>
        <Button className="w-full bg-slate-500 hover:bg-slate-600 text-white">{t("Buy license")}</Button>
      </CardContent>
    </Card>
    </div>
    </>
  )
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  )
}


function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}


function GaugeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  )
}