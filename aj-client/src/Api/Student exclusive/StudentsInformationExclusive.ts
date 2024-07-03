import Axios from "@/app/Common/Axios"
import { IRegisterFormState } from "@/app/Types/IStdregisterForm.t"

const StudentsInformation = async(GRNO:string|number) => {
        let response = await Axios.get<{payload:IRegisterFormState}>(`/student/Info/${GRNO}`)
        return response.data
}
export const EditStudentInformation = async(payload:any)=>{
    let response = await Axios.post<{payload:IRegisterFormState}>(`/student/Info/${payload.GRNO}`,{payload})
    return response.data
}
export default StudentsInformation
