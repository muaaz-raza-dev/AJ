import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StatBoxSkeleton = () => {
  return (
    <div className="p-6 rounded-lg text-center shadow-lg w-full">
      <div className="flex gap-4 h-32 w-full">
        <Skeleton  height={100} width={300} />
        <Skeleton  height={100} width={300} />
        <Skeleton  height={100} width={300} />
      </div>
    </div>
  );
};

const FilterableStatSectionSkeleton = () => {
  return (
    <div className="w-full mt-8">
        <StatBoxSkeleton />
      
    </div>
  );
};


export default FilterableStatSectionSkeleton