
import './App.css'
import Layout from './Layout'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import Dashboard from './Pages/Dashboard'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>} ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
