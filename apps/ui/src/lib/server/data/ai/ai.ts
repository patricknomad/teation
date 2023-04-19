import { env } from '$env/dynamic/private';
import { setTimeout } from 'timers/promises';

import { search as searchFormat } from '$lib/server/data/ai/formatters.js';
import { search as searchAdjust } from '$lib/server/data/ai/adjusters.js';
import { search as searchFromAI } from '$lib/server/api/ai.js';
import { cache, cached } from '$lib/server/data/ai/cache.js';

import type QuestionQueryResponse from '$lib/types/QuestionQueryResponse';
import type QuestionResponse from '$lib/types/QuestionResponse';
import type QuestionRequest from '$lib/types/QuestionRequest';
import { CacheType } from '$lib/server/types/Cache';

export async function search({ query }: QuestionRequest): Promise<QuestionResponse> {
	await artificialDelay();

	// Check if a cached, already adjusted and formate, response exists for this query
	const cachedResponse = await getCachedResponse({ query });
	if (cachedResponse) {
		return cachedResponse;
	}

	// When there's no cached response, return a mock response so we can quickly test the UI
	if (env.USE_MOCK_RESPONSES) {
		return (await import('$lib/server/data/mock/answers.js')).default as QuestionResponse;
	}

	// Get response from a cached version of the AI response, otherwise query the AI
	let response = await getCachedAIResponseOrQueryAI({ query });
	response = searchAdjust({ query, response });
	response = searchFormat({ response });
	await cacheResponse({ query, response });

	return response;
}

/**
 * Artificial delay to simulate a real API, so we can see the loading state
 */
async function artificialDelay() {
	if (env.ARTIFICIAL_DELAY_SECONDS) {
		await setTimeout(1000 * Number(env.ARTIFICIAL_DELAY_SECONDS));
	}
}

/**
 * Check if a cached, already adjusted and formate, response exists for this query
 */
async function getCachedResponse({ query }: QuestionRequest) {
	if (env.AI_CACHE_RESPONSES !== 'false') {
		const cachedResponse = await cached({ query, type: CacheType.response });
		if (cachedResponse) {
			return cachedResponse;
		}
	}

	return false;
}

/**
 * Get response from a cached version of the AI response, otherwise query the AI
 */
async function getCachedAIResponseOrQueryAI({ query }: QuestionRequest) {
	if (env.AI_CACHE_AI_RESPONSES !== 'false') {
		const cachedResponse = await cached({ query, type: CacheType.ai });
		if (cachedResponse) {
			return cachedResponse;
		}
	}

	const response = await searchFromAI({ query });
	if (env.AI_CACHE_AI_RESPONSES !== 'false') {
		await cache({ query, response, type: CacheType.ai });
	}

	return response;
}

/**
 * Save an already adjusted and formate response
 */
async function cacheResponse({ query, response }: QuestionQueryResponse) {
	if (env.AI_CACHE_RESPONSES !== 'false') {
		await cache({ query, response, type: CacheType.response });
	}
}
