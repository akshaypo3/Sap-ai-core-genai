import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function changeTimezone(userId: any, newTimezone: any) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("user_profile")
      .update({ timezone: newTimezone })
      .eq("id", userId);

    if (error) {
      console.error("Error updating timezone:", error);
      return { error };
    }
    return { data };
  } catch (error) {
    console.error("Error while adding timezone", error);
  } 
}
