/**
 * v0 by Vercel.
 * @see https://v0.dev/t/95PeZK2Qj2u
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function Component() {
  const t = useTranslations("reporting-com")
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-medium">{t("ESRS ID: S1-7")}</div>
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-medium">{t("DR: 55a")}</div>
          <Link href="#" className="text-blue-500 hover:underline" prefetch={false}>
            {t("Paragraph")}
          </Link>
          <Link href="https://xbrl.efrag.org/e-esrs/esrs-set1-2023.html#d1e29340-3-1" className="text-blue-500 hover:underline" prefetch={false}>
            {t("AR61")}
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{t("Question")}</h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                {t("Number of non-employees in own workforce")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
            <Link href="/reporting/frameworks/esrs/s1/s1-66">
                <Button className="flex-auto bg-green-500">U{t("se 150")}</Button>
            </Link>
                <Button className="flex-auto bg-slate-500 ml-5">{t("Edit answer")}</Button>
          </div>
        <div>
          <h3 className="text-lg font-semibold">{t("AI Assistance")}</h3>
          <div className="mt-2 space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{t("AI")}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <p>
                  {t("Based on HR contracts from datasource \"VASPP BREVO - DMS - ID 123e4567-e89b-12d3-a456-426614174000\", this is a possible answer:")}
                </p>
                <p>
                  {t("As of the latest reporting period, the number of non-employees in our organization's own workforce is approximately")} <strong>150</strong>. {t("This includes contractors, consultants, and temporary staff who are integrated into our daily operations but are not directly employed by the organization")}
                </p>
                <h4 className="font-semibold">{t("Classification of Non-Employees:")}</h4>
                <p>
                  {t("The non-employees are classified into several categories based on their roles and the duration of their engagement:")}
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t("Contractors: 80")}</li>
                  <li>{t("Consultants: 50")}</li>
                  <li>{t("Temporary Staff: 20")}</li>
                </ul>
                <h4 className="font-semibold">{t("Role Integration:")}</h4>
                <p>
                  {t("These non-employees play critical roles in various departments, including IT, project management, and administrative support_Their contributions are essential to maintaining the efficiency and productivity of our operations")}
                </p>
                <h4 className="font-semibold">{t("Tracking and Monitoring:")}</h4>
                <p>
                  {t("We utilize the")} <strong>{t("WorkforceManager")}</strong> {t("system to track and monitor the engagement and performance of non-employees_This system ensures that all non-employees are adequately onboarded, their roles are clearly defined, and their contributions are regularly reviewed")}
                </p>
                <h4 className="font-semibold">{t("Compliance and Reporting:")}</h4>
                <p>
                  {t("Our organization adheres to strict compliance guidelines to ensure that the use of non-employees is transparent and aligns with regulatory requirements_Regular reports are generated to provide insights into the utilization and performance of non-employees")}
                </p>
                <p>t
                  {t("By maintaining detailed records and implementing robust monitoring systems, we ensure that the integration of non-employees into our workforce is effective and compliant with industry standards")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
