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
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-medium">{t("ESRS ID: S1-3")}</div>
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-medium">{t("DR: 32e")}</div>
          <Link href="#" className="text-blue-500 hover:underline" prefetch={false}>
            {t("Paragraph")}
          </Link>
          <Link href="https://xbrl.efrag.org/e-esrs/esrs-set1-2023.html#d1e29340-3-1" className="text-blue-500 hover:underline" prefetch={false}>
            {t("AR32")}
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{t("Question")}</h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                {t("How does your organization track and monitor issues that are raised and addressed, and what measures are in place to ensure the effectiveness of these channels?")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
            <Link href="/reporting/frameworks/esrs/s1/s1-55">
                <Button className="flex-auto bg-green-500">{t("Use answer")}</Button>
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
                  {t("Based on documents IT_Policy_Manual.pdf, System_Architecture_Guide.pdf, and Network_Security_Protocols.pdf from datasource VASPP BREVO - DMS - ID 123e4567-e89b-12d3-a456-426614174000, this is a possible answer:")}
                </p>
                <h4 className="font-semibold">{t("1. Issue Tracking System:")}</h4>
                <p>
                  <strong>{t("IssueTrackPro")}</strong>{t("uses a centralized digital platform where all issues are logged, categorized, and assigned to the appropriate teams for resolution. Each issue is given a unique identifier for easy reference and follow-up.")}
                </p>
                <h4 className="font-semibold">t{t("2. Monitoring and Reporting:")}</h4>
                <p>
                  {t("Regular monitoring processes are established to review the status of each issue. This includes automated alerts for pending and overdue issues. Detailed reports are generated weekly and monthly to provide insights into issue resolution times, trends, and potential areas for improvement.")}
                </p>
                <h4 className="font-semibold">{t("3. Effectiveness of Channels:")}</h4>
                <p>
                  {t("To ensure the effectiveness of our issue resolution channels,")} <strong>{t("IssueTrackPro")}</strong> {t("regularly collects feedback from stakeholders through surveys and direct feedback mechanisms. This feedback is analyzed to identify any gaps in the process, and necessary improvements are implemented.")}
                </p>
                <h4 className="font-semibold">{t("4. Continuous Improvement:")}</h4>
                <p>
                 {t(" The system is designed for continuous improvement, incorporating feedback loops and regular audits to assess the performance of issue resolution channels. Training sessions are conducted for employees to keep them updated on best practices and new features of")} <strong>{t("IssueTrackPro")}</strong>.
                </p>
                <h4 className="font-semibold">{t("5. Transparency and Accountability:")}</h4>
                <p>
                  {t("Transparency is maintained by providing stakeholders with access to issue status and resolution updates through")} <strong>{t("IssueTrackPro.")}</strong> {t("Accountability is enforced through clear assignment of responsibilities and regular performance reviews.")}
                </p>
                <p>
                  {t("By integrating these measures,")} <strong>{t("IssueTrackPro")}</strong> {t("ensures that all issues are addressed promptly and effectively, maintaining high standards of service and stakeholder satisfaction.")}
                </p>
              </div>t
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
