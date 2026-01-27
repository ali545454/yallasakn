// components/SearchBar.tsx

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { stripTags } from "../../SignUp/utils/sanitize";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }: SearchBarProps) => (
  <div className="flex gap-4 mb-4">
    <div className="flex-1 relative">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="ابحث عن شقق..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(stripTags(e.target.value))}
        className="pr-12 h-12 text-right"
        onKeyPress={(e) => e.key === "Enter" && onSearch()}
      />
    </div>
    <Button
      onClick={onSearch}
      className="h-12 w-12 p-0 flex items-center justify-center"
    >
      <Search className="h-5 w-5" />
    </Button>
  </div>
);

export default SearchBar;