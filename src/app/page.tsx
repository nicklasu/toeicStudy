/* eslint-disable @typescript-eslint/explicit-function-return-type */
// "use client"はブラウザ向けでパフォーマンスが遅いかもしれませんが、React Hookを使用する上で必要です。
// TODO: React Hookをコンポネント化
'use client'
import React, { useEffect, useState, useRef } from 'react'
import data from '../../data/toeic_test.json'
import { AnswerButton } from './components/AnswerButton'

const shuffleQuestions = (json: any) => {
  const array = []
  for (const i in json) {
    array.push([i, json[i]])
  };
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function Home () {
  const [testData, setTestData] = useState([[
    '1',
    { 1: '1', 2: '2', 3: '3', 4: '4', anwser: 'answer', question: 'question' }],
  [
    '2',
    { 1: '1', 2: '2', 3: '3', 4: '4', anwser: 'answer', question: 'question' }]])
  const [datasetPosition, setDatasetPosition] = useState(0)
  const [buttonData, setButtonData] = useState([])
  const [answerText, setAnswerText] = useState('')
  const [answer, setAnswer] = useState(2)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const mainRef = useRef(null)
  const handleButtonClick = (selectedAnswer: string, correctAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      setAnswerText(selectedAnswer + ' is correct!')
      setAnswer(1)
    } else {
      setAnswerText(selectedAnswer + ' is incorrect!')
      setAnswer(0)
      setIncorrectAnswers(incorrectAnswers + 1)
    }
  }
  useEffect(() => {
    setTestData(shuffleQuestions(data))
  }, [])

  useEffect(() => {
    const dataRow = testData[datasetPosition][1]
    let correctAnswer: string
    for (let index = 1; index <= 4; index++) {
      const element = dataRow[index]
      if (element === dataRow.anwser) {
        correctAnswer = element
      }
    }

    setButtonData([
      { id: 1, label: dataRow[1], onClick: () => { handleButtonClick(dataRow[1], correctAnswer) }, isDisabled: false },
      { id: 2, label: dataRow[2], onClick: () => { handleButtonClick(dataRow[2], correctAnswer) }, isDisabled: false },
      { id: 3, label: dataRow[3], onClick: () => { handleButtonClick(dataRow[3], correctAnswer) }, isDisabled: false },
      { id: 4, label: dataRow[4], onClick: () => { handleButtonClick(dataRow[4], correctAnswer) }, isDisabled: false }
    ])
  }, [testData, datasetPosition])

  useEffect(() => {
    if (answer === 2) {
      mainRef.current.style.backgroundColor = 'white'
    } else if (answer === 1) {
      mainRef.current.style.backgroundColor = 'green'
      const btndata = buttonData.map(button => ({ ...button, isDisabled: true }))
      setButtonData(btndata)
    } else if (answer === 0) {
      mainRef.current.style.backgroundColor = 'red'
    }
  }, [answer])

  return (
    <main ref={mainRef} className="flex min-h-screen flex-col items-center justify-between p-24">
     {datasetPosition < 30
       ? (
      <div>
        <h1>TOEIC incomplete sentences practice</h1>
        <p>question {datasetPosition + 1} / 30</p>
        <p>{testData[datasetPosition][1].question}</p>
        {
          buttonData.map((button) => (
          <AnswerButton key={button.id} label={button.label} correctAnswer={button.correctAnswer} onClick={button.onClick} disabled={button.isDisabled} />
          ))
        }
        <p>{answerText}</p>
              {answer === 1
                ? (
        <button className="bg-blue-300 hover:bg-blue-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={() => {
          setDatasetPosition(datasetPosition + 1)
          setAnswerText('')
          setAnswer(2)
        }}
        >Continue
          <svg className="flex-0 ml-4 h-6 w-6 transition-all group-hover:ml-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
                  )
                : (<div/>)}
      </div>)
       : (
       <div>
        <h6>Results</h6>
        <p>Failure ratio: {(incorrectAnswers / datasetPosition) * 100}%</p>
        <p>TOEIC score estimation: {incorrectAnswers > 0 ? (990 * (1 - (incorrectAnswers / datasetPosition))) : (990)} points</p>
      </div>
         )}
    </main>
  )
}
