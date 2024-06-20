import { Select } from "antd";
const FilterBar = () => {
  return (
    <div className="flex justify-between items-center w-full">
    <h1 className="hFont font-bold text-2xl  text-dark !self-end ">
      Schedule Details
    </h1>
    <div className="flex gap-2">
      <Select
        defaultValue="Section A"
        style={{ width: 120 }}
        options={[
          { value: "A", label: "Section A" },
          { value: "B", label: "Section B" },
        ]}
      />
      <Select
        defaultValue="Monday"
        style={{ width: 120 }}
        options={[
          { value: "Monday", label: "Monday" },
          { value: "Tuesday", label: "Tuesday" },
        ]}
      />
    </div>
  </div>
  )
}

export default FilterBar