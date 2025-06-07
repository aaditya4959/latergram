
import './App.css'

import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />     
      </Routes>
      
    </>
  )
}

export default App
