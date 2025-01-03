import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from 'next-intl/server';
import GuidanceBRSRPage from "@/components/guidance/GuidanceBRSRCom";

export default async function GuidaceBRSR() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const t = await getTranslations('guidance');
  
  return (
    <>
      <ContentLayout title={t('BRSR')}>
       <GuidanceBRSRPage/>
      </ContentLayout>
    </>
  );
}
