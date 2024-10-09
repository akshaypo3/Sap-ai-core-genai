import { createClient } from "@/utils/supabase/server";

export async function getTimeZone({ userId }: { userId: string }) {
  const supabase = createClient();
  let initialTimezone = "UTC";

  const { data: userWithTimezone, error } = await supabase
    .from("user_profile")
    .select("timezone")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching users:", error);
    return {
      userWithTimezone: { timezone: initialTimezone },
      initialTimezone,
    };
  }

  return {
    userWithTimezone,
    initialTimezone: userWithTimezone?.timezone || initialTimezone,
  };
}
