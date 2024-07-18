import countries from '../data/countries.json';
import options from '../data/options.json';

const shuffle = (arr) => {
  const array = [...arr]
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
};

function getRandom (list) {
  return list[Math.floor((Math.random()*list.length))];
}

const getQuestions = (number) =>{
  const questions = countries.map((country) => {

    const answer =  country.code;
    const questionOptions = [answer]
  
    //Randomly push remaining options
    while(questionOptions.length < 4){
      const randomOption = getRandom(options).code;
      if(!questionOptions.includes(randomOption)){
        questionOptions.push(randomOption);
      }
    }
  
    const questionOptionsShuffled = shuffle(questionOptions);
  
  
    return ({
      country: country.name,
      optionsCode: questionOptionsShuffled,
      answerCode: answer
    });
  })

  if(number !== 254){
    return questions.slice(0,number);
  }

  return questions;
}

export default getQuestions;