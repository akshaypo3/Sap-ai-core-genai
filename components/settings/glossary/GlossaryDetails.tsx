import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTranslations } from "next-intl/server";
import { DataTable } from "@/components/table/data-table";
import { columns_glossary } from "@/components/table/glossaryTableColumns";
import { getGlossaryitems_de, getGlossaryitems_en } from "@/lib/settings/administration/data";
import { AddGlossaryButton } from "./buttons";


export default async function GlossaryDetails() {
  const supabase = await createClient();
  const glossaryItems_en = await getGlossaryitems_en();
  const glossaryItems_de = await getGlossaryitems_de();

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3">
        <Tabs defaultValue="english" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="english">English</TabsTrigger>
          <TabsTrigger value="deutsch">Deutsch</TabsTrigger>
        </TabsList>
        <div className="bg-white p-5 border rounded">
          <TabsContent value="english">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
          Glossary
          </h3>
          <AddGlossaryButton language={"English"}/>
        </div>
          <div className="min-w-full table-auto border-collapse">
          <DataTable columns={columns_glossary} data={glossaryItems_en} filter={"title"} sort={'Created At'}/>
          </div>
          </TabsContent>
          <TabsContent value="deutsch">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-md">
          <h3 className="text-xl font-semibold">
          Glossary
          </h3>
          <AddGlossaryButton language={"Deutsch"}/>
        </div>
          <div className="min-w-full table-auto border-collapse">
          <DataTable columns={columns_glossary} data={glossaryItems_de} filter={"title"} sort={'Created At'}/>
          </div>
          </TabsContent>
        </div>
        </Tabs>
      </div>
    </>
  );
}
