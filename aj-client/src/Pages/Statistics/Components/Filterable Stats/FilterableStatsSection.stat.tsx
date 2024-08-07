import FilterableStatBlocks from "./FilterableStatBlocks.stat";
import FiltersStats from "./FiltersStats.stat";

const FilterableStatsSection = () => {
  return (
    <div className="w-full bg-box shadow-inner flex flex-col gap-2 p-3 rounded-md">
      <div className="flex flex-wrap gap-2  items-center border-b-gray-200 border-b ">
        <FiltersStats />
      </div>
      <FilterableStatBlocks />
    </div>
  );
};

export default FilterableStatsSection;
