// components/SortSelect.tsx

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortSelectProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const SortSelect = ({ sortBy, setSortBy }: SortSelectProps) => (
  <Select value={sortBy} onValueChange={setSortBy}>
    <SelectTrigger className="w-48">
      <SelectValue placeholder="ترتيب حسب" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="newest">الأحدث</SelectItem>
      <SelectItem value="price-low">السعر: الأقل أولاً</SelectItem>
      <SelectItem value="price-high">السعر: الأعلى أولاً</SelectItem>
      <SelectItem value="rating">التقييم</SelectItem>
    </SelectContent>
  </Select>
);

export default SortSelect;