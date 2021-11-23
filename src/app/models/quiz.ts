export interface Question {
  questionId: number;
  question: string;
  questionImage: string;
  languageCode: string;
  category: string;
  optionId: number;
  isActive: number;
  quizType: number;
  primaryQuestionId?: any;
}

export interface Option {
  optionId: number;
  options: string;
  optionImage: string;
  questionId: number;
  isActive: number;
  isAnswer: number;
}

export interface PrimaryQuestionsObj {
  questions: Question[];
  options: Option[];
}

export interface Question2 {
  questionId: number;
  question: string;
  questionImage: string;
  languageCode: string;
  category: string;
  optionId: number;
  isActive: number;
  quizType: number;
  primaryQuestionId: number;
}

export interface Option2 {
  optionId: number;
  options: string;
  optionImage: string;
  questionId: number;
  isActive: number;
  isAnswer: number;
}

export interface SecondaryQuestionsObj {
  questions: Question2[];
  options: Option2[];
}

export interface QuestionSet {
  primaryQuestionsObj: PrimaryQuestionsObj;
  secondaryQuestionsObj: SecondaryQuestionsObj;
}

export interface ImageUploadResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
