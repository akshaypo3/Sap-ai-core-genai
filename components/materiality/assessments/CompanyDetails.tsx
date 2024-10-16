import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCompanyDetails } from "@/lib/company/data";
import { saveCompanyDetails } from "@/lib/company/action";
import { getTranslations } from "next-intl/server";

export default async function CompanyDetails() {
  const supabase = createClient();
  const t = await getTranslations("materiality");
  const companyDetails = await getCompanyDetails();

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">{t("company.title")}</h3>
        </div>
        <div className="my-10">
          <form action={saveCompanyDetails}>
            <input
              type="hidden"
              name="company_id"
              placeholder={companyDetails[0].id}
            />
            <Label htmlFor="companyname">{t("company.companyName")}</Label>
            <Input
              type="text"
              name="companyname"
              placeholder={companyDetails[0].name}
            />
            <Label htmlFor="company_strategy">
              {t("company.companyStrategy")}
            </Label>
            <Textarea
              id="company_strategy"
              name="company_strategy"
              placeholder={companyDetails[0].company_strategy}
            />
            <Label htmlFor="business_model">{t("company.businessModel")}</Label>
            <Textarea
              id="business_model"
              name="business_model"
              placeholder={companyDetails[0].business_model}
            />
            <div className="flex">
              <Button className="mt-5 justify-end">
                {t("company.updateDetails")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
