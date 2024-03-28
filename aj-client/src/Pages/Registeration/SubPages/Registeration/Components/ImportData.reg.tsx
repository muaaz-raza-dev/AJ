
import { FloatButton } from 'antd'
import { AppstoreAddOutlined,ImportOutlined   } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// <button className=" self-start bg-[var(--box)] shadow-md rounded-md px-4 hover:bg-[var(--dark)] border border-[var(--dark)] hover:text-white transition-colors   py-2 border-dashed flex gap-x-2 center"><IoIosAddCircle color="#fb7d5b"   size={24} /> Import Data</button>
const RegImportData = () => {
  return (
    <>
  
    <FloatButton.Group
      trigger="click"
      type="primary"
      shape='square' 
      
      className='text-[var(--dark)] bottom-20'
      icon={<AppstoreAddOutlined />}
    >
      <Link to={"import"}>
      <FloatButton tooltip="Import from excel sheet" className='bg-[var(--dark)]' type='primary' icon={<ImportOutlined />} />
      </Link>
    </FloatButton.Group>
      </>
  )
}

export default RegImportData
