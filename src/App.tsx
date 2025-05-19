
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CrimeRecords from "./pages/CrimeRecords";
import Suspects from "./pages/Suspects";
import Investigations from "./pages/Investigations";
import SearchPage from "./pages/Search";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/crimes" element={
              <ProtectedRoute>
                <Layout>
                  <CrimeRecords />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/suspects" element={
              <ProtectedRoute>
                <Layout>
                  <Suspects />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/investigations" element={
              <ProtectedRoute>
                <Layout>
                  <Investigations />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/search" element={
              <ProtectedRoute>
                <Layout>
                  <SearchPage />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
