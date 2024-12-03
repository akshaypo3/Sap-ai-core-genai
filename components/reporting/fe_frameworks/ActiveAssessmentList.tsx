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

import { getActiveAssessmentsById } from "@/lib/frameworks/data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ActiveAssessmentList({
  activeFrameworkName,
  frameworkId,
}: {
  activeFrameworkName: string;
  frameworkId: string;
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

  const assessments = await getActiveAssessmentsById(frameworkId);

  return (
    <div className="border rounded p-5 mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center space-x-1">
                <Text className="size-4 me-1" />
                <span>Name</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <Rows4 className="size-4 me-1" />
                <span>Framework</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <UserIcon className="size-4 me-1" />
                <span>Created By</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <CircleArrowRight className="size-4 me-1" />
                <span>Status</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <CalendarDays className="size-4 me-1" />
                <span>Start Date</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <CalendarDays className="size-4 me-1" />
                <span>End Date</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <SquarePen className="size-4 me-1" />
                <span>Actions</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{activeFrameworkName}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Avatar className="w-7 h-7 border me-1">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  {item.username}
                </div>
              </TableCell>
              <TableCell>
                {item.status && (
                  <Badge
                    className={
                      item.status === "in_progress"
                        ? "bg-orange-400"
                        : item.status === "done"
                        ? "bg-green-400"
                        : ""
                    }
                  >
                    {formatStatus(item.status)}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{item.reporting_period_start}</TableCell>
              <TableCell>{item.reporting_period_end}</TableCell>
              <TableCell>
                <Button className="bg-green-500">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
