import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon } from "lucide-react"

export default function FrameworkCards() {
  const newsItems = [
    {
      image: "/news_stepbystepguide.png?height=200&width=300",
      headline: "Step-by-Step Guide for CSRD Reporting",
      description: "Navigate the complexities of the Corporate Sustainability Reporting Directive (CSRD) with ease.",
      activated: "Active",
      lastUpdated: "24.08.2024 10:30",
    },
    {
      image: "/news_aihelp.png?height=200&width=300",
      headline: "Reporting with the Help of AI",
      description: "Discover how AI-driven tools can enhance data accuracy, reduce manual efforts, and provide actionable insights for more effective environmental strategies.",
      activated: "License required",
      lastUpdated: "22.08.2024 8:00",
    },
  ]

  return (
    <>
    <div className="mt-10">
        <h1 className="font-bold text-lg">News and Articles</h1>
    </div>
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
      {newsItems.map((item, index) => (
        <Card key={index} className="flex flex-col h-full">
          <img src={item.image} alt={item.headline} className="w-full h-48 object-cover rounded-t-md" />
          <CardHeader className="h-24 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">{item.headline}</h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">{item.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-end">
            <div className="flex flex-col text-xs text-muted-foreground">
              <div className="flex items-center">
                <UserIcon className="w-3 h-3 mr-1" />
                <span>{item.activated}</span>
              </div>
              <div className="flex items-center mt-1">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>{item.lastUpdated}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">Start process</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
    </>
  )
}