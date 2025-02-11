import { DataTable } from "@/components/table/data-table";
import { columns_activity } from "@/components/table/UsersActivityLogsTableColumns";
import { getTranslations } from "next-intl/server";

export default async function ActivityLog({activityLogs}){
    const t = await getTranslations('settings-com');
    return(
        <>
            <div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
                <h3 className="text-xl font-semibold">
                    {t("Activity Log")}
                </h3>
                </div>
                <div className="min-w-full table-auto border-collapse">
                <DataTable columns={columns_activity} data={activityLogs} filter={'user'} sort={'Created At'}/>
                </div>
            </div>
        </>
    )
}