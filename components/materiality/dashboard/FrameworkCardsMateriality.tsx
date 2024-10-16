import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon } from "lucide-react"
import Link from "next/link"

export default function FrameworkCardsMateriality() {
  const newsItems = [
    {
      image: "/esrs_banner.png?height=200&width=300",
      headline: "ESRS for CSRD",
      description: "Identify and prioritize sustainability topics that are most relevant to stakeholders and business impact.",
      author: "VASPP Deutschland",
      date: "",
    },
    {
      image: "/brsr_banner.png?height=200&width=300",
      headline: "BRSR",
      description: " You will be directly guided to the framework for streamlined reporting and compliance.",
      author: "VASPP Technologies",
      date: "",
    }
  ]

  return (
    <>
    <div className="mt-10">
        <h1 className="font-bold text-lg">Available Frameworks</h1>
    </div>
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
        <Card key="1" className="flex flex-col h-full">
          <img src="/esrs_banner.png?height=200&width=300" alt="ESRS for CSRD" className="w-full h-48 object-cover rounded-t-md" />
          <CardHeader className="h-24 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">ESRS for CSRD</h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">Identify and prioritize sustainability topics that are most relevant to stakeholders and business impact.</p>
          </CardContent>
          <CardFooter className="flex justify-between items-end">
            <div className="flex flex-col text-xs text-muted-foreground">
              <div className="flex items-center">
                <UserIcon className="w-3 h-3 mr-1" />
                <span>VASPP Deutschland</span>
              </div>
              {/* <div className="flex items-center mt-1">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>{item.date}</span>
              </div> */}
            </div>
            <Link href="/materiality/assessments">
              <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white hover:text-white ">Select</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card key="1" className="flex flex-col h-full">
          <img src="/brsr_banner.png?height=200&width=300" alt="BRSR" className="w-full h-48 object-cover rounded-t-md" />
          <CardHeader className="h-24 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">BRSR</h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">You will be directly guided to the framework for streamlined reporting and compliance.</p>
          </CardContent>
          <CardFooter className="flex justify-between items-end">
            <div className="flex flex-col text-xs text-muted-foreground">
              <div className="flex items-center">
                <UserIcon className="w-3 h-3 mr-1" />
                <span>VASPP Deutschland</span>
              </div>
              {/* <div className="flex items-center mt-1">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>{item.date}</span>
              </div> */}
            </div>
            <Link href="/reporting/frameworks/brsr">
            <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white hover:text-white ">Select</Button>
            </Link>
          </CardFooter>
        </Card>
    </div>
    </>
  )
}