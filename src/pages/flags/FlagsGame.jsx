import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getQuestions from './script/getQuestions';
import shuffleQuestions from './script/shuffleQuestions';
import Endgame from './components/Endgame';
import Button from './components/Button';

const defaultStyles = ['regular','regular','regular','regular']

const FlagsGame = () => {
  const { qnum } = useParams();
  const [number, setNumber] = useState(25);
  const [gameState, setGameState] = useState({
    questions: null,
    currentQuestion: null,
    questionNumber: 0,
    score: 0,
    endgame: false,
    loading: true
  });
  const [style, setStyle] = useState(defaultStyles);

  useEffect(() => {
    //if url is wrong
    let num = parseInt(qnum, 10);
    if (isNaN(qnum) || num < 0){
      num = 25
    } else if (num > 254){
      num = 254;
    }

    setNumber(num);

    const questionSet = getQuestions(number);
    const questionsReady = shuffleQuestions(questionSet);
    setGameState((prevState) =>({
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
      setGameState((prevState) => ({
        ...prevState,
        score: prevState.score + 1
      }));
      newStyles[index] = "green-button";
    } else {
      newStyles[index] = "red-button";
      const correctIndex = currentQuestion.optionsCode.findIndex(option => option === currentQuestion.answerCode);
      newStyles[correctIndex] = "green-button";
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
  if (gameState.endgame) return (<Endgame score={gameState.score} number={number} />)

  return (
    <div className='game-container'>
      <p>Question: {gameState.questionNumber + 1}/{number}</p>
      <p>Score: {gameState.score}/{number}</p>
      <p>{gameState.currentQuestion.country}</p>
      <div>
        <div>
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
        </div>
        <div>
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
    </div>
  )
}

export default FlagsGame