import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { 
  Filter, 
  PlusCircle, 
  Search,
  Info,
  X,
  Link as LinkIcon,
  Clock
} from "lucide-react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getInvestigations, getCrimeById } from "@/services/mockData";
import { Investigation, InvestigationStatus, Crime } from "@/types";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

// Status color mapping
const statusColors = {
  'pending': "bg-amber-500",
  'active': "bg-blue-500",
  'complete': "bg-green-500",
  'suspended': "bg-red-500"
};

// All possible investigation statuses for the filter
const investigationStatuses: InvestigationStatus[] = [
  'pending',
  'active',
  'complete',
  'suspended'
];

interface InvestigationWithCrime extends Investigation {
  crime?: Crime;
}

const InvestigationDetailsDialog = ({ investigation }: { investigation: InvestigationWithCrime }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Info size={16} className="mr-1" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Investigation Details</DialogTitle>
          <DialogDescription>
            Investigation #{investigation.id} - {investigation.status.toUpperCase()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Officer in Charge</Label>
            <div className="font-medium">{investigation.officerInCharge}</div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Status</Label>
            <div>
              <Badge 
                variant="secondary"
                className={cn(
                  "capitalize",
                  statusColors[investigation.status as keyof typeof statusColors],
                  "text-white"
                )}
              >
                {investigation.status}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Start Date</Label>
            <div>{new Date(investigation.startDate).toLocaleDateString()}</div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Last Updated</Label>
            <div>{new Date(investigation.lastUpdated).toLocaleDateString()}</div>
          </div>
          
          <div className="space-y-1 md:col-span-2">
            <Label className="text-sm font-medium text-muted-foreground">Associated Crime</Label>
            <div className="flex items-center gap-2">
              <span>Case #{investigation.crimeId}</span>
              {investigation.crime && (
                <Badge variant="outline" className="capitalize">
                  {investigation.crime.type.charAt(0).toUpperCase() + investigation.crime.type.slice(1).replace(/([A-Z])/g, ' $1')}
                </Badge>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/crimes?id=${investigation.crimeId}`}>
                  <LinkIcon size={14} className="mr-1" />
                  View Case
                </Link>
              </Button>
            </div>
          </div>
          
          {investigation.notes && (
            <div className="space-y-1 md:col-span-2">
              <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
              <div className="p-3 bg-muted rounded-md text-sm">{investigation.notes}</div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddInvestigationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={18} />
          Add Investigation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Investigation</DialogTitle>
          <DialogDescription>
            Create a new investigation for a crime case.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="investigation-crimeId">Associated Crime ID</Label>
            <Input id="investigation-crimeId" placeholder="Enter Crime ID" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="investigation-officer">Officer in Charge</Label>
            <Input id="investigation-officer" placeholder="Full name with rank" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="investigation-status">Status</Label>
            <Select>
              <SelectTrigger id="investigation-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {investigationStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      <span className="capitalize">{status}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="investigation-startDate">Start Date</Label>
            <Input id="investigation-startDate" type="date" />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="investigation-notes">Notes</Label>
            <Textarea 
              id="investigation-notes" 
              placeholder="Initial investigation notes" 
              rows={4} 
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Investigations = () => {
  const [investigations, setInvestigations] = useState<InvestigationWithCrime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvestigationStatus | null>(null);
  
  useEffect(() => {
    const fetchInvestigations = async () => {
      setLoading(true);
      try {
        // Get all investigations
        const allInvestigations = await getInvestigations();
        
        // Enhance investigations with crime information
        const enhancedInvestigations: InvestigationWithCrime[] = [];
        
        for (const investigation of allInvestigations) {
          const crime = await getCrimeById(investigation.crimeId);
          enhancedInvestigations.push({ ...investigation, crime });
        }
        
        setInvestigations(enhancedInvestigations);
      } catch (error) {
        console.error("Error fetching investigations:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvestigations();
  }, []);
  
  const clearFilters = () => {
    setStatusFilter(null);
  };
  
  const filteredInvestigations = investigations.filter(investigation => {
    const matchesSearch = searchTerm === "" || 
      investigation.officerInCharge.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (investigation.notes && investigation.notes.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === null || investigation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const hasActiveFilters = statusFilter !== null;
  
  if (loading) {
    return (
      <div className="page-container flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading investigations...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Investigations</h1>
          <p className="text-muted-foreground">Track and manage ongoing and completed investigations</p>
        </div>
        <AddInvestigationDialog />
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by officer or notes..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-8 gap-1"
                >
                  <X size={14} />
                  Clear Filters
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter size={14} />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Status</DropdownMenuLabel>
                    {investigationStatuses.map(status => (
                      <DropdownMenuItem 
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={cn(statusFilter === status && "bg-muted")}
                      >
                        <span className="capitalize">{status}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap gap-2">
              {statusFilter && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Status: <span className="capitalize">{statusFilter}</span>
                  <button onClick={() => setStatusFilter(null)}>
                    <X size={12} className="ml-1" />
                  </button>
                </Badge>
              )}
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="data-grid">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Case</th>
                  <th>Officer in Charge</th>
                  <th>Status</th>
                  <th>Timeline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestigations.length > 0 ? (
                  filteredInvestigations.map((investigation) => (
                    <tr key={investigation.id}>
                      <td>#{investigation.id}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span>#{investigation.crimeId}</span>
                          {investigation.crime && (
                            <Badge variant="outline" className="capitalize">
                              {investigation.crime.type.charAt(0).toUpperCase() + investigation.crime.type.slice(1).replace(/([A-Z])/g, ' $1')}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td>{investigation.officerInCharge}</td>
                      <td>
                        <Badge 
                          variant="secondary"
                          className={cn(
                            "capitalize",
                            statusColors[investigation.status as keyof typeof statusColors],
                            "text-white"
                          )}
                        >
                          {investigation.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="flex flex-col text-sm">
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-muted-foreground" />
                            <span>Started: {formatDistanceToNow(new Date(investigation.startDate), { addSuffix: true })}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Updated: {formatDistanceToNow(new Date(investigation.lastUpdated), { addSuffix: true })}
                          </div>
                        </div>
                      </td>
                      <td>
                        <InvestigationDetailsDialog investigation={investigation} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-muted-foreground">
                      No investigations found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Investigations;
