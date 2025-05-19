
import { 
  Crime, 
  CrimeType, 
  Suspect, 
  SuspectStatus, 
  Investigation, 
  InvestigationStatus,
  CrimeStatistics,
  SuspectStatistics,
  InvestigationStatistics
} from '@/types';

// Mock Crimes
const crimes: Crime[] = [
  {
    id: 'c1',
    type: 'theft',
    date: '2023-12-15T10:30:00Z',
    location: '123 Main St, Downtown',
    description: 'Shoplifting at Retail Store',
    status: 'open',
    severity: 'low'
  },
  {
    id: 'c2',
    type: 'assault',
    date: '2023-12-10T22:15:00Z',
    location: '456 Oak Ave, Northside',
    description: 'Bar fight resulting in minor injuries',
    status: 'closed',
    severity: 'medium'
  },
  {
    id: 'c3',
    type: 'burglary',
    date: '2023-12-05T03:20:00Z',
    location: '789 Pine Rd, Eastside',
    description: 'Home break-in while residents were away',
    status: 'open',
    severity: 'medium'
  },
  {
    id: 'c4',
    type: 'fraud',
    date: '2023-11-28T14:45:00Z',
    location: 'Online',
    description: 'Credit card fraud involving multiple victims',
    status: 'open',
    severity: 'high'
  },
  {
    id: 'c5',
    type: 'homicide',
    date: '2023-11-20T01:30:00Z',
    location: '101 River Dr, Westside',
    description: 'Suspected homicide in apartment building',
    status: 'open',
    severity: 'critical'
  },
  {
    id: 'c6',
    type: 'vandalism',
    date: '2023-12-18T23:10:00Z',
    location: 'City Park, Downtown',
    description: 'Graffiti on public monuments',
    status: 'closed',
    severity: 'low'
  },
  {
    id: 'c7',
    type: 'robbery',
    date: '2023-12-08T18:05:00Z',
    location: 'First National Bank, Financial District',
    description: 'Armed robbery at bank branch',
    status: 'open',
    severity: 'high'
  },
  {
    id: 'c8',
    type: 'cyberCrime',
    date: '2023-12-01T09:30:00Z',
    location: 'Online',
    description: 'Ransomware attack on local business',
    status: 'pending',
    severity: 'high'
  }
];

// Mock Suspects
const suspects: Suspect[] = [
  {
    id: 's1',
    name: 'John Doe',
    crimeId: 'c1',
    status: 'suspect',
    dateOfBirth: '1985-06-12',
    gender: 'Male',
    address: '234 Elm St, Downtown',
    contactInfo: '555-123-4567'
  },
  {
    id: 's2',
    name: 'Jane Smith',
    crimeId: 'c2',
    status: 'charged',
    dateOfBirth: '1990-03-24',
    gender: 'Female',
    address: '567 Maple Ave, Westside',
    contactInfo: '555-987-6543'
  },
  {
    id: 's3',
    name: 'Robert Johnson',
    crimeId: 'c3',
    status: 'person of interest',
    dateOfBirth: '1978-11-30',
    gender: 'Male',
    address: 'Unknown',
    contactInfo: 'Unknown'
  },
  {
    id: 's4',
    name: 'Emily Wilson',
    crimeId: 'c4',
    status: 'suspect',
    dateOfBirth: '1982-08-15',
    gender: 'Female',
    address: '890 Cedar Ln, Southside',
    contactInfo: '555-456-7890'
  },
  {
    id: 's5',
    name: 'Michael Brown',
    crimeId: 'c5',
    status: 'charged',
    dateOfBirth: '1975-04-10',
    gender: 'Male',
    address: '321 Birch Rd, Eastside',
    contactInfo: '555-789-0123'
  },
  {
    id: 's6',
    name: 'Sarah Davis',
    crimeId: 'c7',
    status: 'suspect',
    dateOfBirth: '1988-09-22',
    gender: 'Female',
    address: '654 Walnut St, Northside',
    contactInfo: '555-321-6540'
  },
  {
    id: 's7',
    name: 'David Martinez',
    crimeId: 'c8',
    status: 'person of interest',
    dateOfBirth: '1993-01-05',
    gender: 'Male',
    address: 'Unknown',
    contactInfo: '555-654-9870'
  }
];

