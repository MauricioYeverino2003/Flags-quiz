import React from 'react'

const Button = ({handleAnswer, code, style}) => {
  return (
    <button className={style} onClick={() => handleAnswer(code)}>
      <img
      src={`/flags/${code}.svg`} 
      alt='loading...'/>
    </button>
  )
}

export default Button