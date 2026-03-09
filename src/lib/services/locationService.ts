import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const locationService = {
  // Fetch all locations
  async getAllLocations() {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .order("name", { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getPaginated(page: number, limit: number = 20, search: string = "") {
    const from = page * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("locations")
      .select("*", { count: "exact" })
      .order("name", { ascending: true })
      .range(from, to);

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error, count } = await query;
    
    if (error) throw error;
    return { data, count };
  },
  
  // Delete a location
  async deleteLocation(id: number) {
    const { error } = await supabase
      .from("locations")
      .delete()
      .eq("poi_id", id);
    
    if (error) throw error;
    return true;
  },

  // Update location details
  async updateLocation(id: number, updates: any) {
    const { data, error } = await supabase
      .from("locations")
      .update(updates)
      .eq("poi_id", id);
    
    if (error) throw error;
    return data;
  }
};