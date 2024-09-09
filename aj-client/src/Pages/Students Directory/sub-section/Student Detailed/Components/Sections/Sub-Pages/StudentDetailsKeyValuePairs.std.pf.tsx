import { useAppSelector } from "@/app/ReduxHooks";
import RoleBasedAccess from "@/Global/Middleware Hooks/RoleBasedAccess";
import { Button } from "@/shdcn/components/ui/button";
import moment from "moment";
import { FC } from "react"
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const StudentDetailsKeyValuePairs = () => {
const {Student:{FirstName,fatherName,LastName,Address,DOA,DOB,Gender,NewAdmission,sCNIC,mCNIC,fCNIC}} =useAppSelector(s=>s.stdExclusive.overview)
    return (
        <>
        <div className="flex gap-y-1 gap-x-1 flex-wrap w-full p-4 py-4">
        <EachKVBlock label="First Name" value={FirstName} />
        <EachKVBlock label="Last Name" value={LastName} />
        <EachKVBlock label="Father Name" value={fatherName} />
        <EachKVBlock label="Date of Birth" value={DOB} />
        <EachKVBlock label="Age" value={moment().diff(DOB, "years") + "  Years old "} />
        <EachKVBlock label="Gender" value={Gender} />
        <EachKVBlock label="New Admission" value={NewAdmission ? "Yes" : "No"} />
        <EachKVBlock label="Student CNIC" value={sCNIC} />
        <EachKVBlock label="Mother CNIC" value={mCNIC} />
        <EachKVBlock label="Father CNIC" value={fCNIC} />
        <EachKVBlock label="Date of Admission" value={DOA} />
        <EachKVBlock label="Address" value={Address} />
        <RoleBasedAccess roleToGiveAccess={["admin","chief admin"]}>
        <div className="justify-end pt-3 flex w-full px-6">
            <Link to={"edit"}>
            <Button className="bg-dark hover:text-white text-white hover:bg-dark transition-colors shadow flex gap-1 justify-center items-center">
                <FaEdit size={18}/>
                <p>Update</p> 
            </Button>
            </Link>
        </div>
        </RoleBasedAccess>
        </div>
        </>
    )
}

export const EachKVBlock:FC<{labelStyle?:string;label:string;value:string|any;link?:string;onClick?:(val:string)=>void}>  =({label,value,link,onClick,labelStyle})=>{
    if(value) {
    return <div onDoubleClick={()=>{onClick&&onClick(value)}} className="flex flex-col min-w-[32%] max-md:min-w-[48%]
     font-medium border border-gray-200 rounded-md px-4 py-2 cursor-pointer shadow-sm transition duration-300 dark:border-darker hover:bg-gray-100 dark:hover:bg-dark">
    <h2 className="text-gray-500  text-[0.82rem] leading-tight">{label} :</h2>
    {link?
    <a href={link} className="text-blue-500 underline leading-tight">{value}</a>:
    <h2 className={`leading-tight dark:text-white text-[0.92rem] ${labelStyle}`}>{value}</h2>
}
</div>
}
}
export default StudentDetailsKeyValuePairs