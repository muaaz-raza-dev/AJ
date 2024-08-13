import { useAppSelector } from "@/app/ReduxHooks"
import { IstdFeeReportPayload } from "@/app/Types/IstdFeeReport"
import RequestLoading from "@/Global/Loaders/RequestLoding"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/shdcn/components/ui/table"
import { useCallback } from "react";
  export function PaymentStudentStatus(payload: IstdFeeReportPayload, Type: "Paid" | "Pending"): string {
    if (payload.status === "Upcoming") {
      if (Type === "Paid") {
        return "Advanced Paid";
      } else {
        return "Upcoming";
      }
    } else if (payload.status === "Pending") {
      if (Type === "Paid") {
        return "Paid";
      } else {
        return "Pending";
      }
    } else {
      return "No Fees";
    }
  }
  const StudentListTable = () => {
    const {payload,filters:{selected:{Type}},isLoading} =useAppSelector(s=>s.stdFeeReport)
    
    const PaymentStudentStatus = useCallback((payload:IstdFeeReportPayload,Type:"Paid"|"Pending")=>{
      
      if(payload.status == "Upcoming"){
        if(Type == "Paid") {
          return  <div className="bg-[var(--success)] text-black rounded-full font-bold px-3 py-1 w-max">
          Advanced Paid
          </div>
        }
        else {
        return  <div className="bg-[var(--info)] text-black rounded-full font-bold px-3 py-1 w-max">
          Upcoming
          </div>
        }
        
      }
    else if(payload.status == "Pending"){
      if(Type == "Paid") {
        return  <div className="bg-[var(--success)] text-black rounded-full font-bold px-3 py-1 w-max">
        Paid
        </div>
      }
      else {
      return  <div className="bg-danger text-white rounded-full font-bold px-3 py-1 w-max">
        Pending
        </div>
      }
    }
    else {
      return  <div className="bg-gray-900 text-white rounded-full font-bold px-3 py-1 w-max">
        No Fees
        </div>
    }
    },[payload,isLoading,Type])

  return (
    <>
    <Table className="bg-box rounded">
    <TableCaption>
      {
        !isLoading&&
        (payload.status == "No Fees" ?
          "There is no fees in this month"
          :
       (    !payload.students.length ?
            ` ${payload.students.length} student found in this category.`
        :
      
      `  A list of your student who ${Type == "Paid"?"paid":"haven't paid"}.`))
    }
    </TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="">GRNO</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Father Name</TableHead>
        <TableHead >Class</TableHead>
        <TableHead >Amount</TableHead>
        <TableHead >Status</TableHead>
        {Type == "Paid"&& <TableHead >Invoice</TableHead>}
      </TableRow>
    </TableHeader>
    <TableBody>

      {
      payload.students?.map(std=>{

        return <TableRow>
        <TableCell className="font-medium">{std.GRNO}</TableCell>
        <TableCell>{std.FirstName } {std.LastName}</TableCell>
        <TableCell>{std.fatherName}</TableCell>
        <TableCell>{payload.class.name} Class</TableCell>
         <TableCell >{payload.amount}</TableCell>
         <TableCell > {PaymentStudentStatus(payload,Type)} </TableCell>

        {Type == "Paid"&& <TableCell>{std.Invoice}</TableCell>}
      </TableRow>
      })}
    </TableBody>
  </Table>
  {isLoading&&
   <div className="flex justify-center items-center w-[100%]  ">
   <RequestLoading dark stroke="5" />
 </div>
  }
      </>
  )
}

export default StudentListTable