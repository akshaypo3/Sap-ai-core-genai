"use server"

import { createClient } from "@/utils/supabase/server";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addLocation(formData: FormData) {
    const supabase = await createClient();
  
    const location = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      type: formData.get('location_type') as string,
      address: formData.get('street') as string,
      postalcode: parseInt(formData.get('postalcode') as string),
      city: formData.get('city') as string,
      country: formData.get('country') as string,
      employee_count: formData.get('employee_count') as string,
      companyid: formData.get('companyid') as UUID,
      latitude:formData.get('latitude') as string,
      longitude :formData.get('longitude') as string,
      search_location :formData.get('autocomplete') as string,
    };
  
    const { data, error } = await supabase
      .from('company_locations')
      .insert([location])
      .select();
  
    if (error) {
      console.error('Error inserting location:', error);
      return { success: false, error: error.message };
    }
  
    revalidatePath('/materiality/company');
    redirect('/materiality/company')
    // return { success: true, data };
  }

  export async function addLocationAssessment(formData: FormData) {
    const supabase = await createClient();
  const assessmentId = formData.get('assessment_id') as string;
  
    const location = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      type: formData.get('location_type') as string,
      address: formData.get('street') as string,
      postalcode: parseInt(formData.get('postalcode') as string),
      city: formData.get('city') as string,
      country: formData.get('country') as string,
      employee_count: formData.get('employee_count') as string,
      companyid: formData.get('companyid') as UUID,
      latitude:formData.get('latitude') as string,
      longitude :formData.get('longitude') as string,
      search_location :formData.get('autocomplete') as string,
    };
  
    const { data, error } = await supabase
      .from('company_locations')
      .insert([location])
      .select();
  
    if (error) {
      console.error('Error inserting location:', error);
      return { success: false, error: error.message };
    }
  
   revalidatePath(`/materiality/assessments/${assessmentId}/2`);
    redirect(`/materiality/assessments/${assessmentId}/2`);
  }

  export async function addProductService(formData: FormData) {
    const supabase = await createClient();
  
    const productService = {
      type: formData.get('type') as string,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      turnover_percentage: parseFloat(formData.get('turnover_percentage') as string),
      companyid:formData.get('companyid') as string
    };
  
    const { data, error } = await supabase
      .from('products_services')
      .insert([productService])
      .select();
  
    if (error) {
      console.error('Error inserting product/service:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/materiality/company');
    redirect('/materiality/company')
    // return { success: true, data };
  }

  export async function addProductServiceAssessment(formData: FormData) {
    const supabase = await createClient();
    const assessmentId = formData.get('assessment_id');
  
    const productService = {
      type: formData.get('type') as string,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      turnover_percentage: parseFloat(formData.get('turnover_percentage') as string),
    };
  
    const { data, error } = await supabase
      .from('products_services')
      .insert([productService])
      .select();
  
    if (error) {
      console.error('Error inserting product/service:', error);
      return { success: false, error: error.message };
    }

    revalidatePath(`/materiality/assessments/${assessmentId}/3`);
    redirect(`/materiality/assessments/${assessmentId}/3`);
    // return { success: true, data };
  }

  export async function saveCompanyDetails(formData: FormData) {
    const supabase = await createClient();
    const companyId = formData.get('company_id');
  
    if (typeof companyId !== 'string') {
      throw new Error('Invalid company ID');
    }

    const companyDetails = {
      name: formData.get('companyname'),
      company_strategy: formData.get('company_strategy'),
      business_model: formData.get('business_model'),
    };

    for (const [key, value] of Object.entries(companyDetails)) {
      if (typeof value !== 'string') {
        throw new Error(`Invalid ${key}`);
      }
    }
  
    const { data, error } = await supabase
      .from('company_details')
      .update(companyDetails)
      .eq('id', companyId)
      .select();
  
    if (error) {
      console.error('Error updating company details:', error);
      throw error;
    }
   
    revalidatePath('/materiality/company');
    // return redirect('/materiality/company');
}

export async function saveCompanyDetailsFromAssessment(formData: FormData) {
  const supabase = await createClient();
  const companyId = formData.get('company_id');
  const assessmentId = formData.get('assessment_id');

  if (typeof companyId !== 'string') {
    throw new Error('Invalid company ID');
  }

  const companyDetails = {
    name: formData.get('companyname'),
    company_strategy: formData.get('company_strategy'),
    business_model: formData.get('business_model'),
  };

  for (const [key, value] of Object.entries(companyDetails)) {
    if (typeof value !== 'string') {
      throw new Error(`Invalid ${key}`);
    }
  }

  const { data, error } = await supabase
    .from('company_details')
    .update(companyDetails)
    .eq('id', companyId)
    .select();

  if (error) {
    console.error('Error updating company details:', error);
    throw error;
  }

  try {
    const { data } = await supabase
    .from('materialityassessments')
    .update({
      step: "2"
    })
    .eq('id', assessmentId)
    .select();
  } catch (error) {
    console.error('Error updating assessment details:', error);
    throw error;
  }

  revalidatePath(`/materiality/assessments/${assessmentId}/2`);
  redirect(`/materiality/assessments/${assessmentId}/2`);
}

export async function deleteCompanyLocationWithId(id:any){
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('company_locations').delete().eq('id',id);
    
    if(error){
      console.log("Error while deleting company location");
    }else{
      console.log("Successfully deleted location with id",id)
    }
  } catch (error) {
    console.log("Error while deleting company location");
  } finally{
    revalidatePath('/materiality/company');
    redirect('/materiality/company');
  }
}


