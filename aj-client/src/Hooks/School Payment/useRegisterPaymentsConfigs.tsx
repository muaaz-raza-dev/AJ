import RegisterPaymentConfigBlock, { UpdatePaymentConfigBlock } from "@/Api/School Payment/RegisterSession.api";
import IpaymentConfig from "@/app/Types/IPaymentConfig";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const useRegisterPaymentsConfigs = (reset: () => void) => {
  let navigate = useNavigate();
  let Registeration = useMutation({
    mutationKey: ["Register", "Payment Config Block"],
    mutationFn: (FormState: IpaymentConfig) => RegisterPaymentConfigBlock(FormState),
    onSuccess() {
      reset();
      navigate(-1);
      toast.success(
        "Payment Config registered . You are ready to collect the payments 🎊"
      );
    },
  });
  return Registeration;
};

export const useEditPaymentsConfigs = (reset: () => void) => {
  let navigate = useNavigate();
  let id = useParams().id;
    let Registeration = useMutation({
      mutationKey: ["Deprecate & Edit", "Payment Config",id],
    mutationFn: (FormState: IpaymentConfig) => UpdatePaymentConfigBlock(FormState,id||""),
    onSuccess() {
      reset();
      navigate(-1);
      toast.success(
        "Payment Config updated . You are again ready to collect the payments 🎊"
      );
    },
  });
  return Registeration;
};

export default useRegisterPaymentsConfigs;
