import { useEffect, useState } from "react"

function App() {

  const [data, setData] = useState(null)

  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&category=26&type=multiple')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  },[])

  function clickHandle () {
    console.log(data.results)
  }

  return (
    <div className="start-page">
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={clickHandle}>Start quiz</button>
    </div>
  )
}

export default App
