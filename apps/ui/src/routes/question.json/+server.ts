import { search } from '$lib/server/data/ai/ai.js';
import { error, json, type RequestHandler } from '@sveltejs/kit';

import type QuestionResponse from '$lib/types/QuestionResponse';
import type QuestionRequest from '$lib/types/QuestionRequest';

/**
 * Proxies results from the AI search endpoint to the client.
 */
export const GET = (async ({ url }) => {
	if(!url.searchParams.has('q')) {
		throw error(400, 'Missing query parameter "q"');
	}
	
	const q = url.searchParams.get('q');
	if(q === null || q.trim().length === 0) {
		throw error(400, 'Invalid query parameter "q"');
	}

	const query = q.substring(0, 90);
	const results: QuestionResponse = await search({ query } satisfies QuestionRequest);

	return json({ results });
}) satisfies RequestHandler;
