
import { Investigation, InvestigationStatus, InvestigationStatistics } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Helper functions to get investigation data
export const getInvestigations = async (): Promise<Investigation[]> => {
  try {
    const { data, error } = await supabase
      .from('investigations')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data as Investigation[];
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error fetching investigations",
      description: error.message || "Could not fetch investigation data",
    });
    return [];
  }
};

export const getInvestigationById = async (id: string): Promise<Investigation | undefined> => {
  try {
    const { data, error } = await supabase
      .from('investigations')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data as Investigation;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error fetching investigation",
      description: error.message || "Could not fetch investigation details",
    });
    return undefined;
  }
};

export const getInvestigationsByCrimeId = async (crimeId: string): Promise<Investigation[]> => {
  try {
    const { data, error } = await supabase
      .from('investigations')
      .select('*')
      .eq('crime_id', crimeId)
      .order('start_date', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data as Investigation[];
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error fetching investigations",
      description: error.message || "Could not fetch investigations for this crime",
    });
    return [];
  }
};

// Dashboard statistics function for investigations
export const getInvestigationStatistics = async (): Promise<InvestigationStatistics> => {
  try {
    // Fetch all investigations
    const { data: investigations, error } = await supabase
      .from('investigations')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    const byStatus: Record<InvestigationStatus, number> = {
      'pending': 0,
      'active': 0,
      'complete': 0,
      'suspended': 0
    };
    
    investigations.forEach(investigation => {
      byStatus[investigation.status as InvestigationStatus] = 
        (byStatus[investigation.status as InvestigationStatus] || 0) + 1;
    });
    
    // Calculate average days for completed investigations
    const completedInvestigations = investigations.filter(inv => inv.status === 'complete');
    let totalDays = 0;
    
    completedInvestigations.forEach(inv => {
      const startDate = new Date(inv.start_date);
      const endDate = new Date(inv.last_updated);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      totalDays += diffDays;
    });
    
    const averageDays = completedInvestigations.length > 0 
      ? totalDays / completedInvestigations.length 
      : 0;
    
    return {
      totalInvestigations: investigations.length,
      byStatus,
      averageDaysToSolve: Math.round(averageDays * 10) / 10 // Round to 1 decimal place
    };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error calculating statistics",
      description: error.message || "Could not calculate investigation statistics",
    });
    
    // Return empty statistics
    return {
      totalInvestigations: 0,
      byStatus: {} as Record<InvestigationStatus, number>,
      averageDaysToSolve: 0
    };
  }
};
