import { MdOutlineAdd } from "react-icons/md";
import TransactionEstimateStats from "./TransactionEstimateStats.tr";
import TransactionStudentsStats from "./TransactionsStudentsStats.tr";
import { Link } from "react-router-dom";
import { useReadTransactionsMeta } from "@/Hooks/Transactions/useReadTransactions";



const TransactionHeader = () => {
  let {data} = useReadTransactionsMeta()
  console.log(data);
  
  return (
    <div className="flex gap-x-2">
      <TransactionEstimateStats />
      <TransactionStudentsStats/>
      <Link to={'create'} className="border py-4 rounded-lg border-[var(--primary)]  shadow-md px-4 min-w-[30%] bg-gradient-to-tr text-xl hFont to-[var(--darker)] from-[var(--dark)] text-white center flex-col transition-all duration-500 hover:bg-gradient-to-tl ">
      <MdOutlineAdd size={33}/>
        Create Transactions
      </Link>
    </div>
  );
};

export default TransactionHeader;
