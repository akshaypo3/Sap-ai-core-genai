import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserGroups } from "@/lib/settings/users/data";
import Link from "next/link";

import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createUser } from "@/lib/settings/users/action";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { DeleteGroupButton } from "@/components/settings/groups/buttons";
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
import { AddUserButton ,DeleteUserButton} from "@/components/settings/users/buttons";

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
                    <TableCell className="font-medium">{user.user_metadata?.full_name || 'NA '}</TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="font-medium">{user.role}</TableCell>
                    <TableCell className="font-medium">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{user.last_sign_in_at
                                ? new Date(user.last_sign_in_at).toLocaleDateString()
                                : "Never Signed In"}</TableCell> 
                    <TableCell className="font-medium">{user.user_metadata[0]}</TableCell>
                    <TableCell className="font-medium">{user.id}</TableCell>  
                    <TableCell><DeleteUserButton id={user.id}/> </TableCell>                       
                  </TableRow>

                ))}
              </TableBody>        
            </Table>
            </div>
            <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
              <div className="flex items-center">
              <AddUserButton/>
              </div>
            </div>
              </TabsContent>
              <TabsContent value="roles">Roles</TabsContent>
              <TabsContent value="groups">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Create Group</Button>
                  </DialogTrigger>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
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
                  <TableCaption>Groups</TableCaption>
                </Table>
              </TabsContent>
              <TabsContent value="portalusers">Portal Users</TabsContent>
              <TabsContent value="activitylog">Activity Log</TabsContent>
            </div>
          </Tabs>
    </ContentLayout>
    </>
  );
}
