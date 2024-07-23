import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import FlagsMode from './pages/flags/FlagsMode';
import FlagsGame from './pages/flags/FlagsGame';
import CapitalsMode from './pages/capitals/CapitalsMode';
import CapitalsGame from './pages/capitals/CapitalsGame';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/flagsmode' element={<FlagsMode />} />
      <Route path='/flagsgame/:qnum' element={<FlagsGame />} />
      <Route path='/capitalsmode' element={<CapitalsMode />} />
      <Route path='/capitalsgame/:qnum' element={<CapitalsGame />} />
    </Routes>
  )
}

export default App
