
import { Crime, CrimeType, CrimeStatistics } from '@/types';
import { crimes } from '@/data/mockCrimes';

// Helper functions to get crime data
export const getCrimes = (): Crime[] => {
  return [...crimes];
};

export const getCrimeById = (id: string): Crime | undefined => {
  return crimes.find(crime => crime.id === id);
};

// Dashboard statistics function for crimes
export const getCrimeStatistics = (): CrimeStatistics => {
  const openCases = crimes.filter(crime => crime.status === 'open').length;
  const solvedCases = crimes.filter(crime => crime.status === 'closed').length;
  const crimesByType = crimes.reduce((acc, crime) => {
    acc[crime.type] = (acc[crime.type] || 0) + 1;
    return acc;
  }, {} as Record<CrimeType, number>);
  
  // Initialize missing crime types with 0
  const allCrimeTypes: CrimeType[] = ['theft', 'assault', 'burglary', 'robbery', 'fraud', 'homicide', 'vandalism', 'cyberCrime', 'kidnapping', 'drugOffense', 'other'];
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
};
