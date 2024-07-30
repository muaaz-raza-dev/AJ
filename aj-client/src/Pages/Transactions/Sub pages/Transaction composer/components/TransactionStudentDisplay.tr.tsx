import { useAppSelector } from "@/app/ReduxHooks";
import Skeleton from "react-loading-skeleton";
import Ld from "lodash";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
const TransactionStudentDisplay = () => {
  let {isLoading, StudentInfo:student, ClassbasedFeeInfo: history  } = useAppSelector(
    (state) => state.trComposeFilters
  );
  let {Classes }= useAppSelector(s=>s.global)
  let Class = Classes[student?.CurrentClass||""] ||""
  return (
    <>
      {!isLoading && Ld.size(student) != 0 ? (
        <div className="flex gap-x-4 gap-2 w-full max-md:flex-wrap">
          <div className="flex shadow-inner border-2 dark:border-dark gap-2 rounded-md px-4 py-4  w-[50%] max-md:w-full">
            <div className="w-[20%] h-full center aspect-square rounded ">
              {student?.photo ? (
                <img
                  src={student?.photo}
                  alt=""
                  className="bg-white rounded-md border aspect-square "
                />
              ) : (
                <Skeleton className="h-full w-full" />
              )}
            </div>
            <div className="w-[80%] flex flex-col gap-2">
              <h1 className="text-lg font-bold hFont">
                Student basic information
              </h1>
              <div className="flex gap-x-4 hFont text-xs font-semibold">
                <span>GRNO :</span>
                <p className=" hFont">{student?.GRNO}</p>
              </div>
              <div className="flex gap-x-2 hFont text-xs font-semibold">
                <span>Name :</span>
                <p className=" hFont">{student?.FirstName}</p>
              </div>
              <div className="flex gap-x-2 hFont text-xs font-semibold">
                <span>Father Name :</span>
                <p className=" hFont">{student?.fatherName}</p>
              </div>
              <div className="flex gap-x-2 hFont text-xs font-semibold">
                <span>Date of Admission :</span>
                <p className=" hFont">
                  {student?.DOA} ({moment(student?.DOA).fromNow()})
                </p>
              </div>
            </div>
          </div>
          {/* //! Monthly Fee Record */}
          <div className="flex shadow-inner border-2 dark:border-dark  gap-2 rounded px-4 py-4  w-[50%] max-md:w-full">
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-x-2 hFont text-xs font-semibold">
                <h1 className="text-lg"> {Class} Class  Details ( Session Based ) </h1>
              </div>

              <div className="flex gap-6 ">
                <div className="w-[48%] flex flex-col gap-2">
                  <h1 className="text-dark dark:text-gray-300 hFont text-md font-semibold">
                    Payment title
                  </h1>
                  {Object.keys(history).map((e,i)=><p className=" font-semibold ">{i+1}. {e}</p>)}
                </div>
                <div className="w-[48%] flex flex-col gap-2">
                  <h1 className="text-[var(--dark)] hFont dark:text-gray-300 text-md font-semibold ">
                    Amount
                  </h1>
                  {Object.values(history).map(e=><p className=" font-semibold ">{e}</p>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-1 w-full">
          <div className="flex shadow-inner  border gap-2 rounded dark:border-dark dark:bg-darker bg-[var(--bg)] px-2 py-2  w-[48%] ">
            <div className="w-[20%] h-full rounded pb-2">
              <Skeleton className="h-full w-full dark:bg-dark" baseColor="transparent"/>
            </div>
            <div className="w-[80%]">
              <Skeleton count={4} className="w-full dark:bg-dark" baseColor="transparent" />
            </div>
          </div>
          <div className="flex shadow-inner  border gap-2 rounded dark:border-dark dark:bg-darker bg-[var(--bg)] px-2 py-2  w-[48%] ">
            
            <div className="w-full">
              <Skeleton count={4} className="w-full dark:bg-dark" baseColor="transparent" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionStudentDisplay;
