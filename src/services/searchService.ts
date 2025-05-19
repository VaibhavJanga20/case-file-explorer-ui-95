
import { Crime, Suspect, Investigation } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Search functionality
export const searchAll = async (query: string) => {
  if (!query) return { crimes: [], suspects: [], investigations: [] };
  
  query = query.toLowerCase();
  
  try {
    // Search in crimes
    const { data: crimes, error: crimesError } = await supabase
      .from('crimes')
      .select('*')
      .or(`type.ilike.%${query}%,location.ilike.%${query}%,description.ilike.%${query}%`);
    
    if (crimesError) {
      throw crimesError;
    }
    
    // Search in suspects
    const { data: suspects, error: suspectsError } = await supabase
      .from('suspects')
      .select('*')
      .or(`name.ilike.%${query}%,status.ilike.%${query}%`);
    
    if (suspectsError) {
      throw suspectsError;
    }
    
    // Search in investigations
    const { data: investigations, error: investigationsError } = await supabase
      .from('investigations')
      .select('*')
      .or(`officer_in_charge.ilike.%${query}%,status.ilike.%${query}%,notes.ilike.%${query}%`);
    
    if (investigationsError) {
      throw investigationsError;
    }
    
    return {
      crimes: crimes as Crime[],
      suspects: suspects as Suspect[],
      investigations: investigations as Investigation[]
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
