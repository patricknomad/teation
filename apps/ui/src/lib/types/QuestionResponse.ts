import type Answer from './Answer';

export default interface QuestionResponse {
	results: Answer[];
}

export type QuestionResponseToQuestionResponse = ({ response }: { response: QuestionResponse}) => QuestionResponse;