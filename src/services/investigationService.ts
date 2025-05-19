
import { Investigation, InvestigationStatus, InvestigationStatistics } from '@/types';
import { investigations } from '@/data/mockInvestigations';

// Helper functions to get investigation data
export const getInvestigations = (): Investigation[] => {
  return [...investigations];
};

export const getInvestigationById = (id: string): Investigation | undefined => {
  return investigations.find(investigation => investigation.id === id);
};

export const getInvestigationsByCrimeId = (crimeId: string): Investigation[] => {
  return investigations.filter(investigation => investigation.crimeId === crimeId);
};

// Dashboard statistics function for investigations
export const getInvestigationStatistics = (): InvestigationStatistics => {
  const byStatus: Record<InvestigationStatus, number> = {
    'pending': 0,
    'active': 0,
    'complete': 0,
    'suspended': 0
  };
  
  investigations.forEach(investigation => {
    byStatus[investigation.status] = (byStatus[investigation.status] || 0) + 1;
  });
  
  // Calculate average days for completed investigations
  const completedInvestigations = investigations.filter(inv => inv.status === 'complete');
  let totalDays = 0;
  
  completedInvestigations.forEach(inv => {
    const startDate = new Date(inv.startDate);
    const endDate = new Date(inv.lastUpdated);
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
};
