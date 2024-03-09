import './App.css'
import Favorite from './components/Favorite'
import Main from './components/Main'
import SingleCard from './components/SingleCard'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'


const routerProv = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Main />}></Route>
      <Route path='/favorite' element={<Favorite />}></Route>
      <Route path='/card/:id' element={<SingleCard />}></Route>
    </>
  )
)

function App() {
  return <RouterProvider router={routerProv}></RouterProvider>
}

export default App