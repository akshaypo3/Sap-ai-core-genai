import React from "react";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { getGroupsWithUsers } from "@/lib/settings/users/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddUserButton } from "@/components/settings/users/buttons";
import { ChangeGroupButton } from "@/components/settings/groups/buttons";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { getUserGroups, otherGroupusers } from "@/lib/settings/users/data";

export default async function roleDetailsPage({
  params,
}: {
  params: { groupid: string };
}) {
  const { groupid } = await params;
  const groupDetails = await getGroupsWithUsers(groupid);
  const groupData = groupDetails;
  // console.log("groupDetails", groupData);

  if (!groupDetails) {
    // return notFound();
  }

  const t = await getTranslations('settings');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("groups.Dashboard") },
    { href: "/settings/users", text: t("groups.Users") }
  ];

  const getUserGroupsInstance = await getUserGroups()
  const otherGroupusersInstance = await otherGroupusers(groupid)
  return (
    <>
      <ContentLayout title={t("groups.Group title")}>
        <div className="mb-8 p-8 flex flex-col space-y-4 bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={t("groups.Group Details")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        </div>
        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
          <Table className="min-w-full">
            <TableCaption className="text-left font-medium text-lg">
              {/* User List by Role */}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableHead className="font-medium text-left py-4 px-6">
                {t("groups.Username")}
                </TableHead>
                <TableHead className="font-medium text-left py-4 px-6">
                {t("groups.Email")}
                </TableHead>
                <TableHead className="font-medium text-left py-4 px-6">
                {t("groups.Created")}
                </TableHead>
                <TableHead className="font-medium text-left py-4 px-6">
                {t("groups.Group Assigned")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Iterate over each role */}
              {groupData?.map((group) =>
                group.users && group.users.length > 0 ? (
                  group.users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <TableCell className="py-4 px-6">
                        {user.username}
                      </TableCell>
                      <TableCell className="py-4 px-6">{user.email}</TableCell>
                      <TableCell className="py-4 px-6">
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="py-4 px-6">{group.group}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={group.id}>
                    <TableCell colSpan={3} className="text-center py-4 px-6">
                    {t("groups.No users")}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
          <div className="flex items-center">
            <ChangeGroupButton id={groupid} otherGroupusers={otherGroupusersInstance} getUserGroups={getUserGroupsInstance}/>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
