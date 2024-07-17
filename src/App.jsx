import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import FlagsMode from './pages/flags/FlagsMode';
import FlagsGame from './pages/flags/FlagsGame';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/flagsmode' element={<FlagsMode />} />
      <Route path='/flagsgame/:qnum' element={<FlagsGame />} />
    </Routes>
  )
}

export default App
