import Skeleton from "react-loading-skeleton";

export default function AccountInfoLoader() {
  return (
    <section className='flex flex-col gap-2'>
      <Skeleton height={40} />      
      <Skeleton height={40} />      
    </section>
  )
}
