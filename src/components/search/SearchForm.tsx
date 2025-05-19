
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSearch: (term: string) => void;
  loading: boolean;
}

const SearchForm = ({ onSearch, loading }: SearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
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
  );
};

export default SearchForm;
