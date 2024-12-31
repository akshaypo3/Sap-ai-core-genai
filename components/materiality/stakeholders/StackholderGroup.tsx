import React from "react";
import { getTranslations } from "next-intl/server";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { getStakeholderGroups } from "@/lib/stakeholders/data";
import { AddStakeholderGroupButton } from "./AddGroupButton";


export default async function Stackholdergroup(id:any) {
    const stakeholderGroups = await getStakeholderGroups();
    const t = await getTranslations("materiality");
  return (
    <>
<div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
          {/* <Button className="bg-green-600 mb-5">Add Group</Button> */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
          Stakeholders Groups
          </h3>
          <AddStakeholderGroupButton id={id}/>
        </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("stakeholders.name")}</TableHead>
                <TableHead>{t("stakeholders.description")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stakeholderGroups?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.group}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        </>
          );
        }
        