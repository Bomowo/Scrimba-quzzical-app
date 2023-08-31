import PropTypes from 'prop-types';

export default function Question ({question, answer1, answer2, answer3, answer4}) {
    return (
        <div className="Question">
            <h2>
                {question}
            </h2>
            <button>
                {answer1}
            </button>
            <button>
                {answer2}
            </button>
            <button>
                {answer3}
            </button>
            <button>
                {answer4}
            </button>
            <hr/>
        </div>
    )
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    answer1: PropTypes.string.isRequired,
    answer2: PropTypes.string.isRequired,
    answer3: PropTypes.string.isRequired,
    answer4: PropTypes.string.isRequired,
}