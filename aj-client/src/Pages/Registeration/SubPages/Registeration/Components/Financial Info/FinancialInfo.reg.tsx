import RegFormWrapper from '../FormWrapper.reg'
import FinancialInfoForm from './FinInfoForm.reg'

const FinancialInfo = () => {
  return (
    <div>
          <RegFormWrapper title="Financial Informaion" >
    <div className="flex gap-x-6 py-4 px-4">
        <FinancialInfoForm/>
        </div>
        </RegFormWrapper>
    </div>
  )
}

export default FinancialInfo
