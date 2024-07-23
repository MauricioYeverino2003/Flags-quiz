import React from 'react';
import { Link } from 'react-router-dom';
import './capitals.css';

const CapitalsMode = () => {
  return (
    <>
      <Link to={'/'}>
        <button className='return-button'>Return</button>
      </Link>
      <div className='capitalsmode-container'>
        <Link to={'/capitalsgame/25'}>
          <button>Beginner</button>
        </Link>
        <Link to={'/capitalsgame/50'}>
          <button>Intermediate</button>
        </Link>
        <Link to={'/capitalsgame/75'}>
          <button>Advanced</button>
        </Link>
        <Link to={'/capitalsgame/254'}>
          <button>Ultimate</button>
        </Link>
      </div>
    </>
  )
}

export default CapitalsMode