import CustomStatBox from './CustomStatBox.stat'
import useFetchGeneralStats from '@/Hooks/Stats/useFetchGenralStats'
import { Fetching_Request } from '@/Global/Loaders/AppLoader'

const Header = () => {
    let {data,isLoading} =useFetchGeneralStats()
    if(isLoading) return <Fetching_Request />
    let q= data?.payload
  return (
    <section className='flex gap-3 flex-wrap '>
        <CustomStatBox className='bg-[#e4e5f9] dark:bg-[#140d31]' label='Total Students'
         mainValue={q?.totalStudents.total?.toString()||''} subLabel='Since last year' svg='green' rate={q?.totalStudents.rate}/>

        <CustomStatBox className='bg-[#d8e2fc] dark:bg-[#0d1e31] ' label='New Admissions'  mainValue={q?.newAdmissions.total?.toString()||''} subLabel='Since last year' svg='blue' rate={q?.newAdmissions.rate}/>

        <CustomStatBox className='bg-[#daeaea] dark:bg-[#0d311c] ' label='Revenue this month'  mainValue={
            q?.MonthlyRevenue.total?.toString()+" PKR"||''} subLabel='Since last month' svg='green' rate={q?.MonthlyRevenue.rate}/>

     



</section>
  )
}

export default Header