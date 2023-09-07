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

export interface ExistingQuiz {
	existingQuiz:ExistingQuizResponse[];
	success: boolean;
}

 export interface ExistingQuizResponse {
	questions: ExistingQuizQuestions[];
	quizId: string;
	userId: string;
	username: string;
} 

export interface ExistingQuizQuestions {
	answer: string;
	location: {
		latitude: number;
		longitude: number;
	}
	question: string;
}