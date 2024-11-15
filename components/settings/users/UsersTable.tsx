import React, { Suspense } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns_user } from "@/components/table/UsersTableColumns";
import { AddUserButton } from "@/components/settings/users/AddUserButton";
import { useTranslations } from "next-intl";

const UsersTable = ({ enhancedData }) => {
  
  const t = useTranslations("settings-com");

  return (
    <>
      <div>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
          <h3 className="text-xl font-semibold">{t("Users")}</h3>
          <Suspense fallback="Loading">
            <AddUserButton />
          </Suspense>
        </div>
        <div className="min-w-full table-auto border-collapse">
          <Suspense fallback="Loading...">
            <DataTable
              columns={columns_user}
              data={enhancedData}
              filter={"name"}
              sort={"Email"}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
