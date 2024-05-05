const DetailFields = () => {
  return (
    <div className="flex flex-col gap-2">

  <div className="border-2 shadow-[var(--dark)] flex justify-between p-2 rounded-md">
  <div className=""><b>Year</b></div>
  <div className="font-bold text-[var(--dark)]">Current</div>
</div>

<div className="border-2 shadow-[var(--dark)] flex justify-between p-2 rounded-md">
  <div className=""><b>Total Students</b></div>
  <div className="font-bold ">750</div>
</div>

<div className="border-2 shadow-[var(--dark)] flex justify-between p-2 rounded-md">
  <div className=""><b>Class Teacher</b></div>
  <div className="font-bold ">Laiba Javed</div>
</div>

<div className="border-2 shadow-[var(--dark)] flex justify-between p-2 rounded-md">
  <div className=""><b>Admission Fee</b></div>
  <div className="font-bold ">1000 pkr</div>
</div>

<div className="border-2 shadow-[var(--dark)] flex justify-between p-2 rounded-md">
  <div className=""><b>Monthly Fee</b></div>
  <div className="font-bold ">1000 pkr</div>
</div>
      </div>
  )
}

export default DetailFields