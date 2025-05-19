
import { supabase } from '@/integrations/supabase/client';

// This script can be run to ensure data is in the database
export const insertInitialData = async () => {
  console.log('Checking database and inserting initial data if needed...');
  
  try {
    // Check if we have any crimes
    const { data: existingCrimes, error: crimesError } = await supabase
      .from('crimes')
      .select('id')
      .limit(1);
    
    if (crimesError) {
      throw crimesError;
    }
    
    // Only insert data if no crimes exist
    if (!existingCrimes || existingCrimes.length === 0) {
      console.log('No crimes found, inserting sample data...');
      
      // Insert data using SQL from additional_data.sql
      // This would typically be done through a migration, but we'll simulate it here
      
      // Run SQL here to load sample data
      const result = await executeDataInsertions();
      console.log('Data insertion result:', result);
      
      return true;
    } else {
      console.log('Database already has data, skipping insertion');
      return false;
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    return false;
  }
};

const executeDataInsertions = async () => {
  // Insert crimes
  const crimesInsertionResult = await supabase.rpc('insert_sample_crimes');
  
  // Insert suspects
  const suspectsInsertionResult = await supabase.rpc('insert_sample_suspects');
  
  // Insert investigations
  const investigationsInsertionResult = await supabase.rpc('insert_sample_investigations');
  
  return {
    crimes: crimesInsertionResult,
    suspects: suspectsInsertionResult, 
    investigations: investigationsInsertionResult
  };
};
