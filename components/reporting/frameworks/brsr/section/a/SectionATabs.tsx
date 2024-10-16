import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailsTable from "@/components/reporting/frameworks/brsr/section/a/DetailsTable";
import { useTranslations } from "next-intl";


export default function SectionATabs(){
  const t = useTranslations("reporting-com")
    return (
        <>
        <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">{t("Details of the listed entity")}</TabsTrigger>
              <TabsTrigger value="productsandservices">{t("Products and Services")}</TabsTrigger>
              <TabsTrigger value="operations">{t("Operations")}</TabsTrigger>
              <TabsTrigger value="employees">{t("Employees")}</TabsTrigger>
            </TabsList>
            <div className="bg-white p-5 border rounded">
                <TabsContent value="details">
                    <DetailsTable/>
                </TabsContent>
                <TabsContent value="productsandservices">{t("Products and Services")}</TabsContent>
                <TabsContent value="operations">{t("Operations")}</TabsContent>
                <TabsContent value="employees">{t("Employees")}</TabsContent>
            </div>
          </Tabs>
          <Tabs defaultValue="details" className="w-full mt-10">
            <TabsList>
              <TabsTrigger value="subsidiary">{t("Holding, Subsidiary and Associate Companies (including joint ventures)")}</TabsTrigger>
              <TabsTrigger value="csrdetails">{t("CSR Details")}</TabsTrigger>
              <TabsTrigger value="transparency">{t("Transparency and Disclosures Compliances")}</TabsTrigger>
            </TabsList>
            <div className="bg-white p-5 border rounded">
                <TabsContent value="subsidiary">{t("Holding")}</TabsContent>
                <TabsContent value="csrdetails">{t("CSR Details")}</TabsContent>
                <TabsContent value="transparency">{t("t")}</TabsContent>
            </div>
          </Tabs>
        </>
    )
}