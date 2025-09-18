import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import NovoProjeto from './components/pages/NovoProjeto'

import Conteiner from './components/layouts/Conteiner'
import NavBar from './components/layouts/NavBar'
import Footer from './components/layouts/Footer'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'

function App() {
  return (
    <Router>
      <NavBar/>
      <Conteiner customClass='min_heigth'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/novoProjeto' element={<NovoProjeto />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/project/:id' element={<Project/>} />
        </Routes>
      </Conteiner>
      <Footer/>
    </Router>
  )
}

export default App
