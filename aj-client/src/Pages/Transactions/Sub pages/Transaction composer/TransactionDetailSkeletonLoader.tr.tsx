import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface TransactionLoaderProps {
  numRows?: number;
}

const TransactionLoader: React.FC<TransactionLoaderProps> = ({ numRows = 5 }) => {
  return (
    <div className="p-4 space-y-4">
      {Array.from({ length: numRows }).map((_, idx) => (
        <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col space-y-2">
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={20} />
          </div>
          <Skeleton width={80} height={30} />
        </div>
      ))}
    </div>
  );
};

export default TransactionLoader;