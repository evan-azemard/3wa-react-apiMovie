import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Movie } from './pages/Movie'
import { Navbar } from './components/NavBar'


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/movie/:id' Component={Movie} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
