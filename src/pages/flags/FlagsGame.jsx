import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getQuestions from './script/getQuestions';
import shuffleQuestions from './script/shuffleQuestions';
import Endgame from './components/Endgame';
import Button from './components/Button';

const FlagsGame = () => {
  const { qnum } = useParams();
  const [number, setNumber] = useState()
  const [loading, setLoading] = useState(true);

  //Can go in a single element called game state probably
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [endgame, setEndgame] = useState(false);

  const [style, setStyle] = useState({
    firstButton: 'regular',
    secondButton: 'regular',
    thirdButton: 'regular',
    fourthButton: 'regular'
  });


  useEffect(() => {
    if (isNaN(qnum)){
      setNumber(25)
    } else if (qnum > 254) {
      setNumber(254);
    } else if (qnum < 0) {
      setNumber(25);
    } else {
      setNumber(qnum);
    }

    const questionSet = getQuestions(number);
    const questionsReady = shuffleQuestions(questionSet);
    setQuestions(questionsReady);
    setCurrentQuestion(questionsReady.at(0));
    setLoading(false);
  }, [])

  const handleAnswer = (code) => {
    if (code === currentQuestion.answerCode){
      setScore(score + 1);
    }

    const newIndex = questionNumber + 1;
    if (newIndex >= number) {
      setEndgame(true);
      return;
    }

    //setTimer for next two functions
    setQuestionNumber(newIndex);
    setCurrentQuestion(questions.at(newIndex));
  }

  if (loading) return (<div>Loading...</div>)
  if (endgame) return (<Endgame score={score} number={number} />)

  return (
    <div className='game-container'>
      <p>Question: {questionNumber + 1}/{number}</p>
      <p>Score: {score}/{number}</p>
      <p>{currentQuestion.country}</p>
      <div>
        <div>
          <Button
            handleAnswer={handleAnswer}
            code={currentQuestion.optionsCode.at(0)}
            style={style.firstButton}
          />
          <Button
            handleAnswer={handleAnswer}
            code={currentQuestion.optionsCode.at(1)}
            style={style.secondButton}
          />
        </div>
        <div>
          <Button
            handleAnswer={handleAnswer}
            code={currentQuestion.optionsCode.at(2)}
            style={style.thirdButton}
          />
          <Button
            handleAnswer={handleAnswer}
            code={currentQuestion.optionsCode.at(3)}
            style={style.fourthButton}
          />
        </div>
      </div>
    </div>
  )
}

export default FlagsGame