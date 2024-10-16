"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useTranslations } from "use-intl"

export const description = (t) => t("A stacked bar chart with a legend")

const chartData = [
  { month: "A", desktop: 27, mobile: 0 },
  { month: "B", desktop: 0, mobile: 12 },
  { month: "C", desktop: 0, mobile: 107 },
]

const chartConfig = {
  desktop: {
    label: "Answered",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Not answered",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function ChartIndicatorOverview() {
  const t = useTranslations("reporting-com")
  const d = description(t)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Question Statistics")}</CardTitle>
        <CardDescription>{t("Report 2023")}</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[200px]">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          {t("Statistics of total questions answered, including not mandatory leadership indicators")}
        </div>
      </CardFooter>
    </Card>
  )
}
