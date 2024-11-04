import { createClient } from "@/utils/supabase/server";

export async function getBRSRData() {
  const supabase = createClient();
  
  const { data: brsrData, error: brsrError } = await supabase
    .from('brsr_data')
    .select(`
      id,
      question,
      section,
      principle,
      status,
      assigned_user_id
    `)
    .order('id');

  if (brsrError) {
    console.error('Error fetching BRSR data:', brsrError);
    return [];
  }

  const { data: generalDisclosures, error: gdError } = await supabase
    .from('general_disclosures')
    .select('*')
    .single();

  if (gdError) {
    console.error('Error fetching general disclosures:', gdError);
    return [];
  }

  const { data: companyData, error: companyError } = await supabase
    .from('companies')
    .select('*')
    .single();

  if (companyError) {
    console.error('Error fetching company data:', companyError);
    return [];
  }

  return brsrData.map(item => {
    let response = '';
    if (item.section === 'Section A: General Disclosures') {
      // Handle Section A responses as before
      switch(item.question) {
        case 'Corporate Identity Number (CIN) of the Company':
          response = companyData.cin;
          break;
        case 'Name of the Company':
          response = companyData.name;
          break;
        // ... other cases for Section A ...
        default:
          response = 'Data not available';
      }
    } else {
      // For Sections B and C, we don't have specific responses yet
      response = 'Response pending';
    }

    return {
      id: item.id,
      question: item.question,
      section: item.section,
      principle: item.principle,
      status: item.status,
      response: response,
      assignedUser: item.assigned_user_id ? {
        id: item.assigned_user_id,
        name: "Unassigned",
        avatar: "/placeholder-avatar.png"
      } : undefined
    };
  });
}