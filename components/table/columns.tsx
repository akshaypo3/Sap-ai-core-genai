"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DeleteUserButton, EditUserButton } from "@/components/settings/users/buttons";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type User = {
  userId: string;
  name: string;
  email: string;
  group?: { group: string };
  role?: { role: string };
  createdAt: string;
  lastSignInAt?: string;
};
export type Role = {
    id: string;          // Assuming each role has a unique ID
    role: string;       // Role name
    description: string; // Role description
    user_count: number;  // Number of users associated with this role
  };
  export type Group = {
    id: string;
    group: string;
    description: string;
    user_count: number;
  };
  export type ActivityLog = {
    id: string;
    created_at: string; // ISO string format
    user: string;
    activity: string;
  };
  export type File = {
    id: string;
    name: string;
    created_at: string;
  };
  export type Goal = {
    id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    progress: number;
    owner: string;
    status: string;
  };
  export type GoalActivityLog = {
    id: string;
    created_at: string;
    user: string;
    activity: string;
  };
  export type Location = {
    id: string;
    name: string;
    description: string;
    address: string;
    postalcode: string;
    city: string;
    country: string;
    employee_count: string;
  };
  export type Product = {
    id: string;
    name: string;
    type: string;
    description: string;
    turnover_percentage: number;
  };
  export type Task = {
    id: string;
    title: string;
    description: string;
    assigned_to_username: string;
    created_by_username: string;
    status: string;
    start_date: string;
    due_date: string;
  };
  export type TaskLog = {
    id: string;
    created_at: string;
    user: string;
    activity: string;
  };

export const columns_user: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.getValue("name") || "NA"}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  ,
  {
    accessorKey: "group",
    header: "Group",
    cell: ({ row }) => <span>{row.getValue("group")?.group || "No Group"}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <span>{row.getValue("role")?.role || "No Role"}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => <span>{new Date(row.getValue("createdAt")).toLocaleDateString()}</span>,
  },
  {
    accessorKey: "lastSignInAt",
    header: "Last Sign In",
    cell: ({ row }) => (
      <span>
        {row.getValue("lastSignInAt")
          ? new Date(row.getValue("lastSignInAt")).toLocaleDateString()
          : "Never Signed In"}
      </span>
    ),
  },
  {
    accessorKey: "userId",
    header: "UID",
    cell: ({ row }) => <span>{row.getValue("userId")}</span>,
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex justify-center space-x-2">
        {/* <DeleteUserButton id={row.getValue("userId")}/> */}
      </div>
    ),
  },
  {
    header: "Edit",
    cell: ({ row }) => (
      <div className="flex justify-center space-x-2">
        {/* <EditUserButton id={row.getValue("userId")} /> */}
      </div>
    ),
  },
];

export const columns_role: ColumnDef<Role>[] = [
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span>{row.getValue("role")}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description")}</span>,
    },
    {
      accessorKey: "user_count",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Users Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue("user_count")}</span>,
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
        {/* <RoleDetailsButton roleid={row.getValue("id")} /> */}
        </div>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          {/* <DeleteRoleButton id={row.getValue("id")} /> */}
        </div>
      ),
    },
  ];

  export const columns_group: ColumnDef<Group>[] = [
    {
      accessorKey: "group",
      header: "Name",
      cell: ({ row }) => <span>{row.getValue("group") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description") || "No Description"}</span>,
    },
    {
      accessorKey: "user_count",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Users Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="text-center">{row.getValue("user_count")}</span>,
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {/* <GroupDetailsButton groupid={row.getValue("id")} /> */}
        </div>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {/* <DeleteGroupButton id={row.getValue("id")} /> */}
        </div>
      ),
    },
  ];
  export const columns_activity: ColumnDef<ActivityLog>[] = [
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span>
          {new Date(row.getValue("created_at"))
            .toLocaleDateString("en-GB")
            .replace(/\//g, ".")}
             &nbsp;
            {new Date(row.getValue("created_at")).toLocaleTimeString("en-GB", {
            hour12: false,
          })}
        </span>
      ),
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => <span>{row.getValue("user")}</span>,
    },
    {
      accessorKey: "activity",
      header: "Activity",
      cell: ({ row }) => <span>{row.getValue("activity")}</span>,
    },
  ];

  export const columns_file: ColumnDef<File>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id") || "NA"}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
  },
  {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span>
          {new Date(row.getValue("created_at"))
            .toLocaleDateString("en-GB")
            .replace(/\//g, ".")}
             &nbsp;
            {new Date(row.getValue("created_at")).toLocaleTimeString("en-GB", {
            hour12: false,
          })}
        </span>
      ),
    },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {/* <DownloadFileButton name={row.getValue("name")} /> */}
      </div>
    ),
  },
];

