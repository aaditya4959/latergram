
import './App.css'

import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Authentication from './pages/Authentication'
import PrivateRoute from './utilities/PrivateRoute'

function App() {

  // Here the dashboard has been authenticated using the private rout wrapper.
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path='/signin' element={<Authentication/>}/>

        <Route path='/dashboard'
        element = {
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        } />  
      </Routes>
      
    </>
  )
}

export default App
