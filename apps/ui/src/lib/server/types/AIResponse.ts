export enum AIAnswerType {
	extractive = 'extractive'
}

export interface AIAnswer {
	answer?: string;
	type?: AIAnswerType;
	score?: number;
	context?: string;
	offsets_in_document?: [
		{
			start: number;
			end: number;
		}
	];
	offsets_in_context?: [
		{
			start: number;
			end: number;
		}
	];
	document_id?: string;
	meta: {
		video_id: string;
		start: number;
		combine?: boolean;
	};
}

export default interface AIResponse {
	query: string;
	answers: AIAnswer[];
}

export type AIResponseToAIResponse = ({ response }: { response: AIResponse}) => AIResponse;