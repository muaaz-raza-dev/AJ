import { usePagination } from "@/Hooks/Global/usePagincation";
import useAdvancedFilter from "@/Hooks/Students Dir/useAdvancedFilter";
import useLoadStudents from "@/Hooks/Students Dir/useLoadStudents";
import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import { InsertStudentsDir } from "@/app/Slices/StudentDirSlice";
import { useEffect } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";


const StudentTableInformationFooter = () => {
  let StdCountPerPage = import.meta.env.VITE_APP_STD_AMOUNT;
  let { totalStudents,Filters,StudentsData,count } = useAppSelector((state) => state.StudentsDir);
  let {
    goToPage,
    pageNumbers,
    currentPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination({
    totalItems: totalStudents,
    itemsPerPage: StdCountPerPage,
  });
  let { mutate } = useLoadStudents()();
  useEffect(() => {
    goToPage(count)
  }, [totalStudents]);
  let dispatch = useAppDispatch()
  let { mutate:AdvancedFilterMutation } = useAdvancedFilter();
  function handleCount(number: number) {
    if (Filters.Class=="All"&&!Filters.Covid&&!Filters.Polio) {
      if (!StudentsData[number])mutate(number);
    else {dispatch(InsertStudentsDir({MutableData:StudentsData[number]}))}
    }
    else{
      if (!StudentsData[number])AdvancedFilterMutation({Filters,count:number}) 
    else {dispatch(InsertStudentsDir({MutableData:StudentsData[number]}))}
    }
  }
  return (
    <div className="w-full justify-between flex  py-2 items-center dark:text-light px-4">
      <p>
        Showing{" "}
        <b className="text-dark dark:text-light">
          {StdCountPerPage * currentPage - StdCountPerPage + 1}-
          {( StdCountPerPage * currentPage)<totalStudents?
          ( StdCountPerPage * currentPage):
          ( StdCountPerPage * currentPage) -
            (StdCountPerPage * currentPage - totalStudents)}
        </b>{" "}
        from <b className="text-dark dark:text-light">{totalStudents}</b> students
      </p>
      <div className="flex gap-x-2">
        <button
          className="flex 
     gap-x-2 items-center"
          onClick={() => {
            previousPage();
            handleCount(currentPage -1);
          }}
          disabled={!hasPreviousPage}
        >
          <BiSolidLeftArrow size={24} className="text-gray-400 dark:text-light" />
        </button>
        {pageNumbers.map((elm) => (
          <button
            className={` ${
              elm == currentPage
                ? "bg-dark scale-95 text-light "
                : "border border-dark  dark:text-light"
            }  shadow-md rounded-full aspect-square w-9  font-bold `}
            onClick={() => {
              if (elm != currentPage) {
                goToPage(elm);
                handleCount(elm);
              }
            }}
          >
            {elm}
          </button>
        ))}

        <button
          className="flex center"
          onClick={()=>{nextPage();handleCount(currentPage+1)}}
          disabled={!hasNextPage}
        >
          <BiSolidRightArrow size={24} className="text-gray-400 dark:text-light" />
        </button>
      </div>
    </div>
  );
};

export default StudentTableInformationFooter;
