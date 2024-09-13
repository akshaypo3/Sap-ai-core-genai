import { createClient } from "@/utils/supabase/server";

export async function getUserGroups() {
  const supabase = createClient();

  const { data: userGroups } = await supabase.from("groups").select();

  return userGroups;
}

export async function getAllUsers() {
    const supabase = createClient();    
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {        
      console.error("Error fetching users:", error);
      return [];
    }

    return data.users; 
  }

export async function getUserInfo() {
  const supabase = createClient();    
  const { data, error } = await supabase.auth.getUser();

  if (error) {        
    console.error("Error fetching users:", error);
    return [];
  }

 //console.log("User data:", data.user);
 const email = data?.user?.email || null; 
  return data.user; 
}


export async function getActivityLog() {
  const supabase = createClient();

  const { data: activities, error } = await supabase
    .from("activitylog")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching activity log:", error);
    return [];
  }

  return activities;
}

export async function getRoles(){
  const supabase = createClient()
  const { data: roles } = await supabase.from('Test_Role').select(`
      id,
      role,
      description
    `)
  return roles;
};

// Get profile data of users
export async function getProfile(){
  const supabase = createClient();

  // First query: Get the authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error fetching user data:", userError);
    return;
  }
  const profileID = userData.user.id;

  // Second query: Get the profile based on the user profile ID
  const { data: profileData, error: profileError } = await supabase
  .from('user_profile')
  .select(`
    id,
    user_roleID,
    user_groupID,
    username,
    userEmail,
    Test_Role(id, role), 
    groups(id, group)  -- Join condition
  `)
  .eq('id', profileID);

    if (profileError) {
    console.error("Error fetching profile data:", profileError);
    return;
  }
  // Log both responses
 //console.log("Profile Data:", profileData);

  return profileData;
}


// fetch all data joining with profile, role and group table
export async function fetchUsersWithProfilesAndRoles() { 
  const supabase = createClient();
  try {
    // Step 1: Fetch all users from Supabase Auth
    const { data, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) throw userError;

    const users = data?.users || []; // Safeguard in case data is null/undefined

    // Step 2: Fetch user profiles and roles by joining user_profile and Test_role
    const userProfiles = await Promise.all(
      users.map(async (user) => {
        // Fetch user profile (handle cases where no profile is returned)
        const { data: profile, error: profileError } = await supabase
          .from('user_profile')
          .select(`
            id,
            user_groupID,
            user_roleID,            
            username,
            userEmail
          `)
          .eq('id', user.id)
          .maybeSingle(); // Use maybeSingle to avoid errors when no profile is found

        if (profileError) throw profileError;

        // Handle cases where no profile is found
        if (!profile) {
          console.warn(`No profile found for user with id: ${user.id}`);
          return {
            userId: user.id,
            userEmail: 'NA',            
            name: 'NA',
            role: 'No Role Assigned',
            createdAt: user.created_at,
            lastSignInAt: user.last_sign_in_at,
            email:user.email
          };
        }

        // Fetch role details for the user based on user_roleID
        const { data: role, error: roleError } = await supabase
          .from('Test_Role')
          .select('*')
          .eq('id', profile.user_roleID)
          .maybeSingle(); // Use maybeSingle to handle no role found cases

        if (roleError) throw roleError;

        // Handle cases where no role is found
        const roleName = role ? role.role_name : 'No Role Assigned';

        // Fetch group details for the user based on user_groupID
        const { data: group, error: groupError } = await supabase
          .from('groups')
          .select('*')
          .eq('id', profile.user_groupID)
          .maybeSingle(); // Use maybeSingle to handle no group found cases

        if (groupError) throw groupError;

        // Handle cases where no group is found
        const groupName = group ? group.group_name : 'No Group Assigned';

        // Return combined user, profile, and role data
        return {
          userId: user.id,
          userEmail: profile.userEmail,
          name:profile.username,
          createdAt: user.created_at,
          lastSignInAt: user.last_sign_in_at,
          role: role,
          group:group,
          email:user.email
        };
      })
    );

    return userProfiles;

  } catch (error) {
    console.error('Error fetching users, profiles, or roles:', error.message);
    return null;
  }
}
