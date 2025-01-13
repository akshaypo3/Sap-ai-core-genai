import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { getTranslations } from 'next-intl/server'; // Updated import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, MailIcon, PhoneIcon, BookOpenIcon, Slash } from "lucide-react";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Use getTranslations to fetch translations
  const t = await getTranslations('support');
  const breadcrumbs = [
    { href: "/dashboard/", text: t('breadcrumb.dashboard') },
    { href: "/help/guidance", text: t('breadcrumb.help') },
    { href: "/help/support", text: t('breadcrumb.support')}
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
        <div className="bg-white dark:bg-black rounded-md border">
          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('searchPlaceholder')}
                  className="pl-10"
                />
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">{t('faq.title')}</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t('faq.questions.item1.question')}</AccordionTrigger>
                  <AccordionContent>{t('faq.questions.item1.answer')}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>{t('faq.questions.item2.question')}</AccordionTrigger>
                  <AccordionContent>{t('faq.questions.item2.answer')}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>{t('faq.questions.item3.question')}</AccordionTrigger>
                  <AccordionContent>{t('faq.questions.item3.answer')}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">{t('contact.title')}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MailIcon className="mr-2" />
                      {t('contact.email.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{t('contact.email.address')}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('contact.email.responseTime')}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PhoneIcon className="mr-2" />
                      {t('contact.phone.title')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{t('contact.phone.number')}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('contact.phone.availability')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('resources.title')}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center">
                  <BookOpenIcon className="mb-2" />
                  <span>{t('resources.userGuide')}</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center">
                  <BookOpenIcon className="mb-2" />
                  <span>{t('resources.videoTutorials')}</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center">
                  <BookOpenIcon className="mb-2" />
                  <span>{t('resources.bestPractices')}</span>
                </Button>
              </div>
            </section>
          </main>
        </div>
      </ContentLayout>
    </>
  );
}
