import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function SectionCards() {

  return (
    <>
    <div className="mt-10">
        <h1 className="font-bold text-lg">Sections</h1>
    </div>
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
        <Card key="1" className="flex flex-col h-full">
          <img src="/brsr_section_a_banner.png?height=200&width=300" alt="Section A Banner" className="w-full h-48 object-cover rounded-t-md" />
          <CardHeader className="h-24 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">GENERAL DISCLOSURES</h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">This section focuses on providing an overview of the organization’s general information</p>
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
              <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white hover:text-white ">Start</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card key="2" className="flex flex-col h-full">
          <img src="/brsr_section_b_banner.png?height=200&width=300" alt="Section A Banner" className="w-full h-48 object-cover rounded-t-md" />
          <CardHeader className="h-24 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">MANAGEMENT AND PROCESS DISCLOSURES</h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">This section is aimed at helping businesses demonstrate the structures, policies and processes
            put in place towards adopting the NGRBC Principles and Core Elements.</p>
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
              <Button variant="outline" size="sm">Finish Section A first</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card key="3" className="flex flex-col h-full">
          <img src="/brsr_section_c_banner.png?height=200&width=300" alt="Section A Banner" className="w-full h-48 object-cover rounded-t-md" />
          <CardHeader className="h-24 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">PRINCIPLE WISE PERFORMANCE DISCLOSURE</h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">This section is aimed at helping entities demonstrate their performance in integrating the
            Principles and Core Elements with key processes and decisions.</p>
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
              <Button variant="outline" size="sm">Finish Section A first</Button>
            </Link>
          </CardFooter>
        </Card>
    </div>
    </>
  )
}