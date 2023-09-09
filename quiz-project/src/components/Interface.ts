export interface SignUpResponse {
    success: boolean;
    message?: string;
}

export interface LogInResponse {
    success: boolean;
    message?: string;
    token?: string;
}

export interface Position {
    lng: number;
    lat: number;
}

export interface Question {
  question: string;
  answer: string;
  location: {
    longitude: string;
    latitude: string;
  }
}

export interface GetQuiz {
    questions: {
      question: string;
      answer: string;
      location: {
        longitude: string;
        latitude: string;
      };
    }[];
    quizId: string;
    userId: string;
  }
  

export interface ApiSignupResponse {
    success: boolean;
    message?: string;
}

export interface ApiLoginResponse {
    username: string,
    success: boolean;
    message?: string;
    token: string;
}

export interface Account {
    password: string
    userId: string
    username: string
  
  } 

export interface CreateQuiz {
    username: string,
    quizname: string,
    token?: string
}

export interface AddQuestion{
    username: string,
    question: string,
    answer: string,
}