// Mock Investigations
const investigations: Investigation[] = [
  {
    id: 'i1',
    crimeId: 'c1',
    officerInCharge: 'Officer Williams',
    status: 'active',
    startDate: '2023-12-15T12:00:00Z',
    lastUpdated: '2023-12-17T14:30:00Z',
    notes: 'Reviewing store surveillance footage'
  },
  {
    id: 'i2',
    crimeId: 'c2',
    officerInCharge: 'Detective Garcia',
    status: 'complete',
    startDate: '2023-12-10T23:00:00Z',
    lastUpdated: '2023-12-12T10:15:00Z',
    notes: 'Suspect charged, case closed'
  },
  {
    id: 'i3',
    crimeId: 'c3',
    officerInCharge: 'Detective Johnson',
    status: 'active',
    startDate: '2023-12-05T05:00:00Z',
    lastUpdated: '2023-12-14T11:20:00Z',
    notes: 'Fingerprints collected, interviewing neighbors'
  },
  {
    id: 'i4',
    crimeId: 'c4',
    officerInCharge: 'Sergeant Thompson',
    status: 'active',
    startDate: '2023-11-28T16:00:00Z',
    lastUpdated: '2023-12-16T09:45:00Z',
    notes: 'Working with bank to trace fraudulent transactions'
  },
  {
    id: 'i5',
    crimeId: 'c5',
    officerInCharge: 'Detective Wilson',
    status: 'active',
    startDate: '2023-11-20T02:15:00Z',
    lastUpdated: '2023-12-15T17:30:00Z',
    notes: 'Forensic analysis underway, suspect in custody'
  },
  {
    id: 'i6',
    crimeId: 'c6',
    officerInCharge: 'Officer Rodriguez',
    status: 'complete',
    startDate: '2023-12-19T08:00:00Z',
    lastUpdated: '2023-12-20T15:40:00Z',
    notes: 'Suspects identified via CCTV, restitution arranged'
  },
  {
    id: 'i7',
    crimeId: 'c7',
    officerInCharge: 'Detective Campbell',
    status: 'active',
    startDate: '2023-12-08T18:30:00Z',
    lastUpdated: '2023-12-18T13:15:00Z',
    notes: 'Analyzing witness statements and security footage'
  },
  {
    id: 'i8',
    crimeId: 'c8',
    officerInCharge: 'Cyber Division Specialist Lee',
    status: 'pending',
    startDate: '2023-12-02T10:00:00Z',
    lastUpdated: '2023-12-02T10:00:00Z',
    notes: 'Waiting for digital forensics team availability'
  }
];

// Helper functions to get data
export const getCrimes = (): Crime[] => {
  return [...crimes];
};

export const getCrimeById = (id: string): Crime | undefined => {
  return crimes.find(crime => crime.id === id);
};

export const getSuspects = (): Suspect[] => {
  return [...suspects];
};

export const getSuspectById = (id: string): Suspect | undefined => {
  return suspects.find(suspect => suspect.id === id);
};

export const getSuspectsByCrimeId = (crimeId: string): Suspect[] => {
  return suspects.filter(suspect => suspect.crimeId === crimeId);
};

export const getInvestigations = (): Investigation[] => {
  return [...investigations];
};

export const getInvestigationById = (id: string): Investigation | undefined => {
  return investigations.find(investigation => investigation.id === id);
};

export const getInvestigationsByCrimeId = (crimeId: string): Investigation[] => {
  return investigations.filter(investigation => investigation.crimeId === crimeId);
};

// Dashboard statistics functions
export const getCrimeStatistics = (): CrimeStatistics => {
  const openCases = crimes.filter(crime => crime.status === 'open').length;
  const solvedCases = crimes.filter(crime => crime.status === 'closed').length;
  const crimesByType = crimes.reduce((acc, crime) => {
    acc[crime.type] = (acc[crime.type] || 0) + 1;
    return acc;
  }, {} as Record<CrimeType, number>);
  
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

export const getSuspectStatistics = (): SuspectStatistics => {
  const byCrimeType: Record<CrimeType, number> = {};
  const byStatus: Record<SuspectStatus, number> = {};
  
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

export const getInvestigationStatistics = (): InvestigationStatistics => {
  const byStatus: Record<InvestigationStatus, number> = {};
  
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

// Search functionality
export const searchAll = (query: string) => {
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
