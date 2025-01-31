import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout-datahub";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react"
import DataHub from "@/components/datahub/DataHub";
import { userrolecheck } from "@/lib/settings/users/action";

export default async function Home() {
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

  return (
    <ContentLayout title="Connections">
      <div style={{ height: 'calc(100vh - 175px)', width: '100%' }}>
        <DataHub />
      </div>
    </ContentLayout>
  );
}