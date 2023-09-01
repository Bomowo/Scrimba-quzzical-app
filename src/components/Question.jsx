import PropTypes from 'prop-types';

export default function Question ({question, answer1, answer1Id, answer2, answer2Id, answer3, answer3Id, answer4, answer4Id, selectAnswer, idOfAnswer, questionId, style1, style2, style3, style4}) {
    const selected = {
        'backgroundColor': 'black'
    }
    
    return (
        <div className="Question" id={idOfAnswer}>
            <h2>
                {question}
            </h2>
            <button id={answer1Id} onClick={()=>selectAnswer(answer1Id, idOfAnswer, questionId)} style={{style1}}>
                {answer1}
            </button>
            <button id={answer2Id} onClick={()=>selectAnswer(answer2Id, idOfAnswer, questionId)} style={{style2}}>
                {answer2}
            </button>
            <button id={answer3Id} onClick={()=>selectAnswer(answer3Id, idOfAnswer, questionId)} style={{style3}}>
                {answer3}
            </button>
            <button id={answer4Id} onClick={()=>selectAnswer(answer4Id, idOfAnswer, questionId)} style={{style4}}>
                {answer4}
            </button>
            <hr/>
        </div>
    )
}

Question.propTypes = {
    style1: PropTypes.string.isRequired,
    style2: PropTypes.string.isRequired,
    style3: PropTypes.string.isRequired,
    style4: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    idOfAnswer: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer1: PropTypes.string.isRequired,
    answer1Id: PropTypes.string.isRequired,
    answer2: PropTypes.string.isRequired,
    answer2Id: PropTypes.string.isRequired,
    answer3: PropTypes.string.isRequired,
    answer3Id: PropTypes.string.isRequired,
    answer4: PropTypes.string.isRequired,
    answer4Id: PropTypes.string.isRequired,
    selectAnswer: PropTypes.func.isRequired
}