import { env } from '$env/dynamic/private';

import type QuestionRequest from '$lib/types/QuestionRequest';
import type QuestionResponse from '$lib/types/QuestionResponse';

export async function search({ query }: QuestionRequest): Promise<QuestionResponse> {
	const response = await fetch(`${env.AI_SERVER_URL}/query`, {
		method: 'POST',
		// Request/require JSON
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			query,
			params: {
				Retriever: { top_k: 25 },
				Reader: { top_k: 5 }
			}
		})
	});

	const data = await response.json();

	return data;
}
