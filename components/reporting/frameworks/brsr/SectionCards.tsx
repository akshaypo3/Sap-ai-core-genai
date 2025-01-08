import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { useTranslations } from "next-intl"

export default function SectionCards() {
  const t = useTranslations('reporting-com')
  return (
    <>
    <div className="mt-10">
        <h1 className="font-bold text-lg">{t("Sections")}</h1>
    </div>
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
        <Card key="1" className="flex flex-col h-full">
          <img src="/brsr_section_a_banner.png?height=200&width=300" alt="Section A Banner" className="w-full h-48 object-cover rounded-t-md" />
          <CardHeader className="h-24 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">{t("GENERAL DISCLOSURES.title")}</h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">{t("GENERAL DISCLOSURES.description")}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-end">
            <div className="flex flex-col text-xs text-muted-foreground">
              <div className="flex items-center">
                <UserIcon className="w-3 h-3 mr-1" />
                <span></span>
              </div>
              <div className="flex items-center mt-1">
                <Progress value={0}/>
              </div>
              {/* <div className="flex items-center mt-1">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>{item.date}</span>
              </div> */}
            </div>
            <Link href="/reporting/frameworks/brsr/section/a">
              <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white hover:text-white ">"{t("GENERAL DISCLOSURES.buttonText")}"</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card key="2" className="flex flex-col h-full">
          <img src="/brsr_section_b_banner.png?height=200&width=300" alt="Section A Banner" className="w-full h-48 object-cover rounded-t-md" />
          <CardHeader className="h-24 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">{t("MANAGEMENT AND PROCESS DISCLOSURES.title")}</h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">{t("MANAGEMENT AND PROCESS DISCLOSURES.description")}.</p>
          </CardContent>
          <CardFooter className="flex justify-between items-end">
            <div className="flex flex-col text-xs text-muted-foreground">
              <div className="flex items-center">
                <UserIcon className="w-3 h-3 mr-1" />
                <span></span>
              </div>
              <div className="flex items-center mt-1">
                <Progress value={0}/>
              </div>
              {/* <div className="flex items-center mt-1">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>{item.date}</span>
              </div> */}
            </div>
            <Link href="">
              <Button variant="outline" size="sm">{t("MANAGEMENT AND PROCESS DISCLOSURES.buttonText")}</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card key="3" className="flex flex-col h-full">
          <img src="/brsr_section_c_banner.png?height=200&width=300" alt="Section A Banner" className="w-full h-48 object-cover rounded-t-md" />
          <CardHeader className="h-24 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">{t("PRINCIPLE WISE PERFORMANCE DISCLOSURE.title")}</h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">{t("PRINCIPLE WISE PERFORMANCE DISCLOSURE.description")}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-end">
            <div className="flex flex-col text-xs text-muted-foreground">
              <div className="flex items-center">
                <UserIcon className="w-3 h-3 mr-1" />
                <span></span>
              </div>
              <div className="flex items-center mt-1">
                <Progress value={0}/>
              </div>
              {/* <div className="flex items-center mt-1">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>{item.date}</span>
              </div> */}
            </div>
            <Link href="">
              <Button variant="outline" size="sm">{t("PRINCIPLE WISE PERFORMANCE DISCLOSURE.buttonText")}</Button>
            </Link>
          </CardFooter>
        </Card>
    </div>
    </>
  )
}