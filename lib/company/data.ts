import { createClient } from "@/utils/supabase/server";

export async function getLocations() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('company_locations')
      .select('*');
    
    if (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
    
    return data || [];
  }

  export async function getLocationTypes() {
    const supabase = createClient();
  
    try {
      const { data, error } = await supabase.rpc('get_location_types');
      
      if (error) throw error;
  
      return data.map(item => item.type_name);
    } catch (error) {
      console.error("Error while fetching location types:", error);
      return [];
    }
  }

  export async function getCountries() {
    const supabase = createClient();
  
    try {
      const { data, error } = await supabase.rpc('get_countries');
      
      if (error) throw error;
  
      return data.map(item => item.country_name);
    } catch (error) {
      console.error("Error while fetching countries:", error);
      return [];
    }
  }

  export async function getProductsAndServices() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products_services')
      .select('*');
    
    if (error) {
      console.error('Error fetching products and services:', error);
      return [];
    }

    return data || [];
  }

  export async function getCompanyDetails() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('company_details')
      .select('*');
    
    if (error) {
      console.error('Error fetching company details:', error);
      return [];
    }
    
    return data || [];
  }

