import { useEffect, useState } from "react";
import Question from "./components/question";
import { decode } from "html-entities";

function App() {
  const qArr = []

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    fetch("https://opentdb.com/api.php?amount=5&category=26&type=multiple")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  function clickHandle() {
    console.log(data);
  }
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
      <div className="start-page">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button onClick={clickHandle}>Start quiz</button>
      </div>
      <div className="question-list">
        {data && qArr}
      </div>
    </div>
  );
}

export default App;


/*&#039;s*/