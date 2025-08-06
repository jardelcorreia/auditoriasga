export type AnswerType = 'yes_no' | 'yes_no_na' | 'number' | 'text';

export interface AuditQuestion {
  id: string;
  text: string;
  type: AnswerType;
  points: { [key: string]: number } | null;
}

export interface AuditSection {
  id: string;
  title: string;
  questions: AuditQuestion[];
}

export interface AuditTemplate {
  name: string;
  version: string;
  sections: AuditSection[];
}

export type AuditAnswers = {
  [questionId: string]: string | number | null;
};