export async function deleteCompanyProductWithId(id){
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('products_services').delete().eq('id',id);
    
    if(error){
      console.log("Error while deleting company product");
    }else{
      console.log("Successfully deleted product with id",id)
    }
  } catch (error) {
    console.log("Error while deleting company product");
  } finally{
    revalidatePath('/materiality/company');
    redirect('/materiality/company');
  }
}

export async function addIROLocation(formData: FormData) {
  const supabase = await createClient();

  const location = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    type: formData.get('location_type') as string,
    topic: formData.get('topic') as string,
    subtopic: formData.get('subtopic') as string,
    subsubtopic: formData.get('subsubtopic') as string,
    location_id: formData.get('locationid') as UUID,
    company_id :formData.get('companyid') as UUID,
  };

  const { data, error } = await supabase
    .from('iros_locations')
    .insert([location])
    .select();

  if (error) {
    console.error('Error inserting IRO location:', error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/materiality/company/${location.company_id}/location/${location.location_id}`);
  redirect(`/materiality/company/${location.company_id}/location/${location.location_id}`)
  // return { success: true, data };
}

export async function addIROProduct(formData: FormData) {
  const supabase = await createClient();

  const product = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    type: formData.get('location_type') as string,
    topic: formData.get('topic') as string,
    subtopic: formData.get('subtopic') as string,
    subsubtopic: formData.get('subsubtopic') as string,
    product_id: formData.get('productid') as UUID,
    company_id :formData.get('companyid') as UUID,
  };

  const { data, error } = await supabase
    .from('iros_productsservices')
    .insert([product])
    .select();

  if (error) {
    console.error('Error inserting IRO product:', error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/materiality/company/${product.company_id}/product/${product.product_id}`);
  redirect(`/materiality/company/${product.company_id}/product/${product.product_id}`)
  // return { success: true, data };
}

export async function editLocationIRO(locationid, companyid, IROid, formData) {
  const supabase = await createClient();
  const description1 = formData.get("description");

  try {
    const { data, error } = await supabase
      .from('iros_locations')
      .update({
        description: description1
      })
      .eq("id", IROid);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error while updating location:", error.message);
    return { success: false, message: error.message }; // Return error details
  } finally {
    revalidatePath(`/materiality/company/${companyid}/location/${locationid}/${IROid}`);
    redirect(`/materiality/company/${companyid}/location/${locationid}/${IROid}`);
  }
}

export async function editProductIRO(productid, companyid, IROid, formData) {
  const supabase = await createClient();
  const description1 = formData.get("description");

  try {
    const { data, error } = await supabase
      .from('iros_productsservices')
      .update({
        description: description1
      })
      .eq("id", IROid);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error while updating location:", error.message);
    return { success: false, message: error.message }; // Return error details
  } finally {
    revalidatePath(`/materiality/company/${companyid}/product/${productid}/${IROid}`);
    redirect(`/materiality/company/${companyid}/product/${productid}/${IROid}`);
  }
}

export async function deleteLocationIRO(locationid, companyid, IROid) {
  const supabase = await createClient();
  try {
    const { data } = await supabase.from("iros_locations").delete().eq("id", IROid);

  } catch (error) {
    console.error("Error while deleting Location IRO", error);
  } finally {
    revalidatePath(`/materiality/company/${companyid}/location/${locationid}`);
    redirect(`/materiality/company/${companyid}/location/${locationid}`);
  }
}

export async function deleteProductIRO(productid, companyid, IROid) {
  const supabase = await createClient();
  try {
    const { data } = await supabase.from("iros_productsservices").delete().eq("id", IROid);

  } catch (error) {
    console.error("Error while deleting Location IRO", error);
  } finally {
    revalidatePath(`/materiality/company/${companyid}/product/${productid}`);
    redirect(`/materiality/company/${companyid}/product/${productid}`);
  }
}

export async function getLocationTypes() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.rpc('get_location_types');
    
    if (error) throw error;

    return data.map(item => item.type_name);
  } catch (error) {
    console.error("Error while fetching location types:", error);
    return [];
  }
}

export async function GoogleApikey() {
  const supabase = await createClient(); 
  const { data, error } = await supabase
      .from('googlemapsapi')
      .select('*')  
      .single();    
  
  // If there is an error or no data is found, return null or handle it as needed
  if (error || !data) {
      console.error('Error fetching Google API key:', error);
      return null; 
  }

  return data;
}
