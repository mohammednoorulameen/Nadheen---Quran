import './App.css'
import UserRouter from './Routes/UserRouter'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'


const routes = [...UserRouter];
const router = createBrowserRouter(routes)




 function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
 }

 export default App
