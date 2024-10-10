import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { useTranslations } from 'next-intl';
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { EditProfileButton } from "@/components/settings/users/buttons";
import { getProfile } from "@/lib/settings/users/data";

async function getData() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile();
  return profile[0] || {};
}

export default async function Home() {
  const profile = await getData();
  
  return (
    <AccountPage profile={profile} />
  );
}

function AccountPage({ profile }) {
  const t = useTranslations('account');

  return (
    <ContentLayout title={t("title")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">{t("title")}</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">{t("breadcrumb.dashboard")}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/account">{t("breadcrumb.account")}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="mb-8 p-10 bg-white dark:bg-neutral-950 rounded-md border">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{t("profile.title")}</h2>
        </div>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6 bg-gray-400 "></div>
        
        {['username', 'email', 'group', 'role', 'id'].map((field) => (
          <div key={field} className="space-y-2 m-4">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t(`profile.${field}`)}
            </label>
            <input 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={t(`profile.placeholder.${field}`)}
              name={field}
              value={profile[field] || profile[`user${field.charAt(0).toUpperCase() + field.slice(1)}`] || profile[`Test_${field.charAt(0).toUpperCase() + field.slice(1)}`]?.[field] || ''}
              readOnly
            />      
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
        <div className="flex items-center">
          <EditProfileButton data1={profile}/>
        </div>
      </div>    
    </ContentLayout>     
  );
}