import fs from 'fs-extra';
import path from 'path';

import type QuestionQueryResponse from '$lib/types/QuestionQueryResponse';
import type { QuestionRequestQuery } from '$lib/types/QuestionRequest';
import { CacheType, type CacheKey } from '$lib/server/types/Cache';
import type QuestionRequest from '$lib/types/QuestionRequest';

export function getCacheKey(query: QuestionRequestQuery): CacheKey {
	const cacheKey = query
		.toLowerCase()
		.trim()
		// replace any type single or recursive space with a single dash
		.replace(/\s{1,}/g, '-')
		// remove any non-alphanumeric or dash characters
		.replace(/[^a-z0-9-]/g, '')
		// cache similar queries (e.g. "whats, "what is" and "what are")
		.replace('what-is', 'whats')
		.replace('what-are', 'whats');

	// Don't cache invalid queries. For example:
	// - "   " would be transformed to ""
	// - "@  @#4 @" would be transformed to "--"
	if (cacheKey === '' || cacheKey.match(/^-*$/)) {
		return false;
	}

	return cacheKey;
}

function getCachePath(type: CacheType, query: QuestionRequestQuery) {
	const cacheKey = getCacheKey(query);
	if (!cacheKey) {
		return false;
	}

	return path.join(path.resolve(path.dirname('')), '.cache', type, `${cacheKey}.json`);
}

export async function cache({ query, response, type }: QuestionQueryResponse & { type: CacheType }) {
	await fs.ensureDir(path.join(path.resolve(path.dirname('')), 'cache'));
	await fs.ensureDir(path.join(path.resolve(path.dirname('')), 'cache', type));
	const cachePath = getCachePath(CacheType.response, query);
	if (!cachePath) {
		return false;
	}

	return fs.writeJSON(cachePath, response);
}

export async function cached({ query, type }: QuestionRequest & { type: CacheType }) {
	const cachePath = getCachePath(type, query);
	if (!cachePath) {
		return false;
	}

	if (fs.existsSync(cachePath)) {
		const cache = await fs.readJSON(cachePath);
		return cache;
	}

	return false;
}
