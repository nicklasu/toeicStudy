/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'

interface AnswerButtonProps {
  label: string
  onClick: () => void
  disabled: boolean
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({ label, onClick, disabled }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const handleClick = () => {
    onClick()
    setButtonDisabled(true)
  }

  useEffect(() => {
    if (disabled !== isButtonDisabled) {
      setButtonDisabled(disabled)
    }
  }, [disabled])

  return (
    <button className="bg-gray-300 hover:bg-gray-600 font-bold py-2 px-4 rounded" onClick={handleClick} disabled={isButtonDisabled}>
      {label}
    </button>
  )
}
