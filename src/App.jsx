import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import QuotesIndex from './pages/quotes/Index'
import UserContext from './context/UserContext'
import Store from './pages/quotes/Store'
import Error404 from './components/errors/Error404'
import UsersIndex from './pages/users/Index'
import Show from './pages/quotes/Show'
import Favorites from './pages/quotes/Favorites'
import Likes from './pages/quotes/Likes'

function App() {

  return (
    <BrowserRouter>
      <UserContext>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<QuotesIndex />} />
          <Route path='/profile' element={<UsersIndex />} />
          <Route path='/quote/add' element={<Store />} />
          <Route path='/quote/:id' element={<Show />} />
          <Route path='/quote/favorites' element={<Favorites />} />
          <Route path='/quote/likes' element={<Likes />} />
          <Route path='*' element={<Error404 backTo={'/home'} />} />
        </Routes>
      </UserContext>
    </BrowserRouter >
  )
}

export default App
