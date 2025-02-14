import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Text,
  CircleArrowRight,
  CalendarDays,
  Rows4,
  SquarePen,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function AssessmentListCBAM({
  assessments,
}: {
  assessments: any;
}) {
  const formatStatus = (status: string) => {
    switch (status) {
      case "in_progress":
        return "IN PROGRESS";
      case "done":
        return "DONE";
      default:
        return status;
    }
  };

  const t = await getTranslations("reporting-com");
  return (
    <div className="border rounded p-5 mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center space-x-1">
                <Text className="size-4 me-1" />
                <span>{t("cbam.Name")}</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <Rows4 className="size-4 me-1" />
                <span>{t("cbam.Framework")}</span>
              </div>
            </TableHead>
            {/* <TableHead>
                <div className="flex items-center space-x-1">
                  <UserIcon className="size-4 me-1" />
                  <span>{t("cbam.Created By")}</span>
                </div>
              </TableHead> */}
            <TableHead>
              <div className="flex items-center space-x-1">
                <CircleArrowRight className="size-4 me-1" />
                <span>{t("cbam.Status")}</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <CalendarDays className="size-4 me-1" />
                <span>{t("cbam.Start Date")}</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <CalendarDays className="size-4 me-1" />
                <span>{t("cbam.End Date")}</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <SquarePen className="size-4 me-1" />
                <span>{t("cbam.Actions")}</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments?.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.framework}</TableCell>
              {/* <TableCell>
                  <div className="flex items-center space-x-1">
                    <Avatar className="w-7 h-7 border me-1">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    {item.username}
                  </div>
                </TableCell> */}
              <TableCell>
                {item.status && (
                  <Badge
                    className={
                      item.status === "in_progress"
                        ? "bg-orange-400 hover:bg-orange-400"
                        : item.status === "done"
                        ? "bg-green-400 hover:bg-green-400"
                        : ""
                    }
                  >
                    {formatStatus(item.status)}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(item.start_date).toLocaleDateString("en-CA")}
              </TableCell>
              <TableCell>
                {new Date(item.end_date).toLocaleDateString("en-CA")}
              </TableCell>
              <TableCell>
                <Link href={`/reporting/CBAM/${item.id}`}>
                  <Button
                    variant="outline"
                    className="bg-green-500 hover:bg-green-600 text-white hover:text-white"
                  >
                    {t("cbam.view")}
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
