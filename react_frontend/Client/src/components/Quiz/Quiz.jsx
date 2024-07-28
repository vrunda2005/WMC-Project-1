import React, { useState, useEffect, useRef } from 'react';
import { data } from './data';
import { useTheme } from '../../usetheamContext';
import './quiz.css';
import { useAuth } from '../../creatContext';

function TermsAndConditions({ onAccept }) {
  const [accepted, setAccepted] = useState(false);

  const handleAcceptChange = (event) => {
    setAccepted(event.target.checked);
  };

  return (
    <div className="terms-and-conditions bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">Please read the terms and conditions carefully before taking the quiz.</p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">There will be a total of 10 questions.</li>
        <li className="mb-2">You can't undo the option and you can't go back to the previous question.</li>
        <li className="mb-2">
          If you select the correct option, it will turn green; if you select the wrong option, it will turn red, and the correct option will turn green.
        </li>
        <li className="mb-2">You can't go to the next question unless you attempt the current question.</li>
        <li className="mb-2">Points system: Your points will increase by the number of correct answers you give in the quiz.</li>
        <li className="mb-2">You can only take the quiz once every 24 hours.</li>
      </ul>
      <label className="flex items-center mb-4">
        <input 
          type="checkbox" 
          checked={accepted} 
          onChange={handleAcceptChange} 
          className="mr-2 h-5 w-5"
        />
        <span>I accept the terms and conditions</span>
      </label>
      <button 
        onClick={onAccept} 
        disabled={!accepted} 
        className={`px-4 py-2 rounded-lg ${accepted ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Go to Quiz
      </button>
    </div>
  );
}

function Quiz() {
  const randomQuestions = React.useMemo(() => {
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, 10);
  }, []);

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(randomQuestions[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];

  const [auth, setAuth, userData, setUserData] = useAuth();

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date().getTime();
      if (auth.lastAttempt) {
        const timeSinceLastAttempt = now - auth.lastAttempt;
        if (timeSinceLastAttempt < 24 * 60 * 60 * 1000) {
          setCanTakeQuiz(false);
          setRemainingTime(24 * 60 * 60 * 1000 - timeSinceLastAttempt);
        }
      }
    };

    const interval = setInterval(updateRemainingTime, 1000);
    updateRemainingTime();

    return () => clearInterval(interval);
  }, [auth.lastAttempt]);

  const checkAns = (e, ans) => {
    if (!lock) {
      const target = e.target;
      if (question.ans === ans) {
        target.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        target.classList.add('wrong');
        optionArray[question.ans - 1].current.classList.add('correct');
      }
      setLock(true);
    }
  };
  
  const next = () => {
    if (lock) {
      if (index === randomQuestions.length - 1) {
        setResult(true);
      } else {
        setIndex(index + 1);
        setQuestion(randomQuestions[index + 1]);
      }
      setLock(false);
      optionArray.forEach((option) => {
        option.current.classList.remove('correct', 'wrong');
      });
    }
  };

  const finishQuiz = async () => {
    try {
      const response = await fetch('http://localhost:5000/quizPoints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: auth.username, addPoints: score }),
      });

      if (response.ok) {
        const updatedAuth = {
          ...auth,
          userPoints: auth.userPoints + score,
          lastAttempt: new Date().getTime(),
        };
        setAuth(updatedAuth);
        setUserData((prevData) => ({ ...prevData, points: updatedAuth.userPoints }));
        localStorage.setItem('auth', JSON.stringify(updatedAuth));
      } else {
        console.error('Error in quiz points');
      }
    } catch (error) {
      console.error('Error updating quiz points:', error);
    }
  };

  const { theme } = useTheme();

  // Define theme-based classes
  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const sectionBgColor = theme === 'blue' ? 'bg-blue-secondary-bg' : 'bg-dark-secondary-bg';
  const textPrimaryColor = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const buttonHoverBgColor = theme === 'blue' ? 'hover:bg-blue-accent' : 'hover:bg-dark-accent';

  const formatRemainingTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className={`${containerBgColor} h-[100vh] border`}>
      <div className={`${sectionBgColor} mt-10 max-h-screen border ${textPrimaryColor} border-blue-400 w-[666px] mx-auto p-6 rounded-xl py-10`}>
        {acceptedTerms ? (
          canTakeQuiz ? (
            result ? (
              <>
                <h2 className="mt-10 text-lg">
                  You scored <span className="font-semibold text-2xl">{score}</span> out of {randomQuestions.length}
                </h2>
                <button
                  onClick={finishQuiz}
                  className={`bg-blue-200 block mx-auto w-28 mt-8 p-2 rounded-lg ${buttonHoverBgColor} transition-all`}
                >
                  Finish
                </button>
              </>
            ) : (
              <>
                <h2 className="mt-10 text-xl">
                  {index + 1}. {question.question}
                </h2>
                <ul className="mt-8 flex flex-col gap-2">
                  <li ref={option1} onClick={(e) => checkAns(e, 1)} className="border-[1px] p-2 ml-8 hover:cursor-pointer">
                    {question.option1}
                  </li>
                  <li ref={option2} onClick={(e) => checkAns(e, 2)} className="border-[1px] p-2 ml-8 hover:cursor-pointer">
                    {question.option2}
                  </li>
                  <li ref={option3} onClick={(e) => checkAns(e, 3)} className="border-[1px] p-2 ml-8 hover:cursor-pointer">
                    {question.option3}
                  </li>
                  <li ref={option4} onClick={(e) => checkAns(e, 4)} className="border-[1px] p-2 ml-8 hover:cursor-pointer">
                    {question.option4}
                  </li>
                </ul>
                <button onClick={next} className={`bg-blue-200 block mx-auto w-28 mt-8 p-2 rounded-lg ${buttonHoverBgColor} transition-all`}>
                  Next
                </button>
                <div className="mt-4 text-sm">
                  {index + 1} of {randomQuestions.length} questions
                </div>
              </>
            )
          ) : (
            <div className="mt-10 text-lg">
              <h2>You have already taken the quiz. Please come back after 24 hours.</h2>
              <p>Time remaining: {formatRemainingTime(remainingTime)}</p>
              <button
                onClick={() => setAcceptedTerms(false)}
                className="mt-12 text-sm hover:font-bold transition-all flex items-center"
              >
                <svg
                  width="20"  // Adjust the size as needed
                  height="20"  // Adjust the size as needed
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256" />
                </svg>
                Back to Terms
              </button>

            </div>
          )
        ) : (
          <TermsAndConditions onAccept={() => setAcceptedTerms(true)} />
        )}
      </div>
    </div>
  );
}

export default Quiz;
