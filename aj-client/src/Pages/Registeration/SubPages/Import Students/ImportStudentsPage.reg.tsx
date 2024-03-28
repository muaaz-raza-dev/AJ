import DnDStudentsImportArea from "./Components/DnDImportArea.reg"
import ImportedDataTable from "./Components/ImportedDataTable.reg"


const ImportStudentsPage = () => {
  return (
    <main className="my-4 flex flex-col gap-y-3">
      <DnDStudentsImportArea/>
      <ImportedDataTable/>
    </main>
  )
}

export default ImportStudentsPage
