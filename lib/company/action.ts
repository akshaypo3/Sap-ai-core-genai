"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addLocation(formData: FormData) {
    const supabase = createClient();
  
    const location = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      type: formData.get('location_type') as string,
      address: formData.get('street') as string,
      postalcode: parseInt(formData.get('postalcode') as string),
      city: formData.get('city') as string,
      country: formData.get('country') as string,
      employee_count: formData.get('employee_count') as string,
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

  export async function addProductService(formData: FormData) {
    const supabase = createClient();
  
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

    revalidatePath('/materiality/company');
    redirect('/materiality/company')
    // return { success: true, data };
  }

  export async function saveCompanyDetails(formData: FormData) {
    const supabase = createClient();
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
    redirect('/materiality/company');
}

export async function deleteCompanyLocationWithId(id){
  const supabase = createClient();

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
  const supabase = createClient();

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