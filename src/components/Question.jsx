import PropTypes from 'prop-types';

export default function Question ({question, answer1, answer1Id, answer2, answer2Id, answer3, answer3Id, answer4, answer4Id, selectAnswer, idOfAnswer}) {
    return (
        <div className="Question">
            <h2>
                {question}
            </h2>
            <button onClick={()=>selectAnswer(answer1Id, idOfAnswer)}>
                {answer1}
            </button>
            <button onClick={()=>selectAnswer(answer2Id, idOfAnswer)}>
                {answer2}
            </button>
            <button onClick={()=>selectAnswer(answer3Id, idOfAnswer)}>
                {answer3}
            </button>
            <button onClick={()=>selectAnswer(answer4Id, idOfAnswer)}>
                {answer4}
            </button>
            <hr/>
        </div>
    )
}

Question.propTypes = {
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