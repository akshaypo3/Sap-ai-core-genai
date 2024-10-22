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
import { DataTable } from "@/components/table/data-table"; 
import { columns_user } from "@/components/table/UsersTableColumns";
import { columns_role } from "@/components/table/RolesTableColumns";
import { columns_group } from "@/components/table/GroupsTableColumns";
import { columns_activity } from "@/components/table/UsersActivityLogsTableColumns";
import { AddRoleButton } from "@/components/settings/roles/buttons";
import { AddGroupButton } from "@/components/settings/groups/buttons";
import { getTimeZone} from "@/lib/settings/timezone/data";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

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
  const enhancedData = AllData.map(user => ({
    ...user,
    allGroups: userGroups,
    allRoles: allRoles,
    currentGroup: user.group?.group, // Current user's group
    currentRole: user.role?.role,     // Current user's role
  }));
  
  
  const timezone = await getTimeZone({ userId: user.id })
  const actualTime = timezone.userWithTimezone.timezone
  // console.log("roleUserCount", rolesData);
  
  const t = await getTranslations('settings');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("users.Dashboard") },
    { href: "/settings/users", text: t("users.Users") }
  ];
  return (
    <>
      <ContentLayout title={t("users.title")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={t("users.User Management")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
          {/* <div className="flex space-x-4">
            Button Section for Subheader
            <Button variant="outline">Add new</Button>
          </div> */}
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
              <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_user} data={enhancedData} filter={'name'} sort={'Email'}/>
                </div>
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
                <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_role} data={rolesData} filter={'role'} sort={'Users Count'}/>
                </div>
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
              <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_group} data={groupsData} filter={'group'} sort={'Users Count'}/>
                </div>
            </TabsContent>
          </div>

          <TabsContent value="portalusers">{t("users.Portal Users")}</TabsContent>
          <TabsContent value="activitylog">
            <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
            <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_activity} data={activityLogs} filter={'user'} sort={'Created At'}/>
                </div>
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
