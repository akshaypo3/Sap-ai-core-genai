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

  export async function getIROLocationTypes() {
    const supabase = createClient();
  
    try {
      const { data, error } = await supabase.rpc('fetch_enum_values');
      
      if (error) throw error;
  
      return data.map(item => item.location_type);
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

  export async function getProduct(productid:string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products_services')
      .select('*')
      .eq('id', productid)
      .single(); 

    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    return data || [];
  }

  export async function getLocation(locationid:string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('company_locations')
      .select('*')
      .eq('id', locationid)
      .single(); 

    
    if (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
    return data || [];
  }

  export async function getLocationIRO(locationid:string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('iros_locations')
      .select('*')
      .eq('location_id', locationid);

    
    if (error) {
      console.error('Error fetching locations IRO:', error);
      return [];
    }
    return data;
  }
  export async function getIROLocation(locationid:string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('iros_locations')
      .select('*')
      .eq('id', locationid)
      .single(); 

    
    if (error) {
      console.error('Error fetching locations IRO:', error);
      return [];
    }
    return data;
  }

  export async function getProductIRO(productid:string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('iros_productsservices')
      .select('*')
      .eq('product_id', productid);

    
    if (error) {
      console.error('Error fetching product IRO:', error);
      return [];
    }
    return data;
  }

  export async function getIROProduct(productid:string) {
    
    const supabase = createClient();
    const { data, error } = await supabase
      .from('iros_productsservices')
      .select('*')
      .eq('id', productid)
      .single(); 

    
    if (error) {
      console.error('Error fetching product IRO:1', error);
      return [];
    }
    return data;
  }