import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Text,
  CircleArrowRight,
  Users,
  CalendarDays,
  Rows4,
  SquarePen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTasks } from "@/lib/task/data";

export default async function TaskList() {
  const tasks = await getTasks();
  const formatStatus = (status: string) => {
    switch (status) {
      case "TODO":
        return "TODO";
      case "IN_PROGRESS":
        return "IN PROGRESS";
      case "NEEDS_CLARIFICATION":
        return "NEEDS CLARIFICATION";
      case "DONE":
        return "DONE";
      default:
        return status;
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70px]">
            <div className="flex items-center space-x-1">
              <Text className="size-4 me-1" />
              <span>Title</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center space-x-1">
              <Rows4 className="size-4 me-1" />
              <span>Description</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center space-x-1">
              <Users className="size-4 me-1" />
              <span>Assigned to</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center space-x-1">
              <Users className="size-4 me-1" />
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
              <span>Due Date</span>
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center space-x-1">
              <SquarePen className="size-4 me-1" />
              <span>Updated At</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            {/* <TableCell>{item.description}</TableCell> */}
            <TableCell>
              {item.description.split(" ").slice(0, 4).join(" ")}
              <span className="block">
                {item.description.split(" ").slice(4).join(" ")}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-1">
                <Avatar className="w-7 h-7 border me-1">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
                {item.assigned_to?.username || "N/A"}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-1">
                <Avatar className="w-7 h-7 border me-1">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
                {item.created_by?.username || "N/A"}
              </div>
            </TableCell>
            <TableCell>
              {item.status && (
                <Badge
                  className={
                    item.status === "TODO"
                      ? "bg-blue-400"
                      : item.status === "IN_PROGRESS"
                      ? "bg-orange-400"
                      : item.status === "NEEDS_CLARIFICATION"
                      ? "bg-slate-400"
                      : item.status === "DONE"
                      ? "bg-green-400"
                      : ""
                  }
                >
                  {formatStatus(item.status)}
                </Badge>
              )}
            </TableCell>
            <TableCell>{item.start_date}</TableCell>
            <TableCell>{item.due_date}</TableCell>
            <TableCell>{item.updated_at.split("T")[0]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
