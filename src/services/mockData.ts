
// This file re-exports all the mock data services for backward compatibility
// This ensures that existing imports continue to work

export { crimes } from '@/data/mockCrimes';
export { suspects } from '@/data/mockSuspects';
export { investigations } from '@/data/mockInvestigations';

export { 
  getCrimes,
  getCrimeById,
  getCrimeStatistics
} from './crimeService';

export {
  getSuspects,
  getSuspectById,
  getSuspectsByCrimeId,
  getSuspectStatistics
} from './suspectService';

export {
  getInvestigations,
  getInvestigationById,
  getInvestigationsByCrimeId,
  getInvestigationStatistics
} from './investigationService';

export {
  searchAll
} from './searchService';
