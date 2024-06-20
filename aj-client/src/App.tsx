import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
// import "@/Style/Theme_CSS.css"

import AJFile from './Global/AJFile'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
<BrowserRouter>
<Toaster/>
  <AJFile/>
  </BrowserRouter>
  </QueryClientProvider>
  )

}

export default App
