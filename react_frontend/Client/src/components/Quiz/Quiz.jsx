import React, { useState } from 'react';
import questions from './questions.json';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer) => {
    setUserAnswers({...userAnswers, [currentQuestion]: answer });
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4 text-zinc-800">Quiz Page</h1>
      {quizCompleted ? (
        <div className='flex flex-wrap  '>
          <h2 className="text-2xl mb-2">You completed the quiz!</h2>
          <p>You scored {score} out of {questions.length}!</p>
          <ul>
            {questions.map((question, index) => (
              <li key={index} className="mb-2">
                <span className="text-lg">{question.question}</span>
                <span className="text-lg ml-2">
                  Your answer: {userAnswers[index]}
                </span>
                <span className="text-lg ml-2">
                  Correct answer: {question.answer}
                </span>
                {userAnswers[index] === question.answer ? (
                  <span className="text-lg ml-2 text-green-500">Correct!</span>
                ) : (
                  <span className="text-lg ml-2 text-red-500">Incorrect</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className=' text-zinc-800'>
          <h2 className="text-2xl mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <h3 className="text-lg mb-2">
            {questions[currentQuestion] && questions[currentQuestion].question}
          </h3>
          <ul>
            {questions[currentQuestion] &&
              questions[currentQuestion].options.map((option, index) => (
                <li key={index} className="mb-2">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Quiz;