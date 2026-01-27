// components/FilterPanel.tsx

import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from 'react-i18next';

interface FilterPanelProps {
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (neighborhood: string) => void;
  bedrooms: string;
  setBedrooms: (bedrooms: string) => void;
  showVerifiedOnly: boolean;
  setShowVerifiedOnly: (verified: boolean) => void;
  neighborhoods: any[];
}

const FilterPanel = ({
  priceRange,
  setPriceRange,
  selectedNeighborhood,
  setSelectedNeighborhood,
  bedrooms,
  setBedrooms,
  showVerifiedOnly,
  setShowVerifiedOnly,
  neighborhoods,
}: FilterPanelProps) => {
  const { t, i18n } = useTranslation();
  console.log('FilterPanel rendering with language:', i18n.language, t('search.filters.priceRange'));

  return (
    <div key={i18n.language} className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">{t('search.filters.priceRange')}</h3>
        <div className="space-y-3">
          <Slider
            value={[priceRange.min, priceRange.max]}
            onValueChange={(value) => setPriceRange({ min: value[0], max: value[1] })}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange.min} جنيه</span>
            <span>{priceRange.max} جنيه</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">{t('search.filters.neighborhood')}</h3>
        <Select
          value={selectedNeighborhood}
          onValueChange={setSelectedNeighborhood}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('search.filters.allNeighborhoods')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('search.filters.allNeighborhoods')}</SelectItem>
            {neighborhoods.map((n) => (
              <SelectItem key={n.id} value={n.name}>
                {n.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">{t('search.filters.bedrooms')}</h3>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger>
            <SelectValue placeholder={t('search.filters.bedrooms')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">{t('search.filters.any')}</SelectItem>
            <SelectItem value="1">{t('search.filters.oneBedroom')}</SelectItem>
            <SelectItem value="2">{t('search.filters.twoBedrooms')}</SelectItem>
            <SelectItem value="3">{t('search.filters.threeBedrooms')}</SelectItem>
            <SelectItem value="4">{t('search.filters.fourOrMore')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={showVerifiedOnly}
          onCheckedChange={(checked) => setShowVerifiedOnly(checked === true)}
        />
        <label htmlFor="verified" className="text-sm font-medium">
          {t('search.filters.verifiedOnly')}
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;