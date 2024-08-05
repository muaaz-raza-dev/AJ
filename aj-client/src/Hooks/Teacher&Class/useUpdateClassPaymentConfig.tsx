import UpdateClassPaymentConfig from "@/Api/Teacher&Classes/UpdateClassPaymentConfig.api"
import { IclassPaymentConfig } from "@/app/Types/IclassPaymentConfig"
import toast from "react-hot-toast"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"


const useUpdateClassPaymentConfig = () => {
    let navigate = useNavigate()
    return useMutation({mutationKey:["Update","Class payment COnfig"],
    mutationFn:(FormState:IclassPaymentConfig)=>UpdateClassPaymentConfig(FormState) ,
    onSuccess(){
    navigate("/dashboard/classes")
   toast.success("Payment Settings successfully updated 🎊")   
},
onError(){
toast("An error occured. Try again later...")
}
})
}

export default useUpdateClassPaymentConfig