
import { Suspect, SuspectStatus, SuspectStatistics, CrimeType } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getCrimeById } from './crimeService';

// Helper functions to get suspect data
export const getSuspects = async (): Promise<Suspect[]> => {
  try {
    const { data, error } = await supabase
      .from('suspects')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data as Suspect[];
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error fetching suspects",
      description: error.message || "Could not fetch suspect data",
    });
    return [];
  }
};

export const getSuspectById = async (id: string): Promise<Suspect | undefined> => {
  try {
    const { data, error } = await supabase
      .from('suspects')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data as Suspect;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error fetching suspect",
      description: error.message || "Could not fetch suspect details",
    });
    return undefined;
  }
};

export const getSuspectsByCrimeId = async (crimeId: string): Promise<Suspect[]> => {
  try {
    const { data, error } = await supabase
      .from('suspects')
      .select('*')
      .eq('crime_id', crimeId)
      .order('name', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data as Suspect[];
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error fetching suspects",
      description: error.message || "Could not fetch suspects for this crime",
    });
    return [];
  }
};

// Dashboard statistics function for suspects
export const getSuspectStatistics = async (): Promise<SuspectStatistics> => {
  try {
    // Fetch all suspects
    const { data: suspects, error } = await supabase
      .from('suspects')
      .select('*, crimes(type)');
    
    if (error) {
      throw error;
    }
    
    const byCrimeType: Record<CrimeType, number> = {
      theft: 0,
      assault: 0,
      burglary: 0,
      robbery: 0,
      fraud: 0,
      homicide: 0,
      vandalism: 0,
      cyberCrime: 0,
      kidnapping: 0,
      drugOffense: 0,
      other: 0
    };
    
    const byStatus: Record<SuspectStatus, number> = {
      'suspect': 0,
      'person of interest': 0,
      'charged': 0,
      'cleared': 0,
      'convicted': 0,
      'acquitted': 0
    };
    
    suspects.forEach(suspect => {
      // Count by crime type
      if (suspect.crimes) {
        const crimeType = suspect.crimes.type as CrimeType;
        byCrimeType[crimeType] = (byCrimeType[crimeType] || 0) + 1;
      }
      
      // Count by status
      byStatus[suspect.status as SuspectStatus] = (byStatus[suspect.status as SuspectStatus] || 0) + 1;
    });
    
    return {
      totalSuspects: suspects.length,
      byCrimeType,
      byStatus
    };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error calculating statistics",
      description: error.message || "Could not calculate suspect statistics",
    });
    
    // Return empty statistics
    return {
      totalSuspects: 0,
      byCrimeType: {} as Record<CrimeType, number>,
      byStatus: {} as Record<SuspectStatus, number>
    };
  }
};
