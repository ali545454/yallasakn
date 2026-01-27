// components/SearchBar.tsx

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { stripTags } from "../../SignUp/utils/sanitize";
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1 relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder={t('search.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(stripTags(e.target.value))}
          className="pr-12 h-12 text-right"
        />
      </div>
    </div>
  );
};

export default SearchBar;