import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { getFrameworks } from "@/lib/assessments/data";
import { createCdpAssessment } from "@/lib/frameworks/action";
import { useTranslations } from "next-intl";

export default async function CreateCdpAssessmentForm(){
    const t = useTranslations("reporting-com")
    // const frameworks = await getFrameworks();
    return (
        <form action={createCdpAssessment}>
                <div className="grid w-full items-center gap-1.5 mb-2">
                    <Label htmlFor="year">{t("cdp.Year")}</Label>
                    <Input type="number" name="fyear" placeholder="2024"/>
                    {/* <div className="w-full">
                        <div>
                            <Label htmlFor="framework">Framework</Label>
                            <Select name="framework">
                                <SelectTrigger>
                                    <SelectValue placeholder="ESRS"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {frameworks?.map((item:any) =>(
                                        <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div> */}
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                {t("cdp.Create Assessment")}
                            </Button>
                            </DialogClose>                        
                        </div>
                    </div>
                </div>
            </form>
    )
};