import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import AJFile from './Global/AJFile';
const queryClient = new QueryClient({})
function App() {
 
  return (
<QueryClientProvider client={queryClient}>
<BrowserRouter>
<Toaster/>
<AJFile/>
<iframe hidden id='PDFView' ></iframe> {/* // ? to print the pdfs */}
  </BrowserRouter>
  </QueryClientProvider>
  )

}

export default App
