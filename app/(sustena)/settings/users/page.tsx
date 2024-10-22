import React, { Suspense } from 'react';
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Slash } from "lucide-react";
import { getAllUsers, getUserGroups, getActivityLog, getRoles, fetchUsersWithProfilesAndRoles, usercountForRole, usercountForGroups } from "@/lib/settings/users/data";
import { getTimeZone } from "@/lib/settings/timezone/data";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import UsersTable from '@/components/settings/users/UsersTable';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AddGroupButton } from '@/components/settings/groups/buttons';
import { DataTable } from '@/components/table/data-table';
import RolesTable from '@/components/settings/users/RolesTable';
import GrouptsTable from '@/components/settings/users/GroupsTable';
import ActivityLog from '@/components/settings/users/ActivityLog';
import { Users } from 'lucide-react';

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
    currentGroup: user.group?.group,
    currentRole: user.role?.role,
  }));

  const timezone = await getTimeZone({ userId: user.id });
  const actualTime = timezone.userWithTimezone.timezone;

  const t = await getTranslations('settings');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("users.Dashboard") },
    { href: "/settings/users", text: t("users.Users") }
  ];
  return (
    <>
      <ContentLayout title={t("users.title")}>
        <Suspense fallback={<div>Loading...</div>}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={t("users.User Management")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
          {/* <div className="flex space-x-4">
            Button Section for Subheader
            <Button variant="outline">Add new</Button>
          </div> */}
        </div>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users"><Users className="h-4 w-4 mr-2"/>{t("users.Users")}</TabsTrigger>
            <TabsTrigger value="roles">{t("users.Roles")}</TabsTrigger>
            <TabsTrigger value="groups">{t("users.Groups")}</TabsTrigger>
            <TabsTrigger value="activitylog">{t("users.Activity Log")}</TabsTrigger>
          </TabsList>
          <div className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 p-5 mt-1 border rounded-lg">
            <TabsContent value="users">
              <UsersTable enhancedData={enhancedData} />
            </TabsContent>
            <TabsContent value="roles">
              <RolesTable rolesData={rolesData} />
            </TabsContent>
            <TabsContent value="groups">
              <GrouptsTable groupsData={groupsData}/>
            </TabsContent>
            <TabsContent value="activitylog">
              <ActivityLog activityLogs={activityLogs}/>
            </TabsContent>
          </div>
        </Tabs>
        </Suspense>
      </ContentLayout>
    </>
  );
}
