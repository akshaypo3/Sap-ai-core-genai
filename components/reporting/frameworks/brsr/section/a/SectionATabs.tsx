import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailsTable from "@/components/reporting/frameworks/brsr/section/a/DetailsTable";


export default function SectionATabs(){
    return (
        <>
        <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Details of the listed entity</TabsTrigger>
              <TabsTrigger value="productsandservices">Products and Services</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
            </TabsList>
            <div className="bg-white p-5 border rounded">
                <TabsContent value="details">
                    <DetailsTable/>
                </TabsContent>
                <TabsContent value="productsandservices">Products and Services</TabsContent>
                <TabsContent value="operations">Operations</TabsContent>
                <TabsContent value="employees">Employees</TabsContent>
            </div>
          </Tabs>
          <Tabs defaultValue="details" className="w-full mt-10">
            <TabsList>
              <TabsTrigger value="subsidiary">Holding, Subsidiary and Associate Companies (including joint ventures)</TabsTrigger>
              <TabsTrigger value="csrdetails">CSR Details</TabsTrigger>
              <TabsTrigger value="transparency">Transparency and Disclosures Compliances</TabsTrigger>
            </TabsList>
            <div className="bg-white p-5 border rounded">
                <TabsContent value="subsidiary">Holding</TabsContent>
                <TabsContent value="csrdetails">CSR Details</TabsContent>
                <TabsContent value="transparency">Transparency and Disclosures Compliances</TabsContent>
            </div>
          </Tabs>
        </>
    )
}