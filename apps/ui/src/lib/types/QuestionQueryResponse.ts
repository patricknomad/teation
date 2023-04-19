import type { QuestionRequestQuery } from "./QuestionRequest";
import type QuestionResponse from "./QuestionResponse";

export default interface QuestionQueryResponse {
	query: QuestionRequestQuery;
	response: QuestionResponse;
}
