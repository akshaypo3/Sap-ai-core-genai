import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getTranslations } from "next-intl/server";

export default async function StakeholderStatisticCards(){
    
    const t = await getTranslations("materiality");
    return(
        <>
        <div className="bg-white dark:bg-neutral-950 rounded-lg border mt-5 p-5">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("stakeholders.identified_stakeholders")}
                </CardTitle>
                {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                {/* <p className="text-xs text-muted-foreground">
                -4 from last year
              </p> */}
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("stakeholders.stakeholder_groups_engaged")}
                </CardTitle>
                {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                {/* <p className="text-xs text-muted-foreground">
                -1 from last year
              </p> */}
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("stakeholders.survey_completion_rate")}
                </CardTitle>
                {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                {/* <p className="text-xs text-muted-foreground">
                -100% from last year
              </p> */}
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("stakeholders.survey_response_rate")}
                </CardTitle>
                {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                {/* <p className="text-xs text-muted-foreground">
                -0% from last year
              </p> */}
              </CardContent>
            </Card>
          </div>
        </div>
        </>
    )
}