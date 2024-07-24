
const Notes_send = () => {
  return (
    <div className="w-full bg-[var(--box)] p-2 grayscale" >
    <div className="flex justify-between px-2 my-2">
      <h1 className=" text-xl font-bold hFont">Quick Notes</h1>
      <button className="text-dark font-medium text-sm">See all</button>
    </div>
    <div className="bg-[var(--primary)] rounded-md  p-4 ">
        <textarea maxLength={12} rows={5} disabled className=" bg-transparent w-full resize-none leading-tight border-none outline-none" placeholder="The Parent Teacher meeting will be held on tommorow at 9 PM ."/>
      <div className="flex justify-end"><button disabled className="bg-dark text-white rounded font-medium  text-sm px-2 py-1">Send Note</button></div>
    </div>
  </div>
  )
}

export default Notes_send