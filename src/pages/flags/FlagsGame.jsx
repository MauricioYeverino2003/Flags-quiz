import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getQuestions from './script/getQuestions';
import shuffleQuestions from './script/shuffleQuestions';
import Endgame from './components/Endgame';
import Button from './components/Button';

const defaultStyles = ['regular', 'regular', 'regular', 'regular']

const FlagsGame = () => {
  const { qnum } = useParams();
  const [number, setNumber] = useState(25);
  const [gameState, setGameState] = useState({
    questions: null,
    currentQuestion: null,
    questionNumber: 0,
    endgame: false,
    loading: true,
    lives: 3
  });
  const [style, setStyle] = useState(defaultStyles);

  useEffect(() => {
    //if url is wrong
    let num = parseInt(qnum, 10);
    if (isNaN(qnum) || num < 0) {
      num = 25
    } else if (num > 254) {
      num = 254;
    }

    console.log(num);

    setNumber(num);

    const questionSet = getQuestions(254);
    const questionsReady = shuffleQuestions(questionSet);
    setGameState((prevState) => ({
      ...prevState,
      questions: questionsReady,
      currentQuestion: questionsReady.at(0),
      loading: false
    }));
  }, [qnum])

  const handleAnswer = (code, index) => {
    const { currentQuestion, questionNumber } = gameState;
    let newStyles = [...defaultStyles];

    if (code === currentQuestion.answerCode) {
      newStyles[index] = "green-button";
    } else {
      newStyles[index] = "red-button";
      const correctIndex = currentQuestion.optionsCode.findIndex(option => option === currentQuestion.answerCode);
      newStyles[correctIndex] = "green-button";

      setGameState((prevState) => ({
        ...prevState,
        lives: prevState.lives - 1
      }))
    }

    setStyle(newStyles);

    const newIndex = questionNumber + 1;
    if (newIndex >= number) {
      setGameState((prevState) => ({
        ...prevState,
        endgame: true
      }))
      return;
    }

    setTimeout(() => {
      setGameState((prevState) => ({
        ...prevState,
        questionNumber: newIndex,
        currentQuestion: prevState.questions.at(newIndex)
      }));
      setStyle(defaultStyles);
    }, 150);

  }

  if (gameState.loading) return (<div>Loading...</div>)
  if (gameState.endgame || gameState.lives < 1) return (<Endgame lives={gameState.lives} number={number} />)

  return (
    <div className='game-container'>
      <div className='game-lives'>
        {Array.from({ length: gameState.lives }).map((_, i) => (
          <img key={i} src='/flags/heart.svg' alt='heart' />
        ))}
      </div>
      <p>Question: {gameState.questionNumber + 1}/{number}</p>
      <p className='country-name'>{gameState.currentQuestion.country}</p>
      <div className='buttons-container'>
        <Button
          handleAnswer={handleAnswer}
          code={gameState.currentQuestion.optionsCode.at(0)}
          index={0}
          style={style[0]}
        />
        <Button
          handleAnswer={handleAnswer}
          code={gameState.currentQuestion.optionsCode.at(1)}
          index={1}
          style={style[1]}
        />
        <Button
          handleAnswer={handleAnswer}
          code={gameState.currentQuestion.optionsCode.at(2)}
          index={2}
          style={style[2]}
        />
        <Button
          handleAnswer={handleAnswer}
          code={gameState.currentQuestion.optionsCode.at(3)}
          index={3}
          style={style[3]}
        />
      </div>
    </div>
  )
}

export default FlagsGame