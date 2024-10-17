import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Droplets, Recycle } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Component() {

  const t = useTranslations("dashboard-component")
  return (
    <div className="w-full mx-auto space-y-6 pt-5">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{t("Overall Reporting Progress 2024")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{t("71% Complete")}</span>
              <span className="text-sm text-muted-foreground">100%</span>
            </div>
            <Progress value={71} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Carbon Footprint Reduction")}</CardTitle>
            <Leaf className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-15%</div>
            <Progress value={75} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t("75% of goal achieved")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Water Conservation")}</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t("2_5M")}</div>
            <Progress value={62} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t("62% of goal achieved")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Waste Recycled")}</CardTitle>
            <Recycle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t("n_a %")}</div>
            <Progress value={85} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t("Datapoint not filled out")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}