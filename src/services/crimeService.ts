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
    
    // Map database fields to frontend type
    return (data || []).map(item => ({
      id: item.id,
      type: item.type as CrimeType,
      date: item.date,
      location: item.location,
      description: item.description,
      status: item.status,
      severity: item.severity,
    }));
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
    
    if (!data) return undefined;
    
    // Map database fields to frontend type
    return {
      id: data.id,
      type: data.type as CrimeType,
      date: data.date,
      location: data.location,
      description: data.description,
      status: data.status,
      severity: data.severity,
    };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error fetching crime",
      description: error.message || "Could not fetch crime details",
    });
    return undefined;
  }
};

// Add createCrime function
export const createCrime = async (crime: Omit<Crime, 'id'>): Promise<Crime | null> => {
  try {
    // Generate a UUID for the crime ID
    const id = crypto.randomUUID().slice(0, 8);
    
    const { data, error } = await supabase
      .from('crimes')
      .insert([{ 
        id, 
        type: crime.type,
        date: crime.date,
        location: crime.location,
        description: crime.description,
        status: crime.status,
        severity: crime.severity
      }])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Crime record created",
      description: "New crime has been successfully added"
    });
    
    // Map database fields to frontend type
    return {
      id: data.id,
      type: data.type as CrimeType,
      date: data.date,
      location: data.location,
      description: data.description,
      status: data.status,
      severity: data.severity,
    };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error creating crime",
      description: error.message || "Could not create crime record",
    });
    return null;
  }
};

// Add deleteCrime function
export const deleteCrime = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('crimes')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Crime record deleted",
      description: "The crime record has been successfully removed"
    });
    
    return true;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error deleting crime",
      description: error.message || "Could not delete crime record",
    });
    return false;
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
    
    // Map database fields to frontend type
    const mappedCrimes: Crime[] = (crimes || []).map(item => ({
      id: item.id,
      type: item.type as CrimeType,
      date: item.date,
      location: item.location,
      description: item.description,
      status: item.status,
      severity: item.severity,
    }));
    
    // Calculate statistics
    const openCases = mappedCrimes.filter(crime => crime.status === 'open').length;
    const solvedCases = mappedCrimes.filter(crime => crime.status === 'closed').length;
    
    // Count by type
    const crimesByType = mappedCrimes.reduce((acc, crime) => {
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
    const recentCrimes = [...mappedCrimes]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    
    return {
      totalCrimes: mappedCrimes.length,
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
