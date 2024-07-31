import NotFoundHandler from "@/Global/Middleware Hooks/NotFoundHandler"
import useFetchConfigOverview from "@/Hooks/School Payment/useFetchConfigOverview"
import HeaderComp from "./Components/HeaderComp.pay.d"
import MainDetailsComp from "./Components/MainDetailsComp.pay.d"
import ClassesDetails from "./Components/ClassesDetails.pay.d"
import PaymentMonth from "./Components/PaymentMonth.pay.d"
import PaymentStats from "./Components/PaymentStats.pay.d"

const PaymentDetailedPage = () => {
  let {isLoading,isError,error} =useFetchConfigOverview()

  return (
    <NotFoundHandler error={error} isError={isError}  isLoading={isLoading} ErrorPageProps={{title:"Payment Config not found.",message:"There might be mistake in the id. Try again ",navigate:"/payment-settings"}}>
<main className="flex flex-col gap-2 py-4 max-md:py-0 w-full">
<HeaderComp/>
<MainDetailsComp/>
<ClassesDetails/>
<PaymentMonth/>
<PaymentStats/>

</main>
    </NotFoundHandler>
  )
}

export default PaymentDetailedPage