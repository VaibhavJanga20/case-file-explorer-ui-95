
import { Crime, CrimeType, CrimeStatistics } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Helper functions to get crime data
export const getCrimes = async (): Promise<Crime[]> => {
  try {
    const { data, error } = await supabase
      .from('crimes')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data as Crime[];
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error fetching crimes",
      description: error.message || "Could not fetch crime data",
    });
    return [];
  }
};

export const getCrimeById = async (id: string): Promise<Crime | undefined> => {
  try {
    const { data, error } = await supabase
      .from('crimes')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data as Crime;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error fetching crime",
      description: error.message || "Could not fetch crime details",
    });
    return undefined;
  }
};

// Dashboard statistics function for crimes
export const getCrimeStatistics = async (): Promise<CrimeStatistics> => {
  try {
    // Fetch all crimes
    const { data: crimes, error } = await supabase
      .from('crimes')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    // Calculate statistics
    const openCases = crimes.filter(crime => crime.status === 'open').length;
    const solvedCases = crimes.filter(crime => crime.status === 'closed').length;
    
    // Count by type
    const crimesByType = crimes.reduce((acc, crime) => {
      acc[crime.type] = (acc[crime.type] || 0) + 1;
      return acc;
    }, {} as Record<CrimeType, number>);
    
    // Initialize missing crime types with 0
    const allCrimeTypes: CrimeType[] = [
      'theft', 'assault', 'burglary', 'robbery', 'fraud', 
      'homicide', 'vandalism', 'cyberCrime', 'kidnapping', 
      'drugOffense', 'other'
    ];
    
    allCrimeTypes.forEach(type => {
      if (crimesByType[type] === undefined) {
        crimesByType[type] = 0;
      }
    });
    
    // Sort by date, most recent first
    const recentCrimes = [...crimes]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    
    return {
      totalCrimes: crimes.length,
      openCases,
      solvedCases,
      crimesByType,
      recentCrimes
    };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error calculating statistics",
      description: error.message || "Could not calculate crime statistics",
    });
    
    // Return empty statistics
    return {
      totalCrimes: 0,
      openCases: 0,
      solvedCases: 0,
      crimesByType: {} as Record<CrimeType, number>,
      recentCrimes: []
    };
  }
};
