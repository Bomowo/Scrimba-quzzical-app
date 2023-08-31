import { useEffect, useState } from "react";
import Question from "./components/question";
import { decode } from "html-entities";

function App() {
  // Initializing array for storing our questions
  const qArr = []

  const [data, setData] = useState(null);
  const [gameInProgress, setGameInProgress] = useState(false);

  // getting data from API before our first render
  useEffect(() => {
    fetchQuizData();
  }, []);

  //Fetching data from open trivia database
  const fetchQuizData = async () => {
    fetch("https://opentdb.com/api.php?amount=5&category=26&type=multiple")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  // function to change state of our game (inprogres or not)
  function clickHandle() {
    console.log(data);

    setGameInProgress(prevState => !prevState)
  }

  //Fillout our question array when we get the data
  if (data) {  for (let i = 0; i < 5; i++) {
    qArr.push(<Question
      key = {i}
      question={decode(data.results[i].question)}
      answer1={decode(data.results[i].correct_answer)}
      answer2={decode(data.results[i].incorrect_answers[0])}
      answer3={decode(data.results[i].incorrect_answers[1])}
      answer4={decode(data.results[i].incorrect_answers[2])}
    />)
  }}

  return (
    <div>
      {gameInProgress?<div className="question-list">
        {data && qArr}
        <button onClick={clickHandle}>Check Answers</button>
      </div>:<div className="start-page">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button onClick={clickHandle}>Start Quiz</button>
      </div>}


    </div>
  );
}

export default App;