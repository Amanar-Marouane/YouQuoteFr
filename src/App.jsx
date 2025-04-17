import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Index from './pages/quotes/Index'
import UserContext from './context/UserContext'
import Store from './pages/quotes/Store'

function App() {

  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Index />} />
          <Route path='/quote/add' element={<Store />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  )
}

export default App
