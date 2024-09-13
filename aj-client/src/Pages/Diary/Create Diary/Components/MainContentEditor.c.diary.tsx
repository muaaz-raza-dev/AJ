import { IdiaryCreate } from '@/app/Types/IdiaryCreate';
import { useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }], // Header formatting
    ["bold", "italic", "underline", ], // Toggle buttons for bold, italic, underline, and strikethrough
    [{ list: "ordered" }, { list: "bullet" }], // Ordered and bullet lists
    ["blockquote", "code-block"], // Blockquote and code block
    [{ script: "sub" }, { script: "super" }], // Subscript and superscript
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    [{ color: [] }, { background: [] }], // Dropdown with color and background options
    [{ align: [] }], // Text alignment options
    ["link", ], // Insert link, image, and video
    ["clean"], // Remove formatting button
  ],
};





export default function MainContentEditor() {
  const {watch,setValue} =useFormContext<IdiaryCreate>()

  return (
    <div>
        <ReactQuill
        className='bg-box min-h-[30vh] '
        theme='snow'
        onChange={(val)=>setValue("content",val)}
        placeholder='Write your diary content here'
        value={watch("content")}
        modules={modules}
  
      />
    </div>
  )
}
