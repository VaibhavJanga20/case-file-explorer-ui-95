
import { Crime, Suspect, Investigation } from '@/types';
import { crimes } from '@/data/mockCrimes';
import { suspects } from '@/data/mockSuspects';
import { investigations } from '@/data/mockInvestigations';

// Search functionality
export const searchAll = (query: string) => {
  if (!query) return { crimes: [], suspects: [], investigations: [] };
  
  query = query.toLowerCase();
  
  const matchedCrimes = crimes.filter(crime => 
    crime.type.toLowerCase().includes(query) ||
    crime.location.toLowerCase().includes(query) ||
    crime.description.toLowerCase().includes(query)
  );
  
  const matchedSuspects = suspects.filter(suspect => 
    suspect.name.toLowerCase().includes(query) ||
    suspect.status.toLowerCase().includes(query)
  );
  
  const matchedInvestigations = investigations.filter(investigation => 
    investigation.officerInCharge.toLowerCase().includes(query) ||
    investigation.status.toLowerCase().includes(query) ||
    (investigation.notes && investigation.notes.toLowerCase().includes(query))
  );
  
  return {
    crimes: matchedCrimes,
    suspects: matchedSuspects,
    investigations: matchedInvestigations
  };
};
