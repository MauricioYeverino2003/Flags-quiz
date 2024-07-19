import React from 'react'

const Button = ({handleAnswer, code, index, style}) => {
  return (
    <button className={style} onClick={() => handleAnswer(code,index)}>
      <img className='flag-icon'
      src={`/flags/${code}.svg`} 
      alt='loading...'/>
    </button>
  )
}

export default Button