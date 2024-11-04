import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Discovery from './pages/Discovery'
import Analyser from './pages/Analyser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Routes>
   <Route path="/" element={<Layout />}>
   <Route index element={<Dashboard />} />
   <Route path="/discovery"  element={<Discovery />} />
   <Route path="/analyser"  element={<Analyser />} />
   

   </Route>
   <Route
            path="login"
            element={
             
                <Login />
            }
          />
   </Routes>
    </>
  )
}

export default App