export const columns_goal: ColumnDef<Goal>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="font-medium">{row.getValue("description") || "NA"}</span>,
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ row }) => <span className="font-medium">{row.getValue("start_date") || "NA"}</span>,
    },
    {
      accessorKey: "end_date",
      header: "End Date",
      cell: ({ row }) => <span className="font-medium">{row.getValue("end_date") || "NA"}</span>,
    },
    {
      accessorKey: "progress",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Progress
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">{row.getValue("progress") || 0} %</span>,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => <span className="font-medium">{row.getValue("owner") || "NA"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("status") ? "Completed" : "In Progress"}</span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {/* <ViewGoalButton goalId={row.getValue("id")} /> */}
        </div>
      ),
    },
  ];
  export const columns_activity_goal: ColumnDef<GoalActivityLog>[] = [
    {
        accessorKey: "created_at",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span>
            {new Date(row.getValue("created_at"))
              .toLocaleDateString("en-GB")
              .replace(/\//g, ".")}
               &nbsp;
              {new Date(row.getValue("created_at")).toLocaleTimeString("en-GB", {
              hour12: false,
            })}
          </span>
        ),
      },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => <span className="font-medium">{row.getValue("user") || "NA"}</span>,
    },
    {
      accessorKey: "activity",
      header: "Activity",
      cell: ({ row }) => <span className="font-medium">{row.getValue("activity") || "NA"}</span>,
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {/* <ViewGoalActivityButton activityId={row.getValue("id")} /> */}
        </div>
      ),
    },
  ];
  export const columns_location: ColumnDef<Location>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Type",
      cell: ({ row }) => <span>{row.getValue("description") || "NA"}</span>,
    },
    {
      accessorKey: "address",
      header: "Street",
      cell: ({ row }) => <span>{row.getValue("address") || "NA"}</span>,
    },
    {
      accessorKey: "postalcode",
      header: "Postal Code",
      cell: ({ row }) => <span>{row.getValue("postalcode") || "NA"}</span>,
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => <span>{row.getValue("city") || "NA"}</span>,
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => <span>{row.getValue("country") || "NA"}</span>,
    },
    {
      accessorKey: "employee_count",
      header: "Employees",
      cell: ({ row }) => <span>{row.getValue("employee_count") || "NA"}</span>,
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <div className="flex justify-end">
          {/* <Link href={`/materiality/company/location/${row.getValue("id")}`}>
            <Button className="p-2">
              <span className="sr-only">View</span>
              <ZoomIn className="w-4" />
            </Button>
          </Link>
          <DeleteLocationButton location={row.original} /> */}
        </div>
      ),
    },
  ];
  export const columns_product: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.getValue("name") || "NA"}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span>{row.getValue("type") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description") || "NA"}</span>,
    },
    {
      accessorKey: "turnover_percentage",
      header: () => <span className="text-center">% of Turnover</span>,
      cell: ({ row }) => <span className="text-center">{row.getValue("turnover_percentage") || "NA"}</span>,
    },
    {
      header: "Details",
      cell: ({ row }) => (
        <div className="flex justify-end">
          {/* <DeleteProductButton product={row.original} /> */}
        </div>
      ),
    },
  ];

  export const columns_task: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <span className="font-medium">{row.getValue("title") || "NA"}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="font-medium">{row.getValue("description") || "NA"}</span>,
    },
    {
      accessorKey: "assigned_to_username",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assigned to
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">{row.getValue("assigned_to_username") || "NA"}</span>,
    },
    {
      accessorKey: "created_by_username",
      header: "Created by",
      cell: ({ row }) => <span className="font-medium">{row.getValue("created_by_username") || "NA"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span className="font-medium">{row.getValue("status") || "NA"}</span>,
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ row }) => (
        <span>
          {new Date(row.getValue("start_date")).toLocaleDateString("en-GB").replace(/\//g, ".")}
        </span>
      ),
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => (
        <span>
          {new Date(row.getValue("due_date")).toLocaleDateString("en-GB").replace(/\//g, ".")}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {/* <ViewTaskButton taskId={row.getValue("id")} /> */}
        </div>
      ),
    },
  ];

  export const columns_task_log: ColumnDef<TaskLog>[] = [
    {
        accessorKey: "created_at",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span>
            {new Date(row.getValue("created_at"))
              .toLocaleDateString("en-GB")
              .replace(/\//g, ".")}
               &nbsp;
              {new Date(row.getValue("created_at")).toLocaleTimeString("en-GB", {
              hour12: false,
            })}
          </span>
        ),
      },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => <span>{row.getValue("user") || "NA"}</span>,
    },
    {
      accessorKey: "activity",
      header: "Activity",
      cell: ({ row }) => <span>{row.getValue("activity") || "NA"}</span>,
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {/* <ViewTaskActivityButton activityId={row.getValue("id")} /> */}
        </div>
      ),
    },
  ];