import { IdiaryCreate } from '@/app/Types/IdiaryCreate';
import { useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', ],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  },
  history: {
    delay: 1000,
    maxStack: 500,
    userOnly: true,
  }
};
const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline',
    'list', 'bullet', 'indent', 'align',
    'link'
  ]


export default function MainContentEditor() {
  const {watch,setValue} =useFormContext<IdiaryCreate>()

  return (
    <div>
        <ReactQuill
        className='bg-box min-h-[30vh]'
        onChange={(val)=>setValue("content",val)}
        placeholder='Write your diary content here'
        value={watch("content")}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}
