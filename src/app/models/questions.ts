export interface Category {
  id: number;
  itemName: string;
  name: string;
}

export interface Language {
  id: number;
  itemName: string;
  name: string;
}

export interface Option {
  optionId?: number | null;
  options: string;
  optionImage: string;
  questionId: number | null;
  isActive: string;
  isAnswer: string;
}

export interface Question {
  questionId?: number | null;
  question: string;
  questionImage?: any;
  languageCode: string;
  category: string;
  optionId: number | null;
  isActive: string;
  answer: any;
  options: Option[];
  primaryQuestionId: number | null;
  quizType: number;
}

export interface Questions {
  category: Category[];
  language: Language[];
  questionsArray: Question[][];
}
