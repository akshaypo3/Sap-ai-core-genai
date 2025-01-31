import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import { getTranslations } from 'next-intl/server';
import GuidanceBRSRPage from "@/components/guidance/GuidanceBRSRCom";
import { userrolecheck } from "@/lib/settings/users/action";

export default async function GuidaceBRSR() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const roleforpage=user.user_metadata.roles || "other"
  

if (roleforpage === "Stakeholder" || typeof roleforpage === 'undefined') {
  return redirect("/portal/dashboard")
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
