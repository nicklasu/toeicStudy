import React, { useState } from 'react';

export const AnswerButton = ({ label, onClick }) => {
  return (
      <button className="bg-gray-300 hover:bg-gray-600 font-bold py-2 px-4 rounded" onClick={onClick}>
      {label}
    </button>
  );
};
