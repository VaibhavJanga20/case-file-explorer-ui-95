
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { 
  Search as SearchIcon, 
  ChevronDown, 
  ChevronUp,
  Briefcase,
  FileText,
  Users,
  AlertCircle,
  Info
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { searchAll } from "@/services/mockData";
import { Crime, Suspect, Investigation } from "@/types";

const statusColors = {
  // Crime statuses
  open: "bg-amber-500",
  closed: "bg-green-500",
  cold: "bg-blue-500",
  pending: "bg-purple-500",
  
  // Crime severities 
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
  
  // Suspect statuses
  'suspect': "bg-amber-500",
  'person of interest': "bg-blue-500",
  'charged': "bg-purple-500",
  'cleared': "bg-green-500",
  'convicted': "bg-red-500",
  'acquitted': "bg-teal-500",
  
  // Investigation statuses
  'active': "bg-blue-500",
  'complete': "bg-green-500",
  'suspended': "bg-red-500"
};

// Format crime type for display
const formatCrimeType = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1');
};

// Component to show each crime result
const CrimeResult = ({ crime }: { crime: Crime }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            {formatCrimeType(crime.type)}
            <Badge 
              variant="secondary"
              className={cn(
                "capitalize ml-2",
                statusColors[crime.status as keyof typeof statusColors],
                "text-white"
              )}
            >
              {crime.status}
            </Badge>
          </CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">
          <span className="font-medium">Location:</span> {crime.location}
        </div>
        <div className="text-sm mb-2">
          <span className="font-medium">Date:</span> {new Date(crime.date).toLocaleDateString()} ({formatDistanceToNow(new Date(crime.date), { addSuffix: true })})
        </div>
        <p className="text-sm text-muted-foreground">{crime.description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/crimes?id=${crime.id}`}>
            <Info size={16} className="mr-1" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Component to show each suspect result
const SuspectResult = ({ suspect }: { suspect: Suspect }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users size={18} className="text-amber-500" />
            {suspect.name}
          </CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">
          <span className="font-medium">Associated Crime:</span> #{suspect.crimeId}
        </div>
        {suspect.gender && suspect.dateOfBirth && (
          <div className="text-sm mb-2">
            <span className="font-medium">Personal:</span> {suspect.gender}, DOB: {suspect.dateOfBirth}
          </div>
        )}
        {suspect.address && (
          <div className="text-sm mb-2">
            <span className="font-medium">Address:</span> {suspect.address}
          </div>
        )}
        {suspect.contactInfo && (
          <div className="text-sm mb-2">
            <span className="font-medium">Contact:</span> {suspect.contactInfo}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/suspects?id=${suspect.id}`}>
            <Info size={16} className="mr-1" />
            View Details
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/crimes?id=${suspect.crimeId}`}>
            <FileText size={16} className="mr-1" />
            View Case
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Component to show each investigation result
const InvestigationResult = ({ investigation }: { investigation: Investigation }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase size={18} className="text-blue-500" />
            Investigation #{investigation.id}
          </CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">
          <span className="font-medium">Associated Crime:</span> #{investigation.crimeId}
        </div>
        <div className="text-sm mb-2">
          <span className="font-medium">Officer in Charge:</span> {investigation.officerInCharge}
        </div>
        <div className="text-sm mb-2">
          <span className="font-medium">Timeline:</span> Started {formatDistanceToNow(new Date(investigation.startDate), { addSuffix: true })}, 
          Last Updated {formatDistanceToNow(new Date(investigation.lastUpdated), { addSuffix: true })}
        </div>
        {investigation.notes && (
          <div className="text-sm border-t border-border mt-2 pt-2">
            <span className="font-medium">Notes:</span> {investigation.notes}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/investigations?id=${investigation.id}`}>
            <Info size={16} className="mr-1" />
            View Details
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/crimes?id=${investigation.crimeId}`}>
            <FileText size={16} className="mr-1" />
            View Case
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{
    crimes: Crime[];
    suspects: Suspect[];
    investigations: Investigation[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    
    setLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = searchAll(searchTerm);
      setSearchResults(results);
      setLoading(false);
    }, 500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const totalResults = searchResults ? (
    searchResults.crimes.length + 
    searchResults.suspects.length + 
    searchResults.investigations.length
  ) : 0;
  
  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Advanced Search</h1>
      <p className="text-muted-foreground mb-6">Search across crimes, suspects, and investigations</p>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by keywords, locations, names, or descriptions..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button onClick={handleSearch} disabled={loading || searchTerm.trim() === ""}>
          {loading ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
              Searching...
            </>
          ) : (
            'Search'
          )}
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Searching database...</p>
        </div>
      ) : searchResults ? (
        totalResults > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Search Results</h2>
              <Badge variant="outline" className="text-muted-foreground">
                {totalResults} {totalResults === 1 ? 'result' : 'results'} found
              </Badge>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all" className="relative">
                  All
                  {totalResults > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {totalResults}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="crimes" className="relative">
                  Crimes
                  {searchResults.crimes.length > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {searchResults.crimes.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="suspects" className="relative">
                  Suspects
                  {searchResults.suspects.length > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {searchResults.suspects.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="investigations" className="relative">
                  Investigations
                  {searchResults.investigations.length > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground">
                      {searchResults.investigations.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {searchResults.crimes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <FileText size={18} className="mr-2 text-primary" />
                      Crimes ({searchResults.crimes.length})
                    </h3>
                    {searchResults.crimes.slice(0, 3).map(crime => (
                      <CrimeResult key={crime.id} crime={crime} />
                    ))}
                    {searchResults.crimes.length > 3 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-1"
                        onClick={() => setActiveTab("crimes")}
                      >
                        Show all {searchResults.crimes.length} crime results
                        <ChevronDown size={16} className="ml-1" />
                      </Button>
                    )}
                  </div>
                )}
                
                {searchResults.suspects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Users size={18} className="mr-2 text-amber-500" />
                      Suspects ({searchResults.suspects.length})
                    </h3>
                    {searchResults.suspects.slice(0, 3).map(suspect => (
                      <SuspectResult key={suspect.id} suspect={suspect} />
                    ))}
                    {searchResults.suspects.length > 3 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-1"
                        onClick={() => setActiveTab("suspects")}
                      >
                        Show all {searchResults.suspects.length} suspect results
                        <ChevronDown size={16} className="ml-1" />
                      </Button>
                    )}
                  </div>
                )}
                
                {searchResults.investigations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Briefcase size={18} className="mr-2 text-blue-500" />
                      Investigations ({searchResults.investigations.length})
                    </h3>
                    {searchResults.investigations.slice(0, 3).map(investigation => (
                      <InvestigationResult key={investigation.id} investigation={investigation} />
                    ))}
                    {searchResults.investigations.length > 3 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-1"
                        onClick={() => setActiveTab("investigations")}
                      >
                        Show all {searchResults.investigations.length} investigation results
                        <ChevronDown size={16} className="ml-1" />
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="crimes">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <FileText size={18} className="mr-2 text-primary" />
                  Crimes ({searchResults.crimes.length})
                </h3>
                {searchResults.crimes.length > 0 ? (
                  searchResults.crimes.map(crime => (
                    <CrimeResult key={crime.id} crime={crime} />
                  ))
                ) : (
                  <p className="text-muted-foreground">No crime records found matching your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="suspects">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Users size={18} className="mr-2 text-amber-500" />
                  Suspects ({searchResults.suspects.length})
                </h3>
                {searchResults.suspects.length > 0 ? (
                  searchResults.suspects.map(suspect => (
                    <SuspectResult key={suspect.id} suspect={suspect} />
                  ))
                ) : (
                  <p className="text-muted-foreground">No suspects found matching your search.</p>
                )}
              </TabsContent>
              
              <TabsContent value="investigations">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Briefcase size={18} className="mr-2 text-blue-500" />
                  Investigations ({searchResults.investigations.length})
                </h3>
                {searchResults.investigations.length > 0 ? (
                  searchResults.investigations.map(investigation => (
                    <InvestigationResult key={investigation.id} investigation={investigation} />
                  ))
                ) : (
                  <p className="text-muted-foreground">No investigations found matching your search.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center bg-muted/50 rounded-lg p-8 mt-4">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground">
              No matches found for "{searchTerm}". Try different keywords or check for spelling errors.
            </p>
          </div>
        )
      ) : (
        <div className="text-center bg-muted/50 rounded-lg p-8 mt-4">
          <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Search the Criminal Database</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Enter keywords to search across all crime records, suspects, and investigations. 
            You can search by crime type, location, names, descriptions, and more.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
