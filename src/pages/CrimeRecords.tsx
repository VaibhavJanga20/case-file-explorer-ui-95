
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { 
  Filter, 
  PlusCircle, 
  Search,
  Info,
  X
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
import { getCrimes } from "@/services/mockData";
import { Crime, CrimeType } from "@/types";
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

// Status color mapping
const statusColors = {
  open: "bg-amber-500",
  closed: "bg-green-500",
  cold: "bg-blue-500",
  pending: "bg-purple-500",
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500"
};

// Helper to format crime types for display
const formatCrimeType = (type: CrimeType): string => {
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1');
};

// All possible crime types for the filter
const crimeTypes: CrimeType[] = [
  'theft', 
  'assault', 
  'burglary', 
  'robbery', 
  'fraud', 
  'homicide', 
  'vandalism',
  'cyberCrime',
  'kidnapping',
  'drugOffense',
  'other'
];

// All possible statuses for the filter
const crimeStatuses = ['open', 'closed', 'cold', 'pending'];

const CrimeDetailsDialog = ({ crime }: { crime: Crime }) => {
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
          <DialogTitle>Crime Details</DialogTitle>
          <DialogDescription>
            Case #{crime.id} - {formatCrimeType(crime.type)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Type</Label>
            <div>{formatCrimeType(crime.type)}</div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Date</Label>
            <div>{new Date(crime.date).toLocaleString()}</div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Location</Label>
            <div>{crime.location}</div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Status</Label>
            <div>
              <Badge 
                variant="secondary"
                className={cn(
                  "capitalize",
                  statusColors[crime.status as keyof typeof statusColors],
                  "text-white"
                )}
              >
                {crime.status}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Severity</Label>
            <div>
              <Badge 
                variant="outline"
                className={cn(
                  "capitalize",
                  statusColors[crime.severity as keyof typeof statusColors],
                  "bg-transparent border-current"
                )}
              >
                {crime.severity}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-1 md:col-span-2">
            <Label className="text-sm font-medium text-muted-foreground">Description</Label>
            <div>{crime.description}</div>
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

const AddCrimeDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={18} />
          Add Crime
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Crime</DialogTitle>
          <DialogDescription>
            Enter the details of the new crime incident.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="crime-type">Crime Type</Label>
            <Select>
              <SelectTrigger id="crime-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Crime Types</SelectLabel>
                  {crimeTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatCrimeType(type)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="crime-date">Date & Time</Label>
            <Input id="crime-date" type="datetime-local" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="crime-location">Location</Label>
            <Input id="crime-location" placeholder="Enter location" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="crime-status">Status</Label>
            <Select>
              <SelectTrigger id="crime-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {crimeStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      <span className="capitalize">{status}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="crime-severity">Severity</Label>
            <Select>
              <SelectTrigger id="crime-severity">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Severity</SelectLabel>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="crime-description">Description</Label>
            <Textarea id="crime-description" placeholder="Enter a detailed description of the crime" rows={4} />
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

const CrimeRecords = () => {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<CrimeType | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setCrimes(getCrimes());
      setLoading(false);
    }, 500);
  }, []);
  
  const clearFilters = () => {
    setTypeFilter(null);
    setStatusFilter(null);
    setSeverityFilter(null);
  };
  
  const filteredCrimes = crimes.filter(crime => {
    const matchesSearch = searchTerm === "" || 
      crime.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crime.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crime.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = typeFilter === null || crime.type === typeFilter;
    const matchesStatus = statusFilter === null || crime.status === statusFilter;
    const matchesSeverity = severityFilter === null || crime.severity === severityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesSeverity;
  });
  
  const hasActiveFilters = typeFilter !== null || statusFilter !== null || severityFilter !== null;
  
  if (loading) {
    return (
      <div className="page-container flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading crime records...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Crime Records</h1>
          <p className="text-muted-foreground">Manage and view all crime incidents</p>
        </div>
        <AddCrimeDialog />
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search crimes..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
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
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Crime Type</DropdownMenuLabel>
                    {crimeTypes.map(type => (
                      <DropdownMenuItem 
                        key={type}
                        onClick={() => setTypeFilter(type)}
                        className={cn(typeFilter === type && "bg-muted")}
                      >
                        {formatCrimeType(type)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Status</DropdownMenuLabel>
                    {crimeStatuses.map(status => (
                      <DropdownMenuItem 
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={cn(statusFilter === status && "bg-muted")}
                      >
                        <span className="capitalize">{status}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Severity</DropdownMenuLabel>
                    {['low', 'medium', 'high', 'critical'].map(severity => (
                      <DropdownMenuItem 
                        key={severity}
                        onClick={() => setSeverityFilter(severity)}
                        className={cn(severityFilter === severity && "bg-muted")}
                      >
                        <span className="capitalize">{severity}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap gap-2">
              {typeFilter && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Type: {formatCrimeType(typeFilter)}
                  <button onClick={() => setTypeFilter(null)}>
                    <X size={12} className="ml-1" />
                  </button>
                </Badge>
              )}
              
              {statusFilter && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Status: <span className="capitalize">{statusFilter}</span>
                  <button onClick={() => setStatusFilter(null)}>
                    <X size={12} className="ml-1" />
                  </button>
                </Badge>
              )}
              
              {severityFilter && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Severity: <span className="capitalize">{severityFilter}</span>
                  <button onClick={() => setSeverityFilter(null)}>
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
                  <th>Type</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Severity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrimes.length > 0 ? (
                  filteredCrimes.map((crime) => (
                    <tr key={crime.id}>
                      <td>#{crime.id}</td>
                      <td>{formatCrimeType(crime.type)}</td>
                      <td>
                        <span className="block">{new Date(crime.date).toLocaleDateString()}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(crime.date), { addSuffix: true })}
                        </span>
                      </td>
                      <td>{crime.location}</td>
                      <td>
                        <Badge 
                          variant="secondary"
                          className={cn(
                            "capitalize",
                            statusColors[crime.status as keyof typeof statusColors],
                            "text-white"
                          )}
                        >
                          {crime.status}
                        </Badge>
                      </td>
                      <td>
                        <Badge 
                          variant="outline"
                          className={cn(
                            "capitalize",
                            statusColors[crime.severity as keyof typeof statusColors],
                            "bg-transparent border-current"
                          )}
                        >
                          {crime.severity}
                        </Badge>
                      </td>
                      <td>
                        <CrimeDetailsDialog crime={crime} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-muted-foreground">
                      No crimes found matching your criteria
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

export default CrimeRecords;
