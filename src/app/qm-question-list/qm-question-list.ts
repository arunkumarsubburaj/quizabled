export interface QuestionArray {
  questionId: number;
  question: string;
  questionImage: string;
  category: string;
  isActive: number;
  quizType: number;
}

export interface OptionArray {
  options: string;
  optionImage: string;
  questionId: number;
  isActive: number;
  isAnswer: number;
}

export interface QmQuestionList {
  questionArray: QuestionArray[];
  optionArray: OptionArray[];
}
