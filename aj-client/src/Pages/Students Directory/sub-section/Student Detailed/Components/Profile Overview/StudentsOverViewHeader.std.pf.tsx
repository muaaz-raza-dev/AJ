const StudentsOverViewHeader = () => {
  return (
    <div className='flex flex-col gap-y-1 items-center justify-center'>
      <img className=''/>
      <h1 className='hFont font-bold text-lg'>Muaaz Raza</h1>
      <p className='text-[var(--dark)] text-sm hFont font-bold'># 12324 </p>
      <div className="flex gap-x-4 justify-between px-2 py-1 bg-[var(--primary)] border rounded">
      <div className="flex items-center flex-col">
        <p className="text-xs text-[gray]">Transactions</p>
        <b>10</b>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-xs text-[gray]">Transactions</p>
        <b>10</b>
      </div>
      <div className="flex items-center flex-col">
        <p className="text-xs text-[gray]">Transactions</p>
        <b>10</b>
      </div>
      </div>
    </div>
  )
}

export default StudentsOverViewHeader

