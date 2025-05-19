
import { Crime, CrimeType } from '@/types';

// Mock Crimes
export const crimes: Crime[] = [
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
