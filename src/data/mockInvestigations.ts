
import { Investigation } from '@/types';

// Mock Investigations
export const investigations: Investigation[] = [
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
