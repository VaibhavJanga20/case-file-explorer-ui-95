
import { Suspect, SuspectStatus, SuspectStatistics, CrimeType } from '@/types';
import { suspects } from '@/data/mockSuspects';
import { getCrimeById } from './crimeService';

// Helper functions to get suspect data
export const getSuspects = (): Suspect[] => {
  return [...suspects];
};

export const getSuspectById = (id: string): Suspect | undefined => {
  return suspects.find(suspect => suspect.id === id);
};

export const getSuspectsByCrimeId = (crimeId: string): Suspect[] => {
  return suspects.filter(suspect => suspect.crimeId === crimeId);
};

// Dashboard statistics function for suspects
export const getSuspectStatistics = (): SuspectStatistics => {
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
    const crime = getCrimeById(suspect.crimeId);
    if (crime) {
      byCrimeType[crime.type] = (byCrimeType[crime.type] || 0) + 1;
    }
    byStatus[suspect.status] = (byStatus[suspect.status] || 0) + 1;
  });
  
  return {
    totalSuspects: suspects.length,
    byCrimeType,
    byStatus
  };
};
