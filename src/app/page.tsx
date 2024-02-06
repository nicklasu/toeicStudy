// "use client"はブラウザ向けでパフォーマンスが遅いかもしれませんが、React Hookを使用する上で必要です。
// TODO: React Hookをコンポネント化
"use client";
import { useEffect, useState, useRef } from 'react';
import data from '../../data/toeic_test.json';
import { AnswerButton } from './components/AnswerButton';



export default function Home() {
  const [datasetPosition, setDatasetPosition] = useState(1);
  const [buttonData, setButtonData] = useState([]);
  const [answerText, setAnswerText] = useState('');
  const [answer, setAnswer] = useState(2);
  const mainRef = useRef(null);
  useEffect(() => {
    console.log(datasetPosition.current)
   const dataRow = data[datasetPosition];
    let correctAnswer;
    for (let index = 1; index <= 4; index++) {
      const element = dataRow[index];
      if (element === dataRow.anwser) {
        correctAnswer = element;
      }
    }

    const handleButtonClick = (selectedAnswer) => {
      console.log(correctAnswer)
      if (selectedAnswer === correctAnswer) {
        setAnswerText(selectedAnswer + ' is correct!');
        setAnswer(1);
      } else {
        setAnswerText(selectedAnswer + ' is incorrect!');
        setAnswer(0);
      }
    };
    setButtonData([
      { id: 1, label: dataRow[1], onClick: () => handleButtonClick(dataRow[1]), isDisabled: false },
      { id: 2, label: dataRow[2], onClick: () => handleButtonClick(dataRow[2]), isDisabled: false },
      { id: 3, label: dataRow[3], onClick: () => handleButtonClick(dataRow[3]), isDisabled: false },
      { id: 4, label: dataRow[4], onClick: () => handleButtonClick(dataRow[4]), isDisabled: false },
    ]);
  }, [datasetPosition]);

  useEffect(() => {
    if(answer === 2) {
      mainRef.current.style.backgroundColor = 'white';
    }
    else if(answer === 1) {
      mainRef.current.style.backgroundColor = 'green';
          let btndata = buttonData.map(button => ({ ...button, isDisabled: true }));
    setButtonData(btndata);
    }
    else if (answer === 0) {
      mainRef.current.style.backgroundColor = 'red';
    }
  }, [answer, datasetPosition, buttonData]);

  return (
    <main ref={mainRef} className="flex min-h-screen flex-col items-center justify-between p-24">
     <div>
        <p>{data[datasetPosition].question}</p>
              {
          buttonData.map((button) => (
        <AnswerButton key={button.id} label={button.label} correctAnswer={button.correctAnswer} onClick={button.onClick} disabled={button.isDisabled}>
        </AnswerButton>
        ))
              }
         
        <p>{answerText}</p>
              {answer === 1 ? (
        <button className="bg-blue-300 hover:bg-blue-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={() => {
          setDatasetPosition(datasetPosition + 1);
          setAnswerText('');
          setAnswer(2);
        }}
        >Continue
          <svg className="flex-0 ml-4 h-6 w-6 transition-all group-hover:ml-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
              ) : (<div/>)}
      
      </div> 
    </main>
  );
}
