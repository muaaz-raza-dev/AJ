import useFetchStudetFeeExclusive from "@/Hooks/Read Student Exclusive/useFetchStudetFeeExclusive"
import FeeHeader from "./FeeHeader.std.pf"
import MonthlyFeeDisplay from "./MonthlyFeeDisplay.std.pf"

const StdFeeSectionPage = () => {
  useFetchStudetFeeExclusive()
  return (
    <section>
        <FeeHeader/>
        <MonthlyFeeDisplay/>
    </section>
  )
}

export default StdFeeSectionPage 