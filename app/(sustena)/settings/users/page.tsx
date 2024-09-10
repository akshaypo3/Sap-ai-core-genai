import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserGroups } from "@/lib/settings/users/data";
import { getActivityLog } from "@/lib/settings/users/data";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AddGroupButton,
  DeleteGroupButton,
} from "@/components/settings/groups/buttons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slash } from "lucide-react";
import { getAllUsers } from "@/lib/settings/users/data";
import {
  AddUserButton,
  DeleteUserButton,
} from "@/components/settings/users/buttons";
import { getUserInfo } from "@/lib/settings/users/data";


export default async function Home() {
  const supabase = createClient();
  const userData = await getUserInfo(); 
  const userEmail= userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf('@'));

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const users = await getAllUsers();
  const userGroups = await getUserGroups();
  const activityLogs = await getActivityLog();

  return (
    <>
      <ContentLayout title="User Management">
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">User Management</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/settings/users">Users</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex space-x-4">
            {/* Button Section for Subheader */}
            {/* <Button variant="outline">Add new</Button> */}
          </div>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="portalusers">Portal Users</TabsTrigger>
            <TabsTrigger value="activitylog">Activity Log</TabsTrigger>
          </TabsList>
          <div className="bg-white p-5 border rounded">
            <TabsContent value="users">
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Sign In</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>UID</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.user_metadata?.full_name || "NA "}
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.email}
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.role}
                        </TableCell>
                        <TableCell className="font-medium">
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.last_sign_in_at
                            ? new Date(
                                user.last_sign_in_at,
                              ).toLocaleDateString()
                            : "Never Signed In"}
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.user_metadata[0]}
                        </TableCell>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <DeleteUserButton id={user.id} />{" "}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
                <div className="flex items-center">
                  <AddUserButton />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="roles">Roles</TabsContent>
            <TabsContent value="groups">
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userGroups?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.group}
                        </TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          <DeleteGroupButton id={item.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
                <div className="flex items-center">
                  <AddGroupButton />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="portalusers">Portal Users</TabsContent>
            <TabsContent value="activitylog">
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Activity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs?.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          {new Date(log.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(log.created_at).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>{userName}</TableCell>
                        <TableCell>{log.activity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </ContentLayout>
    </>
  );
}
