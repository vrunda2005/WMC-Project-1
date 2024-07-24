import React, { useState, useRef } from 'react';
import { data } from './data';
import './quiz.css';

function Quiz() {
  const randomQuestions = React.useMemo(() => {
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, 10);
  }, []);

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(randomQuestions[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let optionArray = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) { 
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  }

  const next = () => {
    if (lock === true) {
      if (index === randomQuestions.length - 1) {
        setResult(true);
        return null;
      }
      setIndex(++index);
      setQuestion(randomQuestions[index]);
      setLock(false);
      optionArray.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      });
    }
  }

  const reset = () => {
    setIndex(0);
    setQuestion(randomQuestions[index]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <>
      <div className='bg-secondary-bg h-[100vh] border'>

        <div className='bg-secondary-bg mt-10 max-h-screen border text-white border-blue-400 w-[666px] mx-auto p-6 rounded-xl py-10'>

          <h1 className='text-4xl mb-2 font-semibold'>Quiz</h1>

          <hr />

          {result? (
            <>  
              <h2 className='mt-10 text-lg'>You scored <span className='font-semibold text-2xl'>{score}</span> out of {randomQuestions.length} </h2>
              
              <button onClick={reset} className='bg-blue-200 block mx-auto w-28 mt-8 p-2 rounded-lg hover:rounded-3xl transition-all'>Reset</button>

            </>
          ) : (
            <>
              <h2 className='mt-10 text-xl'>{index + 1}. {question.question}</h2>

              <ul className='mt-8 flex flex-col gap-2'>

                <li ref={option1} onClick={(e) => checkAns(e, 1)} className='border-[1px] p-2 ml-8 hover:cursor-pointer'>{question.option1}</li>

                <li ref={option2} onClick={(e) => checkAns(e, 2)} className='border-[1px] p-2 ml-8 hover:cursor-pointer'>{question.option2}</li>

                <li ref={option3} onClick={(e) => checkAns(e, 3)} className='border-[1px] p-2 ml-8 hover:cursor-pointer'>{question.option3}</li>

                <li ref={option4} onClick={(e) => checkAns(e, 4)} className='border-[1px] p-2 ml-8 hover:cursor-pointer'>{question.option4}</li>

              </ul>
              
              <button onClick={next} className='bg-blue-200 block mx-auto w-28 mt-8 p-2 rounded-lg hover:rounded-3xl transition-all'>
                Next
              </button>

              <div className='mt-4 text-sm'>{index + 1} of {randomQuestions.length} questions</div>
            </>
          )}
          
        </div>
      </div>
    </>
  );
}

export default Quiz;