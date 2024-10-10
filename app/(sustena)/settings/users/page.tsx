import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
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
  // AddGroupButton,
  DeleteGroupButton,
  GroupDetailsButton,
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
import {
  getAllUsers,
  getUserInfo,
  getRoles,
  getUserGroups,
  getProfile,
  fetchUsersWithProfilesAndRoles,
  usercountForRole,
  usercountForGroups,
} from "@/lib/settings/users/data";
import { createUser } from "@/lib/settings/users/action";
import {
  // AddRoleButton,
  DeleteRoleButton,
  RoleDetailsButton,
} from "@/components/settings/roles/buttons";
import {
  AddUserButton,
  DeleteUserButton,
  EditUserButton,
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
import { AddRoleButton } from "@/components/settings/roles/buttons";
import { AddGroupButton } from "@/components/settings/groups/buttons";
import { getTimeZone} from "@/lib/settings/timezone/data";
import { getTranslations } from 'next-intl/server';

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
  const AllData = await fetchUsersWithProfilesAndRoles();
  const rolesData = await usercountForRole();
  const groupsData = await usercountForGroups();

  const timezone = await getTimeZone({ userId: user.id })
  const actualTime = timezone.userWithTimezone.timezone
  // console.log("roleUserCount", rolesData);

  const t = await getTranslations('settings');

  return (
    <>
      <ContentLayout title={t("users.title")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <div>
            <h1 className="font-bold text-2xl mb-2">{t("users.User Management")}</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">{t("users.Dashboard")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/settings/users">{t("users.Users")}</BreadcrumbLink>
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
            <TabsTrigger value="users">{t("users.Users")}</TabsTrigger>
            <TabsTrigger value="roles">{t("users.Roles")}</TabsTrigger>
            <TabsTrigger value="groups">{t("users.Groups")}</TabsTrigger>
            <TabsTrigger value="portalusers">{t("users.Portal Users")}</TabsTrigger>
            <TabsTrigger value="activitylog">{t("users.Activity Log")}</TabsTrigger>
          </TabsList>
          <div className="bg-white p-5 border rounded">
            <TabsContent value="users">
              <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
                <Table className="min-w-full table-auto border-collapse">
                  <TableHeader className="bg-gray-100">
                    <TableRow>
                      <TableHead className="px-6 py-3 text-left">
                        {t("users.Name")}
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left">
                        {t("users.Email")}
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left">
                        {t("users.Group")}
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left">
                        {t("users.Role")}
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left">
                        {t("users.Created")}
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left">
                        {t("users.Last Sign In")}
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left">{t("users.UID")}</TableHead>
                      <TableHead className="px-6 py-3 text-center">
                        {t("users.Action")}
                      </TableHead>
                      <TableHead className="px-6 py-3 text-center">
                        {t("users.Edit")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {AllData?.map((user) => (
                      <TableRow
                        key={user.userId}
                        className="border-b hover:bg-gray-50"
                      >
                        <TableCell className="px-6 py-4 font-medium whitespace-nowrap">
                          {user?.name || "NA "}
                        </TableCell>
                        <TableCell className="px-6 py-4 font-medium whitespace-nowrap">
                          {user.email}
                        </TableCell>
                        <TableCell className="px-6 py-4 font-medium whitespace-nowrap">
                          {user.group?.group || "No Group"}
                        </TableCell>
                        <TableCell className="px-6 py-4 font-medium whitespace-nowrap">
                          {user.role?.role || "No Role"}
                        </TableCell>
                        <TableCell className="px-6 py-4 font-medium whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString("en-GB",{ timeZone:actualTime
                          })}
                        </TableCell>
                        <TableCell className="px-6 py-4 font-medium whitespace-nowrap">
                          {user.lastSignInAt
                            ? new Date(user.lastSignInAt).toLocaleDateString("en-GB",{ timeZone:actualTime
                            })
                            : "Never Signed In"}
                        </TableCell>
                        <TableCell className="px-6 py-4 font-medium text-left whitespace-nowrap">
                          {user.userId}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-center">
                          <DeleteUserButton id={user} />{" "}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-center">
                          <EditUserButton id={user} />{" "}
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
                  <TableCaption>{/* Roles List */}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("users.Role")}</TableHead>
                      <TableHead>{t("users.Description")}</TableHead>
                      <TableHead style={{ textAlign: "left" }}>
                        {t("users.Users Count")}
                      </TableHead>
                      <TableHead>{t("users.Details")}</TableHead>
                      <TableHead>{t("users.Action")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rolesData?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.role}
                        </TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-center">
                          {item.user_count}
                        </TableCell>
                        <TableCell>
                          <RoleDetailsButton roleid={item.id} />
                        </TableCell>
                        <TableCell>
                          <DeleteRoleButton id={item} />
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
                    <DialogTitle>{t("users.Create New Group")}</DialogTitle>
                  </DialogHeader>
                  <form action={createUser}>
                    <div className="grid w-full items-center gap-1.5 mb-2">
                      <Label htmlFor="name">{t("users.Name")}</Label>
                      <Input type="text" name="name" />
                      <Label htmlFor="description">{t("users.Description")}</Label>
                      <Input type="text" name="description" />
                      <div className="flex mt-5">
                        <div className="flex-auto">
                          <DialogClose asChild>
                            <Button className="w-full" type="submit">
                              {t("users.Add Group")}
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
                    <TableHead>{t("users.Name")}</TableHead>
                    <TableHead>{t("users.Description")}</TableHead>
                    <TableHead className="text-center">{t("users.Users Count")}</TableHead>
                    <TableHead>{t("users.Details")}</TableHead>
                    <TableHead>{t("users.Action")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupsData?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.group}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-center">
                        {item.user_count}
                      </TableCell>
                      <TableCell>
                        <GroupDetailsButton groupid={item.id} />
                      </TableCell>
                      <TableCell>
                        <DeleteGroupButton id={item} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </div>

          <TabsContent value="portalusers">{t("users.Portal Users")}</TabsContent>
          <TabsContent value="activitylog">
            <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("users.Date")}</TableHead>
                    <TableHead>{t("users.Time")}</TableHead>
                    <TableHead>{t("users.User")}</TableHead>
                    <TableHead>{t("users.Activity")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogs?.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {new Date(log.created_at)
                          .toLocaleDateString("en-GB", {
                            timeZone:actualTime
                          })
                          .replace(/\//g, ".")}
                      </TableCell>
                      <TableCell>
                        {new Date(log.created_at).toLocaleTimeString("en-GB", {
                          timeZone:actualTime,
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
