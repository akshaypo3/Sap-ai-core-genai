"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function populateLonglist(assessmentId) {
  const supabase = createClient();
  console.log("Trying to populate for Assessment ID: " + assessmentId);

  try {
    const { data: esrsAr16, error } = await supabase.from('esrs_ar16').select();
    
    if (error) {
      throw new Error("Error fetching data from esrs_ar16: " + error.message);
    }

    if (esrsAr16.length === 0) {
      console.log("No data found in esrs_ar16.");
      return;
    }

    const insertPromises = esrsAr16.map((element) => {
      return supabase.from('esrs_iros').insert({
        code: element.esrs_code,
        topic: element.topic,
        sub_topic: element.sub_topic,
        sub_sub_topic: element.sub_sub_topic,
        assessment_id: assessmentId,
        esrs_id: element.esrs_id
      });
    });

    const results = await Promise.all(insertPromises);

    results.forEach((result, index) => {
      if (result.error) {
        console.error(`Error inserting record ${index + 1}: `, result.error.message);
      } else {
        console.log(`Successfully inserted record ${index + 1} into esrs_iros`);
      }
    });

  } catch (error) {
    console.error("Error while populating esrs_iros: ", error.message);
  }
}

export async function createAssessment(formData: FormData) {
  const supabase = createClient();

  const year = formData.get("year");
  const framework = formData.get("framework");

  console.log("Year: " + year + " Framework: " + framework);

  try {
    const { data: newAssessment, error } = await supabase.from('materialityassessments').insert(
      {
        fyear: year,
        framework_id: framework
      }
    ).select('id');

    if (error) {
      throw new Error("Error creating assessment: " + error.message);
    }

    const newAssessmentId = newAssessment[0].id;

    console.log("Created Assessment: " + JSON.stringify(newAssessment));

    await populateLonglist(newAssessmentId);

  } catch (error) {
    console.error("Error while adding assessment: ", error.message);
  } finally {
    revalidatePath('/materiality/assessments');
    redirect('/materiality/assessments');
  }
}