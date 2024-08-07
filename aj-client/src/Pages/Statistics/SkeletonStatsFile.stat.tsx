import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonStatsFile = () => {
    return (
        <div className="container 
     mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {/* Top Row */}
            <div className="col-span-1">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
            <div className="col-span-1">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
            <div className="col-span-2">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
          </div>
    
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Middle Row */}
            <div className="col-span-1">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
            <div className="col-span-1">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
          </div>
    
          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Bottom Row */}
            <div className="col-span-1">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
          </div>
    
          <div className="grid grid-cols-4 gap-4 mt-4">
            {/* Revenue Report */}
            <div className="col-span-1">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
            <div className="col-span-1">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
            <div className="col-span-1">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
            <div className="col-span-1">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
          </div>
    
          <div className="grid grid-cols-12 gap-4 mt-4">
            {/* Daily Report */}
            <div className="col-span-12">
              <Skeleton height={40} />
              <Skeleton count={2} height={20} />
            </div>
          </div>
        </div>
    )
    
}

export default SkeletonStatsFile