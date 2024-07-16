import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
// import Subheader from "@/components/Subheader";


export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
    {/* <Subheader/> */}
    <div className="bg-white dark:bg-black p-5 border rounded">
      <div>This system is still Work-In-Progress. Please report any bugs to <a href="mailto: kevin.renner@vaspp.com">kevin.renner@vaspp.comm</a></div>
    </div>
    </>
  );
}
