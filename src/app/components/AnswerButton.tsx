import React, { useEffect, useState } from 'react'

export const AnswerButton = ({ label, onClick, disabled }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const handleClick = () => {
    onClick()
    setButtonDisabled(true)
  }
  useEffect(() => {
    if (disabled) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [disabled])

  return (
      <button className="bg-gray-300 hover:bg-gray-600 font-bold py-2 px-4 rounded" onClick={handleClick} disabled={isButtonDisabled}>
      {label}
    </button>
  )
}
