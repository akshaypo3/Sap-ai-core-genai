import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addLocation(formData: FormData) {
    "use server"
    const supabase = createClient();
  
    const location = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      type: formData.get('location_type') as string,
      address: formData.get('street') as string,
      postalcode: parseInt(formData.get('postalcode') as string),
      city: formData.get('city') as string,
      country: formData.get('country') as string,
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
    "use server"
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
    "use server"
    const supabase = createClient();
  
    const companyDetails = {
      name: formData.get('companyname') as string,
      company_strategy: formData.get('company_strategy') as string,
      business_model: formData.get('business_model') as string,
    };
  
    const { data, error } = await supabase
      .from('company_details')
      .update([companyDetails])
      .select();

      console.log(data);
  
    if (error) {
      console.error('Error inserting product/service:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/materiality/company');
    redirect('/materiality/company')
    // return { success: true, data };
  }