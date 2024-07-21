import { Button } from '@/shdcn/components/ui/button'

const AllDuesSection = () => {
  return (
    <div className="flex gap-2 w-full  items-start  bg-[var(--box)]">
        <div className="w-[24%] min-h-28  pb-2 bg-[var(--primary)]  shadow text-black  rounded-md flex flex-col gap-1">
    <div className="w-full p-2 bg-danger rounded-md text-white hFont font-semibold text-lg">
        Monthly Fee
    </div>
    <div className="flex gap-2 justify-between py-1 px-2">
  <h1 className="text-xl hFont font-semibold">Jan 2025</h1> 
  <div className="bg-dark_dimmer px-3  center text-sm font-semibold text-white rounded-full">
  <p>Grinds 2024-2025</p>
  </div>
  </div>
  <div className="flex gap-2 px-2">
              <p className="text-base text-gray-600 font-semibold">Dues  : </p>
              <p className="text-base font-semibold text-black"> 2 months later</p>
              </div>
              <div className="flex gap-2 px-2">
              <p className="text-base text-gray-600 font-semibold">Amount : </p>
              <p className="text-base font-semibold text-green-900 "> 5000 PKR</p>
              </div>
              <div className="px-2 w-full">
<Button className='bg-darker shadow font-bold w-full  text-white transition-colors hover:bg-dark'>
    Pay now
</Button>
              </div>
              </div> 
</div>
  )
}

export default AllDuesSection