"use client";

import React, { useState } from 'react';
import Section from './Section';

interface AuditFormProps {
  template: {
    name: string;
    version: string;
    sections: any[];
  };
}

const AuditForm: React.FC<AuditFormProps> = ({ template }) => {
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Audit Submitted:", answers);
    // Here you would typically save the audit data to the database
    alert("Auditoria enviada! (Verifique o console para ver os dados)");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-1">{template.name}</h1>
      <p className="text-sm text-gray-500 mb-6">Versão: {template.version}</p>

      {template.sections.map(section => (
        <Section
          key={section.id}
          section={section}
          answers={answers}
          onAnswerChange={handleAnswerChange}
        />
      ))}

      <div className="mt-8 pt-6 border-t-2">
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
          Salvar e Finalizar Auditoria
        </button>
      </div>
    </form>
  );
};

export default AuditForm;
