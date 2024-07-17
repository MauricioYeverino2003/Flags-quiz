import React from 'react';
import { Link } from 'react-router-dom'
import './home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <Link to={'/flagsmode'}>
        <button>Flags Game</button>
      </Link>
    </div>
  )
}

export default Home