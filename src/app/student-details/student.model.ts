export interface StudentData {
  id: number;
  name: string;
  user_name: string;
  gender: string;
  dob: string;
  institution: string;
  email: string;
  city: string;
  phone: string;
  q_category: string;
  age: number;
  isAttended: number;
  startTime: number;
  endTime: number;
}
export interface UpdatePayLoad {
  isAttended: number;
  timeStamp: number;
}

export interface LogObj {
  questionId: string;
  question: string;
  selectedOptionId: number;
  selectedValue: string | null;
  questionNo: string;
}
