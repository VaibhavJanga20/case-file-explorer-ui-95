
-- Additional crime data (adding 12 more records to the existing 8)
INSERT INTO crimes (id, type, date, location, description, status, severity) VALUES
  ('c9', 'drugOffense', '2023-12-03T15:20:00Z', '567 Harbor St, Southside', 'Drug trafficking operation', 'open', 'high'),
  ('c10', 'theft', '2023-12-09T11:45:00Z', '890 State Ave, Downtown', 'Vehicle theft from parking garage', 'open', 'medium'),
  ('c11', 'cyberCrime', '2023-11-25T08:30:00Z', 'Online', 'Phishing campaign targeting local businesses', 'pending', 'medium'),
  ('c12', 'assault', '2023-12-16T21:10:00Z', '432 Night Club, Entertainment District', 'Aggravated assault outside nightclub', 'open', 'high'),
  ('c13', 'vandalism', '2023-12-19T02:15:00Z', 'Central High School, Westside', 'School property damage', 'pending', 'low'),
  ('c14', 'burglary', '2023-11-30T04:20:00Z', '753 Commercial St, Business District', 'Break-in at electronics store', 'open', 'medium'),
  ('c15', 'fraud', '2023-12-11T13:40:00Z', 'Senior Living Center, Northside', 'Elder fraud scheme', 'open', 'high'),
  ('c16', 'theft', '2023-12-07T16:55:00Z', 'Shopping Mall, Eastside', 'Organized retail theft', 'pending', 'medium'),
  ('c17', 'kidnapping', '2023-12-01T19:30:00Z', 'Riverside Park', 'Attempted child abduction', 'closed', 'critical'),
  ('c18', 'robbery', '2023-12-14T22:05:00Z', '247 Convenience Store, Southside', 'Armed robbery', 'open', 'high'),
  ('c19', 'homicide', '2023-11-15T23:45:00Z', 'Abandoned Warehouse, Industrial District', 'Body discovered in vacant building', 'open', 'critical'),
  ('c20', 'drugOffense', '2023-12-20T14:30:00Z', 'Apartment Complex, Eastside', 'Drug manufacturing operation', 'pending', 'high');

-- Additional suspects data (adding more suspects)
INSERT INTO suspects (id, name, crime_id, status, date_of_birth, gender, address, contact_info) VALUES
  ('s8', 'Thomas Wilson', 'c9', 'charged', '1987-07-18', 'Male', '123 Summit Ave, Southside', '555-111-2233'),
  ('s9', 'Lisa Chen', 'c10', 'suspect', '1992-05-29', 'Female', 'Unknown', '555-444-5566'),
  ('s10', 'Victor Malakov', 'c11', 'person of interest', '1983-10-14', 'Male', '456 Tech Plaza, Eastside', '555-777-8899'),
  ('s11', 'Brandon Taylor', 'c12', 'charged', '1995-02-03', 'Male', '789 Club District, Downtown', '555-123-7890'),
  ('s12', 'Kevin Rodriguez', 'c13', 'suspect', '2006-09-11', 'Male', '234 School Lane, Westside', 'Unknown'),
  ('s13', 'Marcus Johnson', 'c14', 'convicted', '1981-12-25', 'Male', '567 Holding St, County Jail', 'None'),
  ('s14', 'Patricia Scott', 'c15', 'charged', '1973-04-18', 'Female', '890 Fraud Lane, Southside', '555-987-3210'),
  ('s15', 'Raymond Lewis', 'c16', 'suspect', '1989-08-09', 'Male', 'Unknown', 'Unknown'),
  ('s16', 'Helen Winters', 'c17', 'acquitted', '1990-06-15', 'Female', '432 Liberty Ave, Northside', '555-555-1212'),
  ('s17', 'Jamal Washington', 'c18', 'suspect', '1997-11-21', 'Male', 'Unknown', '555-444-3333'),
  ('s18', 'Richard Miller', 'c19', 'person of interest', '1971-03-08', 'Male', '753 Shadow St, Downtown', '555-888-7777'),
  ('s19', 'Carmen Diaz', 'c20', 'suspect', '1985-10-30', 'Female', '101 Highland Ave, Eastside', '555-222-1111'),
  ('s20', 'Derek Phillips', 'c9', 'suspect', '1979-01-17', 'Male', 'Unknown', 'Unknown');

-- Additional investigations data (adding more investigations)
INSERT INTO investigations (id, crime_id, officer_in_charge, status, start_date, last_updated, notes) VALUES
  ('i9', 'c9', 'Sergeant Phillips', 'active', '2023-12-03T16:00:00Z', '2023-12-21T09:30:00Z', 'Surveillance operation in progress'),
  ('i10', 'c10', 'Officer Ramirez', 'active', '2023-12-09T12:15:00Z', '2023-12-20T14:00:00Z', 'Checking CCTV footage from surrounding area'),
  ('i11', 'c11', 'Cyber Specialist Wong', 'pending', '2023-11-25T10:00:00Z', '2023-11-25T10:00:00Z', 'Waiting for digital forensics team'),
  ('i12', 'c12', 'Detective Morris', 'active', '2023-12-16T22:00:00Z', '2023-12-21T11:45:00Z', 'Multiple witnesses being interviewed'),
  ('i13', 'c13', 'Officer Bennett', 'active', '2023-12-19T08:30:00Z', '2023-12-20T13:15:00Z', 'School cameras under review'),
  ('i14', 'c14', 'Detective Collins', 'active', '2023-11-30T06:00:00Z', '2023-12-18T16:40:00Z', 'Fingerprint analysis in process'),
  ('i15', 'c15', 'Sergeant Patel', 'active', '2023-12-11T15:00:00Z', '2023-12-19T10:20:00Z', 'Financial records being subpoenaed'),
  ('i16', 'c16', 'Officer Reynolds', 'pending', '2023-12-07T17:30:00Z', '2023-12-07T17:30:00Z', 'Awaiting assignment of dedicated officer'),
  ('i17', 'c17', 'Detective Chief Jackson', 'complete', '2023-12-01T20:00:00Z', '2023-12-15T12:00:00Z', 'Suspect acquitted due to lack of evidence'),
  ('i18', 'c18', 'Detective Martinez', 'active', '2023-12-14T22:30:00Z', '2023-12-20T09:15:00Z', 'Reviewing store security footage'),
  ('i19', 'c19', 'Detective Chief Wilson', 'active', '2023-11-16T01:00:00Z', '2023-12-19T16:30:00Z', 'DNA analysis pending from lab'),
  ('i20', 'c20', 'Sergeant Nguyen', 'active', '2023-12-20T15:00:00Z', '2023-12-21T10:10:00Z', 'Raid planned with narcotics unit');
