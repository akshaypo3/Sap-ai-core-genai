"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { getUserInfo } from "@/lib/settings/users/data";

export async function createAssessmentCBAM(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const cbamStatus = formData.get("cbamStatus")
  const framework = formData.get("framework")
  
  try {
    const { data, error } = await supabase
      .from('cbam_assessments')
      .insert({
        name: name,
        start_date: startDate,
        end_date: endDate,
        status: cbamStatus,
        framework : framework
      })
      .select();
 
    if (error) {
      throw new Error("Error while creating assessment: " + error.message);
    }

    revalidatePath("/reporting/CBAM");
  } catch (error) {
    console.error("Error while adding new assessment: ", error);
  }
}