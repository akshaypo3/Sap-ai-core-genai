"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCdpAssessment(formData: FormData) {
    const supabase = createClient();
  
    const fyear = formData.get("fyear");
  
    try {
      const { data: newAssessment, error } = await supabase.from('cdp_assessments').insert(
        {
          fyear: fyear,
          step: 1,
        }
      ).select('id');
  
      if (error) {
        throw new Error("Error creating assessment: " + error.message);
      }
  
      // const newAssessmentId = newAssessment[0].id;
  
      console.log("Created cdp Assessment: " + JSON.stringify(newAssessment));
  
      // await populateLonglist(newAssessmentId);
  
    } catch (error) {
      console.error("Error while adding cdp assessment: ", error);
    } finally {
      revalidatePath('/reporting/frameworks/cdp');
      redirect('/reporting/frameworks/cdp');
    }
  }

  
export async function deleteCdpAssessmentWithId(id:string) {
    let assessmentId = id;
    const supabase = createClient();
  
    try {
      const { data, error } = await supabase
        .from('cdp_assessments')
        .delete()
        .eq('id', assessmentId)
        .select();
  
      if (error) {
        throw new Error(`Failed to delete cdp assessment: ${error.message}`);
      }
  
      if (data === null) {
        console.warn(`No assessment found with id: ${id}`);
      }
  
      console.log(`Successfully deleted cdp assessment with id: ${id}`);
  
      revalidatePath("/reporting/frameworks/cdp");
      // return { success: true, message: "Assessment deleted successfully" };
  
    } catch (error) {
      console.error("Error deleting assessment:", error);
      return { success: false, message: error };
    }
  }