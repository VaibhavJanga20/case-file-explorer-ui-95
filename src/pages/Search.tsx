
import { useState } from "react";
import { searchAll } from "@/services/mockData";
import { Crime, Suspect, Investigation } from "@/types";
import SearchForm from "@/components/search/SearchForm";
import SearchResults from "@/components/search/SearchResults";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{
    crimes: Crime[];
    suspects: Suspect[];
    investigations: Investigation[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = searchAll(term);
      setSearchResults(results);
      setLoading(false);
    }, 500);
  };
  
  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-2">Advanced Search</h1>
      <p className="text-muted-foreground mb-6">Search across crimes, suspects, and investigations</p>
      
      <SearchForm onSearch={handleSearch} loading={loading} />
      <SearchResults searchTerm={searchTerm} loading={loading} results={searchResults} />
    </div>
  );
};

export default SearchPage;
