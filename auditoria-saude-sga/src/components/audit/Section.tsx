"use client";

import React from 'react';
import Question from './Question';
import { AuditSection, AuditAnswers } from '@/types/audit';

interface SectionProps {
  section: AuditSection;
  answers: AuditAnswers;
  onAnswerChange: (questionId: string, value: AuditAnswers[string]) => void;
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
