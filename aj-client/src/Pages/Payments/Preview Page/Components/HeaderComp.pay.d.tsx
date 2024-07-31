import useFetchConfigOverview from "@/Hooks/School Payment/useFetchConfigOverview"
import { Button } from "@/shdcn/components/ui/button"
import { Tooltip } from "antd"
import { BiMoney } from "react-icons/bi"

const HeaderComp = () => {
  let {data} =useFetchConfigOverview()
  let q = data?.payload
  return (
    <div className="flex justify-between md:items-center bg-[var(--box)] gap-4 max-md:flex-col dark:bg-darker dark:text-white p-2 md:px-4 rounded-md">
    <section className="flex flex-col justify-center gap-2 w-full">
    <div className="flex gap-2 items-center">
    <BiMoney  />
    <p>Payment Config</p>
    </div>

    <div className="flex gap-2 items-center font-medium text-lg">
    <h1 className="hFont font-bold text-2xl">{q?.feeTitle}</h1>
    <div className="bg-dark_dimmer dark:bg-dark  px-3 rounded-lg text-xs  text-white py-1">{q?.session?.session_name} {q?.session?.acedmic_year}</div>
    {q?.isDeprecated?
    <Tooltip title={`No longer in use . Deprecated at ${q?.deprecateDate}`}>
    <div className="bg-[var(--warning)] text-black px-3 rounded-lg text-xs   py-1">Deprecated</div>
    </Tooltip>
    :
    <div className="bg-[var(--success)] text-black px-3 rounded-lg text-xs   py-1">Active</div>
  }
    </div>
</section>
<div className="md:p-2  rounded-md flex gap-4 md:justify-end " >
        <Button className="bg-dark  hover:bg-darker text-white shadow  font-bold " >
            Edit Configurations
        </Button>
    </div>
      </div>
  )
}

export default HeaderComp