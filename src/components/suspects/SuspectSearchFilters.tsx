
import { Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SuspectStatus } from "@/types";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SuspectSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: SuspectStatus | null;
  setStatusFilter: (status: SuspectStatus | null) => void;
  suspectStatuses: SuspectStatus[];
}

const SuspectSearchFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  suspectStatuses
}: SuspectSearchFiltersProps) => {
  
  const hasActiveFilters = statusFilter !== null;
  
  const clearFilters = () => {
    setStatusFilter(null);
  };

  return (
    <>
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
    </>
  );
};

export default SuspectSearchFilters;
