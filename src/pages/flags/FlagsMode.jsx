import React from 'react'
import { Link } from 'react-router-dom'
import './flags.css';

const FlagsMode= () => {
  return (
    <>
      <Link to={'/'}>
        <button className='return-button'>Return</button>
      </Link>
      <div className='flagsmode-container'>
      <Link to={'/flagsgame/25'}>
        <button>Beginner</button>
      </Link>
      <Link to={'/flagsgame/50'}>
        <button>Intermediate</button>
      </Link>
      <Link to={'/flagsgame/75'}>
        <button>Advanced</button>
      </Link>
      <Link to={'/flagsgame/254'}>
        <button>Ultimate</button>
      </Link>
    </div>
    </>
  )
}

export default FlagsMode