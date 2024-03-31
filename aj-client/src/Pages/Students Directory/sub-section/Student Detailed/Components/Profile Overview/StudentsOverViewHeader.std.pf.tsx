const StudentsOverViewHeader = () => {
  return (
    <div className='flex flex-col rounded-lg overflow-hidden bg-[var(--box)]  items-center justify-center pb-5 gap-y-3'>
      <div className="w-full h-20 bg-[var(--dark)]">
      </div>
      <div className="flex w-24 -mt-14 aspect-square rounded-full bg-[var(--primary)] border-2  p-0.5">
      <img className='rounded-full' src="/images/sample.png" />
      </div>
      <div className="">
      <h1 className='hFont font-bold text-lg'>Muaaz Raza</h1>
      <p className='text-[gray] text-center text-sm hFont '>12324 </p>
      </div>
      <div className="flex gap-x-6 justify-between px-4 py-1 bg-[var(--primary)]  rounded">
      <div className="flex items-center flex-col">
        <p className="text-xs text-[gray]">Transactions</p>
        <b className="font-extrabold">10</b>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-xs text-[gray]">Student For</p>
        <b className="font-extrabold">3 years</b>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-xs text-[gray]">Dues</p>
        <b className="font-extrabold">15000</b>
      </div>
      </div>
    </div>
  )
}

export default StudentsOverViewHeader

