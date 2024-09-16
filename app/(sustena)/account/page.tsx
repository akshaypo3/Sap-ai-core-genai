import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Slash } from "lucide-react";
import { EditProfileButton } from "@/components/settings/users/buttons";
import { getAllUsers,getUserGroups,getRoles,getProfile } from "@/lib/settings/users/data";


export default async function Home() {
  const supabase = createClient();
  const groups = await getUserGroups();
  const roles = await getRoles();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
    
  }

  const users = await getAllUsers();
  const profile = await getProfile();
  //console.log("profile",profile);
  
  
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  return (
    <>
      <ContentLayout title="Account">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Account</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/account">Account</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>       
      </div>

<div className="mb-8 p-10 bg-white dark:bg-neutral-950 rounded-md border">
    <div className="space-y-0.5"><h2 className="text-2xl font-bold tracking-tight">Profile</h2>
    </div>
    <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6 bg-gray-400 "></div>
    
<div className="space-y-2 m-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >Username</label>
      <input className="flex h-9 w-full rounded-md border border-input bg-transparent 
      px-3 py-1 text-sm shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
      disabled:opacity-50" placeholder="Username"  name="username"  value={profile[0]?.username || ""} />      
</div>

<div className="space-y-2 m-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >Email</label>
      <input className="flex h-9 w-full rounded-md border border-input bg-transparent 
      px-3 py-1 text-sm shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
      disabled:opacity-50" placeholder="you@example.com"  name="email" value={profile[0]?.userEmail || ""} />      
</div>
<div className="space-y-2 m-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Group</label>
      <input className="flex h-9 w-full rounded-md border border-input bg-transparent 
      px-3 py-1 text-sm shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
      disabled:opacity-50" placeholder="Group"  name="group"   value={profile[0]?.groups.group || ""} />      
</div>
<div className="space-y-2 m-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Role</label>
      <input className="flex h-9 w-full rounded-md border border-input bg-transparent 
      px-3 py-1 text-sm shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
      disabled:opacity-50" placeholder="Role"  name="role"  value={profile[0]?.Test_Role.role || ""} />      
</div>

<div className="space-y-2 m-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">ID</label>
      <input className="flex h-9 w-full rounded-md border border-input bg-transparent 
      px-3 py-1 text-sm shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed 
      disabled:opacity-50" placeholder="ID"  name="id" value={profile[0]?.id || ""} />      
</div>
</div>
<div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
<div className="flex items-center">
 <EditProfileButton data1={profile}/>
   </div>
   </div>    
</ContentLayout>     
 </>
  );
}
