/**
 * v0 by Vercel.
 * @see https://v0.dev/t/95PeZK2Qj2u
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"

export default function Component() {
  const t = useTranslations("reporting-com")
  return (
    <>
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-medium">{t("ESRS ID: S1-44")}</div>
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm font-medium">{t("DR: 28")}</div>
          <Link href="https://xbrl.efrag.org/e-esrs/esrs-set1-2023.html#d1e29340-3-1" className="text-blue-500 hover:underline" prefetch={false}>
            {t("Paragraph")}
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{t("Question")}</h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-gray-500 dark:text-gray-400">
              {t("How does your organization disclose the steps taken to gain insight into the perspectives of people within its own workforce who may be particularly vulnerable to impacts and/or marginalized?")}
              </p>
            </div>
          </div>
        </div>
        
        </div>
        <div className="grid w-full gap-1.5 mt-5">
      <Label htmlFor="message-2">{t("Your answer")}</Label>
      <Textarea placeholder="Type you answer here" id="message-2" />
      </div>
      <div className="w-full">
            <Link href="/reporting/frameworks/esrs/s1/s1-77">
                <Button className="mt-2 block w-full bg-slate-500">{t("Submit")}</Button>
            </Link>
                
          </div>
      </div>
      </>
  )
}
