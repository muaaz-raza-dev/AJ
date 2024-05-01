import { useAppSelector } from "@/app/ReduxHooks";
import Skeleton from "react-loading-skeleton";
import Ld from "lodash";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
const TransactionStudentDisplay = () => {
  let { student, MonthlyFee_history: history } = useAppSelector(
    (state) => state.trCompose
  );

  return (
    <>
      {Ld.size(student) != 0 ? (
        <div className="flex gap-x-4 w-full">
          <div className="flex shadow-inner border gap-2 rounded px-2 py-4  w-[50%] ">
            <div className="w-[20%] h-full rounded ">
              {student?.photo ? (
                <img
                  src={student?.photo}
                  alt=""
                  className="bg-white rounded-md border aspect-square h-full"
                />
              ) : (
                <Skeleton className="h-full w-full" />
              )}
            </div>
            <div className="w-[80%] flex flex-col gap-2">
              <h1 className="text-lg font-bold hFont">
                Students Basic Information
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
          <div className="flex shadow-inner border gap-2 rounded px-2 py-4  w-[50%] ">
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-x-2 hFont text-xs font-bold">
                <h1 className="text-lg">Monthly Fee history</h1>
              </div>
              <div className="flex gap-6 ">
                <div className="w-[48%] flex flex-col gap-2">
                  <h1 className="text-[var(--dark)] hFont text-md font-semibold">
                    Duration
                  </h1>
                  {history.map((elm, i) => {
                    let duration =elm.duration
                    let StartingYear =duration?Object.keys(duration)[0] : moment(elm.Time).year().toString();
                      let StartingMonth =elm.duration? elm?.duration[StartingYear][elm?.duration[StartingYear].length - 1]: moment.months(moment(elm.Time).month())
                      let LastYear = duration ?Object.keys(duration)[Object.keys(duration).length-1] : "now"
              
                      
                    return (
                      <div className="flex gap-1 items-center">
                        <b className="text-[var(--dark)]">{i + 1}.</b>
                        <h2 className="text-sm hFont whitespace-nowrap">
                          {
                            elm.duration
                              ? `${StartingYear}-${StartingMonth} to ${LastYear}-${elm.duration[LastYear][elm.duration[LastYear].length - 1]} `
                              : `${StartingYear} ${StartingMonth} till now`
                            // -March to 2024 Apri
                          }
                        </h2>
                      </div>
                    );
                  })}
                
                </div>
                <div className="w-[48%] flex flex-col gap-2">
                  <h1 className="text-[var(--dark)] hFont text-md font-semibold ">
                    Amount
                  </h1>
                  {
                    history.map(e=><h2 className="text-sm hFont whitespace-nowrap">{e.Fee} pkr</h2>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex shadow-inner border gap-2 rounded bg-[var(--bg)] px-2 py-2  w-[50%] ">
            <div className="w-[20%] h-full rounded py-1">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="w-[80%]">
              <Skeleton count={4} className="w-full " />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TransactionStudentDisplay;
