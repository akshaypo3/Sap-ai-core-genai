import { createClient } from "@/utils/supabase/server";

export async function getFEFrameworkById(frameworkId:string) {
    const supabase = createClient();

    const { data: frameworks } = await supabase
    .from("fe_frameworks")
    .select()
    .eq("id", frameworkId)
    .single()

    return frameworks;
  }