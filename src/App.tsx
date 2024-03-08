import './App.css'
import Favorite from './components/Favorite'
import Main from './components/Main'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'


const routerProv = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Main />}></Route>
      <Route path='/favorite' element={<Favorite />}></Route>
    </>
  )
)

function App() {
  return <RouterProvider router={routerProv}></RouterProvider>
}

export default App