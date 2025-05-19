
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { getSuspects, getCrimeById } from "@/services/mockData";
import { Suspect, SuspectStatus } from "@/types";
import AddSuspectDialog from "@/components/suspects/AddSuspectDialog";
import SuspectSearchFilters from "@/components/suspects/SuspectSearchFilters";
import SuspectsList from "@/components/suspects/SuspectsList";

// All possible suspect statuses for the filter
const suspectStatuses: SuspectStatus[] = [
  'suspect',
  'person of interest',
  'charged',
  'cleared',
  'convicted',
  'acquitted'
];

const Suspects = () => {
  const [suspects, setSuspects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<SuspectStatus | null>(null);
  
  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      const allSuspects = getSuspects();
      
      // Enhance suspects with crime information
      const enhancedSuspects = allSuspects.map(suspect => {
        const crime = getCrimeById(suspect.crimeId);
        return { ...suspect, crime };
      });
      
      setSuspects(enhancedSuspects);
      setLoading(false);
    }, 500);
  }, []);
  
  const filteredSuspects = suspects.filter(suspect => {
    const matchesSearch = searchTerm === "" || 
      suspect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (suspect.address && suspect.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (suspect.contactInfo && suspect.contactInfo.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === null || suspect.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  if (loading) {
    return (
      <div className="page-container flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading suspects/persons of interest...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Suspects & Persons of Interest</h1>
          <p className="text-muted-foreground">View and manage people associated with crimes</p>
        </div>
        <AddSuspectDialog />
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <SuspectSearchFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            suspectStatuses={suspectStatuses}
          />
          
          <SuspectsList suspects={filteredSuspects} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Suspects;
