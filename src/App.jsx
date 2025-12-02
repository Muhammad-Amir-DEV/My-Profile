import './App.css';
import { HashRouter } from "react-router-dom";
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import Navbar from './sections/Nav/Navbar';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <HashRouter>
      <main id='mainbody' className='bg-gray-950 z-10 h-auto text-center'>
        <Navbar />
        <section className='main'>
          <Routes>
          <Route path='/' element={<Hero/>} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/skills' element={<Skills/>} />
          <Route path='/contact' element={<Contact/>} />

          </Routes>      
        </section>
      <Footer />
      </main>
    </HashRouter>
  )
}

export default App;
