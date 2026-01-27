// components/FilterPanel.tsx

import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterPanelProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
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
}: FilterPanelProps) => (
  <div className="space-y-6">
    <div>
      <h3 className="font-semibold mb-3">النطاق السعري</h3>
      <div className="space-y-3">
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={10000}
          min={0}
          step={100}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0]} جنيه</span>
          <span>{priceRange[1]} جنيه</span>
        </div>
      </div>
    </div>

    <div>
      <h3 className="font-semibold mb-3">المنطقة</h3>
      <Select
        value={selectedNeighborhood}
        onValueChange={setSelectedNeighborhood}
      >
        <SelectTrigger>
          <SelectValue placeholder="اختر المنطقة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">جميع المناطق</SelectItem>
          {neighborhoods.map((n) => (
            <SelectItem key={n.id} value={n.name}>
              {n.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div>
      <h3 className="font-semibold mb-3">عدد الغرف</h3>
      <Select value={bedrooms} onValueChange={setBedrooms}>
        <SelectTrigger>
          <SelectValue placeholder="عدد الغرف" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">أي عدد</SelectItem>
          <SelectItem value="1">غرفة واحدة</SelectItem>
          <SelectItem value="2">غرفتان</SelectItem>
          <SelectItem value="3">ثلاث غرف</SelectItem>
          <SelectItem value="4">أربع غرف أو أكثر</SelectItem>
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
        شقق موثقة فقط
      </label>
    </div>
  </div>
);

export default FilterPanel;