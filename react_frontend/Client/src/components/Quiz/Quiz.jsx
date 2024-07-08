import React, { useState } from 'react';
import questions from './questions.json';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (answer) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: answer });
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Quiz Page</h1>
      {quizCompleted ? (
        <div>
          <h2 className="text-2xl mb-2">You completed the quiz!</h2>
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
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <h3 className="text-lg mb-2">{questions[currentQuestion].question}</h3>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
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
          {currentQuestion === questions.length - 1 ? (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;