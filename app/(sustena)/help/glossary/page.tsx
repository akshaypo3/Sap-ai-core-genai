import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getGlossaryitems } from "@/lib/glossary/data";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTranslations } from 'next-intl/server'; // Updated import
import { Slash } from "lucide-react";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

export default async function Home() {
  const supabase = createClient();
  const glossaryItems = await getGlossaryitems();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Use getTranslations to fetch translations
  const t = await getTranslations('glossary');

  const breadcrumbs = [
    { href: "/dashboard/", text: t('breadcrumb.dashboard') },
    { href: "/help/glossary", text: t('breadcrumb.help') },
    { href: "/help/glossary", text: t('breadcrumb.glossary')}
  ];

  return (
    <>
      <ContentLayout title={t('title')}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
            <BreadCrumbCom title={t('title')} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
          {/* <div className="flex space-x-4">
            Button Section for Subheader
            <Button variant="outline">Add new</Button>
          </div> */}
        </div> 
        <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
          <Accordion type="multiple">
            {glossaryItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="font-bold">{item.title}</AccordionTrigger>
                <AccordionContent>
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ContentLayout>
    </>
  );
}
