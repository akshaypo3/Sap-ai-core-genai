import { DataTable } from "@/components/table/data-table";
import { columns_group } from "@/components/table/GroupsTableColumns";
import { AddGroupButton } from "@/components/settings/groups/buttons";
import { getTranslations } from "next-intl/server";

 
export default async function GrouptsTable({groupsData}){
    const t = await getTranslations();
    return(
        <>
            <div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
                <h3 className="text-xl font-semibold">
                    {t("Groups")}
                </h3>
                    <AddGroupButton />
                </div>
                <div className="min-w-full table-auto border-collapse">
                    <DataTable columns={columns_group} data={groupsData} filter={'group'} sort={'Users Count'}/>
                </div>
            </div>
        </>
    )
}