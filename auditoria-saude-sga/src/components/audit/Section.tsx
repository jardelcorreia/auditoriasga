"use client";

import React from 'react';
import Question from './Question';

interface SectionProps {
  section: {
    id: string;
    title: string;
    questions: any[];
  };
  answers: { [key: string]: any };
  onAnswerChange: (questionId: string, value: any) => void;
}

const Section: React.FC<SectionProps> = ({ section, answers, onAnswerChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-indigo-500 pb-2 mb-4">
        {section.title}
      </h2>
      <div>
        {section.questions.map(question => (
          <Question
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={onAnswerChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
