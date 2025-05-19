
import { Crime, Suspect, Investigation } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Search functionality
export const searchAll = async (query: string) => {
  if (!query) return { crimes: [], suspects: [], investigations: [] };
  
  query = query.toLowerCase();
  
  try {
    // Search in crimes
    const { data: crimesData, error: crimesError } = await supabase
      .from('crimes')
      .select('*')
      .or(`type.ilike.%${query}%,location.ilike.%${query}%,description.ilike.%${query}%`);
    
    if (crimesError) {
      throw crimesError;
    }
    
    // Map database fields to frontend type
    const crimes: Crime[] = (crimesData || []).map(item => ({
      id: item.id,
      type: item.type,
      date: item.date,
      location: item.location,
      description: item.description,
      status: item.status,
      severity: item.severity,
    }));
    
    // Search in suspects
    const { data: suspectsData, error: suspectsError } = await supabase
      .from('suspects')
      .select('*')
      .or(`name.ilike.%${query}%,status.ilike.%${query}%`);
    
    if (suspectsError) {
      throw suspectsError;
    }
    
    // Map database fields to frontend type
    const suspects: Suspect[] = (suspectsData || []).map(item => ({
      id: item.id,
      name: item.name,
      crimeId: item.crime_id,
      status: item.status,
      dateOfBirth: item.date_of_birth,
      gender: item.gender,
      address: item.address,
      contactInfo: item.contact_info,
    }));
    
    // Search in investigations
    const { data: investigationsData, error: investigationsError } = await supabase
      .from('investigations')
      .select('*')
      .or(`officer_in_charge.ilike.%${query}%,status.ilike.%${query}%,notes.ilike.%${query}%`);
    
    if (investigationsError) {
      throw investigationsError;
    }
    
    // Map database fields to frontend type
    const investigations: Investigation[] = (investigationsData || []).map(item => ({
      id: item.id,
      crimeId: item.crime_id,
      officerInCharge: item.officer_in_charge,
      status: item.status,
      startDate: item.start_date,
      lastUpdated: item.last_updated,
      notes: item.notes,
    }));
    
    return {
      crimes,
      suspects,
      investigations
    };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Search error",
      description: error.message || "An error occurred while searching",
    });
    
    return {
      crimes: [],
      suspects: [],
      investigations: []
    };
  }
};
