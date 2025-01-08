import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useTranslations } from "next-intl"
  

export default function ProductsServicesTable(){
    const t = useTranslations('reporting-com')
    return (
        <>
        <Table>
            <TableCaption>{t("Details of business activities (accounting for 90% of the turnover)")}
            </TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">{t("Invoice")}</TableHead>
                <TableHead>{t("Status")}</TableHead>
                <TableHead>{t("Method")}</TableHead>
                <TableHead className="text-right">{t("Amount")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>{t("Paid")}</TableCell>
                <TableCell>{t("Credit Card")}</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </>
    )
}