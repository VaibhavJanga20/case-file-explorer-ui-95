
// User related types
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'investigator' | 'officer' | 'analyst';
  email?: string;
}

// Crime related types
export type CrimeType = 
  | 'theft' 
  | 'assault' 
  | 'burglary' 
  | 'robbery' 
  | 'fraud' 
  | 'homicide' 
  | 'vandalism'
  | 'cyberCrime'
  | 'kidnapping'
  | 'drugOffense'
  | 'other';

export interface Crime {
  id: string;
  type: CrimeType;
  date: string; // ISO date string
  location: string;
  description: string;
  status: 'open' | 'closed' | 'cold' | 'pending';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Suspect related types
export type SuspectStatus = 'suspect' | 'person of interest' | 'charged' | 'cleared' | 'convicted' | 'acquitted';

export interface Suspect {
  id: string;
  name: string;
  crimeId: string;
  status: SuspectStatus;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  contactInfo?: string;
}

// Investigation related types
export type InvestigationStatus = 'pending' | 'active' | 'complete' | 'suspended';

export interface Investigation {
  id: string;
  crimeId: string;
  officerInCharge: string;
  status: InvestigationStatus;
  startDate: string;
  lastUpdated: string;
  notes?: string;
}

// Dashboard types
export interface CrimeStatistics {
  totalCrimes: number;
  openCases: number;
  solvedCases: number;
  crimesByType: Record<CrimeType, number>;
  recentCrimes: Crime[];
}

export interface SuspectStatistics {
  totalSuspects: number;
  byCrimeType: Record<CrimeType, number>;
  byStatus: Record<SuspectStatus, number>;
}

export interface InvestigationStatistics {
  totalInvestigations: number;
  byStatus: Record<InvestigationStatus, number>;
  averageDaysToSolve: number;
}
