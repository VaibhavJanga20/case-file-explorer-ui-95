
import { useState } from "react";
import { AlertCircle, Briefcase, ChevronDown, FileText, SearchIcon, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Crime, Suspect, Investigation } from "@/types";
import CrimeResult from "./CrimeResult";
import SuspectResult from "./SuspectResult";
import InvestigationResult from "./InvestigationResult";

interface SearchResultsProps {
  searchTerm: string;
  loading: boolean;
  results: {
    crimes: Crime[];
    suspects: Suspect[];
    investigations: Investigation[];
  } | null;
}

const SearchResults = ({ searchTerm, loading, results }: SearchResultsProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Searching database...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="text-center bg-muted/50 rounded-lg p-8 mt-4">
        <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Search the Criminal Database</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Enter keywords to search across all crime records, suspects, and investigations. 
          You can search by crime type, location, names, descriptions, and more.
        </p>
      </div>
    );
  }

  const totalResults = results.crimes.length + results.suspects.length + results.investigations.length;

  if (totalResults === 0) {
    return (
      <div className="text-center bg-muted/50 rounded-lg p-8 mt-4">
        <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground">
          No matches found for "{searchTerm}". Try different keywords or check for spelling errors.
        </p>
      </div>
    );
  }

  return (
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
            {results.crimes.length > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground">
                {results.crimes.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="suspects" className="relative">
            Suspects
            {results.suspects.length > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground">
                {results.suspects.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="investigations" className="relative">
            Investigations
            {results.investigations.length > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground">
                {results.investigations.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {results.crimes.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <FileText size={18} className="mr-2 text-primary" />
                Crimes ({results.crimes.length})
              </h3>
              {results.crimes.slice(0, 3).map(crime => (
                <CrimeResult key={crime.id} crime={crime} />
              ))}
              {results.crimes.length > 3 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-1"
                  onClick={() => setActiveTab("crimes")}
                >
                  Show all {results.crimes.length} crime results
                  <ChevronDown size={16} className="ml-1" />
                </Button>
              )}
            </div>
          )}
          
          {results.suspects.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Users size={18} className="mr-2 text-amber-500" />
                Suspects ({results.suspects.length})
              </h3>
              {results.suspects.slice(0, 3).map(suspect => (
                <SuspectResult key={suspect.id} suspect={suspect} />
              ))}
              {results.suspects.length > 3 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-1"
                  onClick={() => setActiveTab("suspects")}
                >
                  Show all {results.suspects.length} suspect results
                  <ChevronDown size={16} className="ml-1" />
                </Button>
              )}
            </div>
          )}
          
          {results.investigations.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Briefcase size={18} className="mr-2 text-blue-500" />
                Investigations ({results.investigations.length})
              </h3>
              {results.investigations.slice(0, 3).map(investigation => (
                <InvestigationResult key={investigation.id} investigation={investigation} />
              ))}
              {results.investigations.length > 3 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-1"
                  onClick={() => setActiveTab("investigations")}
                >
                  Show all {results.investigations.length} investigation results
                  <ChevronDown size={16} className="ml-1" />
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="crimes">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <FileText size={18} className="mr-2 text-primary" />
            Crimes ({results.crimes.length})
          </h3>
          {results.crimes.length > 0 ? (
            results.crimes.map(crime => (
              <CrimeResult key={crime.id} crime={crime} />
            ))
          ) : (
            <p className="text-muted-foreground">No crime records found matching your search.</p>
          )}
        </TabsContent>
        
        <TabsContent value="suspects">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Users size={18} className="mr-2 text-amber-500" />
            Suspects ({results.suspects.length})
          </h3>
          {results.suspects.length > 0 ? (
            results.suspects.map(suspect => (
              <SuspectResult key={suspect.id} suspect={suspect} />
            ))
          ) : (
            <p className="text-muted-foreground">No suspects found matching your search.</p>
          )}
        </TabsContent>
        
        <TabsContent value="investigations">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Briefcase size={18} className="mr-2 text-blue-500" />
            Investigations ({results.investigations.length})
          </h3>
          {results.investigations.length > 0 ? (
            results.investigations.map(investigation => (
              <InvestigationResult key={investigation.id} investigation={investigation} />
            ))
          ) : (
            <p className="text-muted-foreground">No investigations found matching your search.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchResults;
