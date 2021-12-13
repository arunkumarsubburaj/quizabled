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

export interface StatusFlag {
  isStartedA: number;
  isStartedB: number;
  isStartedD: number;
  isEndedA: number;
  isEndedB: number;
  isEndedD: number;
  isEndedC: number;
  isStartedC: number;
  isStarted: number;
  isEnded: number;
}
