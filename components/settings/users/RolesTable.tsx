import { DataTable } from "@/components/table/data-table";
import { columns_role } from "@/components/table/RolesTableColumns";
import { AddRoleButton } from  "@/components/settings/roles/buttons"
import { getTranslations } from "next-intl/server";

export default async function RolesTable({rolesData}){
    const t = await getTranslations();
    return(
        <>
            <div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
                <h3 className="text-xl font-semibold">
                    {t("Roles")}
                </h3>
                    <AddRoleButton />
                </div>
                <div className="min-w-full table-auto border-collapse">
                    <DataTable columns={columns_role} data={rolesData} filter={'role'} sort={'Users Count'}/>
                </div>
            </div>
        </>
    )
}