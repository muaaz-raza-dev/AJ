import Axios from "@/app/Common/Axios"
const StudentFeeData = async(GRNO:string|number,FeeType:string,Year:string) => {
        let response = await Axios.get(`/student/Fees/${GRNO}/${FeeType}/${Year}`,)
        return response.data
}
export default StudentFeeData