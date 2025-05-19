
import { useState, useEffect } from "react";
import { 
  Filter, 
  PlusCircle, 
  Search,
  Info,
  X,
  Link as LinkIcon
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
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
import { getSuspects, getCrimeById } from "@/services/mockData";
import { Suspect, SuspectStatus, Crime } from "@/types";
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
import { Link } from "react-router-dom";

// Status color mapping
const statusColors = {
  'suspect': "bg-amber-500",
  'person of interest': "bg-blue-500",
  'charged': "bg-purple-500",
  'cleared': "bg-green-500",
  'convicted': "bg-red-500",
  'acquitted': "bg-teal-500"
};

// All possible suspect statuses for the filter
const suspectStatuses: SuspectStatus[] = [
  'suspect',
  'person of interest',
  'charged',
  'cleared',
  'convicted',
  'acquitted'
];

interface SuspectWithCrime extends Suspect {
  crime?: Crime;
}

const SuspectDetailsDialog = ({ suspect }: { suspect: SuspectWithCrime }) => {
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
          <DialogTitle>Suspect Details</DialogTitle>
          <DialogDescription>
            Personal information and case association
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Name</Label>
            <div className="font-medium">{suspect.name}</div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Status</Label>
            <div>
              <Badge 
                variant="secondary"
                className={cn(
                  "capitalize",
                  statusColors[suspect.status as keyof typeof statusColors],
                  "text-white"
                )}
              >
                {suspect.status}
              </Badge>
            </div>
          </div>
          
          {suspect.dateOfBirth && (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
              <div>{suspect.dateOfBirth}</div>
            </div>
          )}
          
          {suspect.gender && (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
              <div>{suspect.gender}</div>
            </div>
          )}
          
          {suspect.address && (
            <div className="space-y-1 md:col-span-2">
              <Label className="text-sm font-medium text-muted-foreground">Address</Label>
              <div>{suspect.address}</div>
            </div>
          )}
          
          {suspect.contactInfo && (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-muted-foreground">Contact Info</Label>
              <div>{suspect.contactInfo}</div>
            </div>
          )}
          
          <div className="space-y-1 md:col-span-2">
            <Label className="text-sm font-medium text-muted-foreground">Associated Crime</Label>
            <div className="flex items-center gap-2">
              <span>Case #{suspect.crimeId}</span>
              {suspect.crime && (
                <Badge variant="outline">
                  {suspect.crime.type.charAt(0).toUpperCase() + suspect.crime.type.slice(1).replace(/([A-Z])/g, ' $1')}
                </Badge>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/crimes?id=${suspect.crimeId}`}>
                  <LinkIcon size={14} className="mr-1" />
                  View Case
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddSuspectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={18} />
          Add Person
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Person</DialogTitle>
          <DialogDescription>
            Enter the suspect or person of interest details.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="suspect-name">Name</Label>
            <Input id="suspect-name" placeholder="Full name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-status">Status</Label>
            <Select>
              <SelectTrigger id="suspect-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {suspectStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      <span className="capitalize">{status}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-dob">Date of Birth</Label>
            <Input id="suspect-dob" type="date" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-gender">Gender</Label>
            <Select>
              <SelectTrigger id="suspect-gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="suspect-address">Address</Label>
            <Input id="suspect-address" placeholder="Current address (if known)" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-contact">Contact Info</Label>
            <Input id="suspect-contact" placeholder="Phone, email, etc." />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-crime">Associated Crime ID</Label>
            <Input id="suspect-crime" placeholder="Enter Crime ID" />
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

const Suspects = () => {
  const [suspects, setSuspects] = useState<SuspectWithCrime[]>([]);
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
  
  const clearFilters = () => {
    setStatusFilter(null);
  };
  
  const filteredSuspects = suspects.filter(suspect => {
    const matchesSearch = searchTerm === "" || 
      suspect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (suspect.address && suspect.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (suspect.contactInfo && suspect.contactInfo.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === null || suspect.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const hasActiveFilters = statusFilter !== null;
  
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
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search suspects..."
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
                    {suspectStatuses.map(status => (
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
                  <th>Name</th>
                  <th>Status</th>
                  <th>Associated Crime</th>
                  <th>Contact Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuspects.length > 0 ? (
                  filteredSuspects.map((suspect) => (
                    <tr key={suspect.id}>
                      <td>#{suspect.id}</td>
                      <td>
                        <div className="font-medium">{suspect.name}</div>
                        {suspect.gender && suspect.dateOfBirth && (
                          <div className="text-xs text-muted-foreground">
                            {suspect.gender}, DOB: {suspect.dateOfBirth}
                          </div>
                        )}
                      </td>
                      <td>
                        <Badge 
                          variant="secondary"
                          className={cn(
                            "capitalize",
                            statusColors[suspect.status as keyof typeof statusColors],
                            "text-white"
                          )}
                        >
                          {suspect.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span>#{suspect.crimeId}</span>
                          {suspect.crime && (
                            <Badge variant="outline" className="capitalize">
                              {suspect.crime.type.replace(/([A-Z])/g, ' $1')}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td>
                        {suspect.contactInfo || (
                          <span className="text-muted-foreground italic text-sm">Not available</span>
                        )}
                      </td>
                      <td>
                        <SuspectDetailsDialog suspect={suspect} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-muted-foreground">
                      No suspects/persons of interest found matching your criteria
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

export default Suspects;
