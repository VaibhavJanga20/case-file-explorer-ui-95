
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import CrimeRecords from '@/pages/CrimeRecords';
import Investigations from '@/pages/Investigations';
import Suspects from '@/pages/Suspects';
import Search from '@/pages/Search';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import "./App.css";
import { supabase } from './integrations/supabase/client';

function App() {
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Check if we need to load initial data
        const { count, error } = await supabase
          .from('crimes')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.error('Error checking for crimes:', error);
          return;
        }
        
        // If no data exists, run the SQL script
        if (count === 0) {
          console.log('No data found, loading initial data');
          // Load the SQL data from our file - in a real app this would be a migration
          // For now we'll execute individual queries
          
          // Execute the data from the SQL file
          const sqlFile = await import('./sql/additional_data.sql?raw');
          const queries = sqlFile.default.split(');');
          
          for (const query of queries) {
            if (query.trim()) {
              const { error } = await supabase.rpc('execute_sql', { 
                sql_command: query + ');' 
              });
              if (error) {
                console.error('Error executing query:', error);
              }
            }
          }
          
          console.log('Data loaded successfully');
        } else {
          console.log(`Database already has ${count} crimes, skipping data load`);
        }
      } catch (error) {
        console.error('Error during initial data check:', error);
      }
    };
    
    loadInitialData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="crimes" element={
            <ProtectedRoute>
              <CrimeRecords />
            </ProtectedRoute>
          } />
          <Route path="investigations" element={
            <ProtectedRoute>
              <Investigations />
            </ProtectedRoute>
          } />
          <Route path="suspects" element={
            <ProtectedRoute>
              <Suspects />
            </ProtectedRoute>
          } />
          <Route path="search" element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
