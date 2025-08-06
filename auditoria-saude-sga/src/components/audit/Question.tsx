"use client";

import React from 'react';

// Define the structure of a Question based on our JSON template
interface QuestionProps {
  question: {
    id: string;
    text: string;
    type: string;
    points?: any;
  };
  value: any;
  onChange: (questionId: string, value: any) => void;
}

const Question: React.FC<QuestionProps> = ({ question, value, onChange }) => {

  const renderInput = () => {
    switch (question.type) {
      case 'yes_no':
      case 'yes_no_na':
        const options = question.type === 'yes_no' ? ['yes', 'no'] : ['yes', 'no', 'na'];
        return (
          <div className="flex space-x-4">
            {options.map(option => (
              <button
                key={option}
                onClick={() => onChange(question.id, option)}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  value === option
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option === 'yes' ? 'Sim' : option === 'no' ? 'Não' : 'N/A'}
              </button>
            ))}
          </div>
        );
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(question.id, e.target.value)}
            className="mt-1 block w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        );
      case 'text':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(question.id, e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        );
      default:
        return <p className="text-red-500">Tipo de pergunta não suportado: {question.type}</p>;
    }
  };

  return (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <label className="block text-md font-medium text-gray-800">{question.text}</label>
      <div className="mt-2">
        {renderInput()}
      </div>
    </div>
  );
};

export default Question;
