import { useEffect, useState } from "react";
import Question from "./components/question";
import { decode } from "html-entities";
import { nanoid } from "nanoid";


/*
----------TODO LIST-------------

 +++ 1 parse date into state object with:
 +++  1.1 unique ID for every answer
 +++  1.2 question
 +++  1.3 correct answer
 +++  1.4 other answers
+++ 2 transfer id's of answer to buttons and id of correct answer to question
+++ 3 shuffle all answers and throw them into question
4 get info on what answer was pressed in a question with id and check if it's the correct answer in that question
5 show user if he correctly answered the question
6 Tally all correct answer and show it to user in the end
*/

function App() {
  // Initializing array for storing our questions
  const qArr = []

  const [data, setData] = useState(null);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [testForIntr, setTestForIntr] = useState(false);

  // getting data from API before our first render
  useEffect(() => {
    fetchQuizData();
    
    console.log('Use Effect in use')
  }, []);

  //Fetching data from open trivia database
  const fetchQuizData = async () => {
    fetch("https://opentdb.com/api.php?amount=5&category=26&type=multiple")
      .then((response) => response.json())
      .then((json) =>   {setData(() => {
        console.log(json)
        let outputArr = []
  
        for (let i=0; i<json.results.length; i++){
          outputArr.push({
            question: decode(json.results[i].question),
            correctAnswer: {
              id: nanoid(),
              answer: decode(json.results[i].correct_answer)
            },
            incorrectAnswers1: {
              id: nanoid(),
              answer: decode(json.results[i].incorrect_answers[0])
            },
            incorrectAnswers2: {
              id: nanoid(),
              answer: decode(json.results[i].incorrect_answers[1])
            },
            incorrectAnswers3: {
              id: nanoid(),
              answer: decode(json.results[i].incorrect_answers[2])
            }
  
          })
        }
        console.log(outputArr)
        return outputArr
      })})
      .catch((error) => console.error(error));
  };

  // function to change state of our game (inprogres or not)
  function clickHandle() {
    console.log(data);

    setGameInProgress(prevState => !prevState)
  }
  // 
  function chooseAnswer(selectedId, correctId) {
    console.log('click ' + selectedId + 'correct answer is:' + correctId)

    if(selectedId === correctId) {
      setTestForIntr(true)
      console.log(testForIntr)
    }
  }

  //Fillout our question array when we get the data
  if (data) {  for (let i = 0; i < data.length; i++) {

    const answersToMix = [data[i].correctAnswer, data[i].incorrectAnswers1, data[i].incorrectAnswers2, data[i].incorrectAnswers3]

    console.log(answersToMix.sort(() => .5 - Math.random()))

    qArr.push(<Question
      idOfAnswer = {data[i].correctAnswer.id}
      key = {nanoid()}
      question={data[i].question}
      answer1={answersToMix[0].answer}
      answer1Id = {answersToMix[0].id}
      answer2={answersToMix[1].answer}
      answer2Id = {answersToMix[1].id}
      answer3={answersToMix[2].answer}
      answer3Id = {answersToMix[2].id}
      answer4={answersToMix[3].answer}
      answer4Id ={answersToMix[3].id}
      selectAnswer={chooseAnswer}
    />)
  }}

  return (
    <div>
      {gameInProgress?<div className="question-list">
        {data && qArr}
        <button onClick={data && clickHandle}>Check Answers</button>
      </div>:<div className="start-page">
        <h1>Quizzical</h1>
        <p>5 Question about celebrities of different diffuculty</p>
        <button onClick={clickHandle}>Start Quiz</button>
      </div>}


    </div>
  );
}

export default App;