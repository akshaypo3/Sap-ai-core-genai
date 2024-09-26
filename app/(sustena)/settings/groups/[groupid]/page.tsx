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

export default async function roleDetailsPage({
  params,
}: {
  params: { groupid: string };
}) {
  const { groupid } = params;
  const groupDetails = await getGroupsWithUsers(groupid);
  const groupData = groupDetails;
  // console.log("groupDetails", groupData);

  if (!groupDetails) {
    // return notFound();
  }

  return (
    <>
      <ContentLayout title="Role Details">
        <div className="mb-8 p-8 flex flex-col space-y-4 bg-white dark:bg-neutral-950 rounded-md border">
          <div className="flex flex-col space-y-2">
            <h1 className="font-bold text-3xl mb-2">Group Details</h1>
            <Breadcrumb>
              <BreadcrumbList className="flex space-x-1">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/dashboard"
                    className="text-blue-600 hover:underline"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/settings/users"
                    className="text-blue-600 hover:underline"
                  >
                    Users
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
          <Table className="min-w-full">
            <TableCaption className="text-left font-medium text-lg">
              {/* User List by Role */}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableHead className="font-medium text-left py-4 px-6">
                  Username
                </TableHead>
                <TableHead className="font-medium text-left py-4 px-6">
                  Email
                </TableHead>
                <TableHead className="font-medium text-left py-4 px-6">
                  Created
                </TableHead>
                <TableHead className="font-medium text-left py-4 px-6">
                  Group Assigned
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
                      No users found for this Group.
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
          <div className="flex items-center">
            <ChangeGroupButton id={groupid} />
          </div>
        </div>
      </ContentLayout>
    </>
  );
}
