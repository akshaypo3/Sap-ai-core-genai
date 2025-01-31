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
import { getRolesWithUsers, otherRoleusers, getRoles } from "@/lib/settings/users/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangeRoleButton } from "@/components/settings/roles/buttons";
import { getTranslations } from 'next-intl/server';
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { userrolecheck } from "@/lib/settings/users/action";

export default async function roleDetailsPage({
  params,
}: {
  params: { roleid: string };
}) {
  const { roleid } = await params;
  const roleDetails = await getRolesWithUsers(roleid);
  const roleData = roleDetails;
  const otherUsersDetails = await otherRoleusers(roleid);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
 if (!user) {
    return redirect("/login");
  }
  const roleforpage=user.user_metadata.roles || "other"
  

if (roleforpage === "Stakeholder" || typeof roleforpage === 'undefined') {
  return redirect("/portal/dashboard")
}
  //console.log("roleDetails", roleData);

  if (!roleDetails) {
    // return notFound();
  }
  const t = await getTranslations('settings');
  const breadcrumbs = [
    { href: "/dashboard/", text: t("roles.Dashboard") },
    { href: "/settings/users", text: t("roles.Users") }
  ];

  const otherRoleusersInstance = await otherRoleusers(roleid)
  const getRolesInstance = await getRoles()
  return (
    <>
      <ContentLayout title={t("roles.title")}>
        <div className="mb-8 p-8 flex flex-col space-y-4 bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={t("roles.Role Details")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
        </div>
        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
          <Table className="min-w-full">
            <TableCaption className="text-left font-medium text-lg">
              {/* User List by Role */}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableHead className="font-medium text-left py-4 px-6">
                  {t("roles.Username")}
                </TableHead>
                <TableHead className="font-medium text-left py-4 px-6">
                  {t("roles.Email")}
                </TableHead>
                <TableHead className="font-medium text-left py-4 px-6">
                  {t("roles.Created")}
                </TableHead>
                <TableHead className="font-medium text-left py-4 px-6">
                  {t("roles.Role Assigned")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Iterate over each role */}
              {roleData?.map((role) =>
                role.users && role.users.length > 0 ? (
                  role.users.map((user) => (
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
                      <TableCell className="py-4 px-6">{role.role}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={role.id}>
                    <TableCell colSpan={3} className="text-center py-4 px-6">
                       {t("roles.No users")}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
          <div className="flex items-center">
            <ChangeRoleButton id={roleid} otherRoleusers={otherRoleusersInstance} getRoles={getRolesInstance}/>
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
