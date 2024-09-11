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
import { getAllUsers, getUserInfo, getRoles } from "@/lib/settings/users/data";
import { createUser } from "@/lib/settings/users/action";
import {
  AddRoleButton,
  DeleteRoleButton,
} from "@/components/settings/roles/buttons";
import {
  AddUserButton,
  DeleteUserButton,
} from "@/components/settings/users/buttons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const users = await getAllUsers();
  const userGroups = await getUserGroups();
  const activityLogs = await getActivityLog();
  const allRoles = await getRoles();

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
            <TabsContent value="roles">
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                <AddRoleButton />
                <Table>
                  <TableCaption>Roles List</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Description</TableHead>
                      {/* <TableHead>Survey</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allRoles?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.role}
                        </TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>
                          <DeleteRoleButton id={item.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="groups">
              <Dialog>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                  </DialogHeader>
                  <form action={createUser}>
                    <div className="grid w-full items-center gap-1.5 mb-2">
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" name="name" />
                      <Label htmlFor="description">Description</Label>
                      <Input type="text" name="description" />
                      <div className="flex mt-5">
                        <div className="flex-auto">
                          <DialogClose asChild>
                            <Button className="w-full" type="submit">
                              Add Group
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <AddGroupButton />
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
            </TabsContent>
          </div>

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
                        {new Date(log.created_at)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, ".")}
                      </TableCell>
                      <TableCell>
                        {new Date(log.created_at).toLocaleTimeString("en-GB", {
                          hour12: false,
                        })}
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.activity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </ContentLayout>
    </>
  );
}
