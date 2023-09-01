import { useEffect, useState  } from "react";
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
??? 4 get info on what answer was pressed in a question with id and check if it's the correct answer in that question
5 show user if he correctly answered the question
6 Tally all correct answer and show it to user in the end
*/

function App() {
  const [data, setData] = useState({});
  const [gameInProgress, setGameInProgress] = useState(false);
  const [questionArr, setQuestionArr] = useState([])
  const [testForIntr, setTestForIntr] = useState(0);

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

        let outputArr = []
  
        for (let i=0; i<json.results.length; i++){
          outputArr.push({
            question: decode(json.results[i].question),
            questionId: nanoid(),
            correctAnswer: {
              id: nanoid(),
              answer: decode(json.results[i].correct_answer),
              style: 'none'
            },
            incorrectAnswers1: {
              id: nanoid(),
              answer: decode(json.results[i].incorrect_answers[0]),
              style: 'none'
            },
            incorrectAnswers2: {
              id: nanoid(),
              answer: decode(json.results[i].incorrect_answers[1]),
              style: 'none'
            },
            incorrectAnswers3: {
              id: nanoid(),
              answer: decode(json.results[i].incorrect_answers[2]),
              style: 'none'
            }
  
          })
        }

        return outputArr
      })})
      .catch((error) => console.error(error));
  };

  // function to change state of our game (inprogres or not)
  function clickHandle() {

    if(!gameInProgress) {
      setQuestionArr(fillQuestion())

      setGameInProgress(prevState => !prevState)
    }

  }
  // 
  function chooseAnswer(selectedId, correctId, questionId) {
    console.log(selectedId === correctId)

    setData(prevData => {
      console.log(Object.values(prevData.find(Obj => Obj.questionId === questionId)).find(Obj => Obj.id === selectedId).style = 'selected')
    })
  }




  //Fillout our question array when we get the data
  function fillQuestion () {
    const qArr = []

    for (let i = 0; i < data.length; i++) {

      const answersToMix = [data[i].correctAnswer, data[i].incorrectAnswers1, data[i].incorrectAnswers2, data[i].incorrectAnswers3]
  
      answersToMix.sort(() => .5 - Math.random())
  
      qArr.push(<Question
        questionId = {data[i].questionId}
        idOfAnswer = {data[i].correctAnswer.id}
        key = {data[i].questionId}
        question={data[i].question}
        answer1={answersToMix[0].answer}
        answer1Id = {answersToMix[0].id}
        style1 = {answersToMix[0].style}
        answer2={answersToMix[1].answer}
        answer2Id = {answersToMix[1].id}
        style2 = {answersToMix[1].style}
        answer3={answersToMix[2].answer}
        answer3Id = {answersToMix[2].id}
        style3 = {answersToMix[2].style}
        answer4={answersToMix[3].answer}
        answer4Id ={answersToMix[3].id}
        style4 = {answersToMix[3].style}
        selectAnswer={chooseAnswer}
      />)
    }

    return qArr
  }

  return (
    <div>
      {gameInProgress?<div className="question-list">
        {questionArr}
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