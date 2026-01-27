// components/SortSelect.tsx

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';

interface SortSelectProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const SortSelect = ({ sortBy, setSortBy }: SortSelectProps) => {
  const { t } = useTranslation();

  return (
  <Select value={sortBy} onValueChange={setSortBy}>
    <SelectTrigger className="w-48">
      <SelectValue placeholder={t('search.sort.newest')} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="newest">{t('search.sort.newest')}</SelectItem>
      <SelectItem value="price-low">{t('search.sort.priceLow')}</SelectItem>
      <SelectItem value="price-high">{t('search.sort.priceHigh')}</SelectItem>
      <SelectItem value="rating">{t('search.sort.rating')}</SelectItem>
    </SelectContent>
  </Select>
  );
};

export default SortSelect;