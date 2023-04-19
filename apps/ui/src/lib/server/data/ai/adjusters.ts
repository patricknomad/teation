import { getCacheKey } from '$lib/server/data/ai/cache.js';

import type { AddVideo, AdjustPosition, AdjustTime, AdjusterBase } from '$lib/server/types/Adjuster';
import type { AIResponseToAIResponse } from '$lib/server/types/AIResponse';
import type { QuestionRequestQuery } from '$lib/types/QuestionRequest';
import type AIResponse from '$lib/server/types/AIResponse';

export function search({ query, response }: { query: QuestionRequestQuery; response: AIResponse }): AIResponse {
	let cacheKey = getCacheKey(query);
	if(!cacheKey) {
		return response;
	}
	
	cacheKey = cacheKey.replace(/-/g, '_');

	if (adjusters[cacheKey]) {
		return adjusters[cacheKey]({ response });
	}

	return response;
}

function adjustTime({ response, videoId, segmentStart, startOffset, start }: AdjustTime) {
	const answer = response.answers.find((answer) => answer.meta.video_id === videoId);
	if (!answer) {
		return response;
	}

	if (answer.meta.start != segmentStart) {
		return response;
	}

	if (startOffset) {
		answer.meta.start += startOffset;
	}

	if (start) {
		answer.meta.start = start;
	}

	return response;
}

function removeVideo({ response, videoId }: AdjusterBase) {
	response.answers = response.answers.filter((answer) => answer.meta.video_id !== videoId);
	return response;
}

function addVideo({ response, videoId, position, start }: AddVideo) {
	const answer = {
		meta: {
			video_id: videoId,
			start
		}
	};

	response.answers.splice(position, 0, answer);

	return response;
}

function adjustPosition({ response, videoId, newPosition }: AdjustPosition) {
	// move answer with videoId in response array to newPosition
	const answer = response.answers.find((answer) => answer.meta.video_id === videoId);
	if (!answer) {
		return response;
	}

	const index = response.answers.indexOf(answer);
	if (index === newPosition) {
		return response;
	}

	response.answers.splice(index, 1);
	response.answers.splice(newPosition, 0, answer);

	return response;
}

function combineVideo({ response, videoId }: AdjusterBase) {
	for (const answer of response.answers) {
		if (answer.meta.video_id === videoId) {
			answer.meta.combine = true;
		}
	}

	return response;
}

const adjusters: { [key: string]: AIResponseToAIResponse } = {
	whats_the_meaning_of_life: ({ response }) => {
		response = adjustTime({
			response,
			videoId: 'rIpUf-Vy2JA',
			segmentStart: 11345,
			startOffset: -4
		});

		response = adjustTime({
			response,
			videoId: 'iqBh7G4uDR8',
			segmentStart: 10204,
			startOffset: -2
		});

		return response;
	},
	what_makes_life_beautiful: ({ response }) => {
		response = removeVideo({ response, videoId: 'CY_LEa9xQtg' });
		return response;
	},
	what_should_i_do_to_get_better_sleep: ({ response }) => {
		response = removeVideo({ response, videoId: 'rIpUf-Vy2JA' });
		response = removeVideo({ response, videoId: '2BdBfsXbST8' });
		return response;
	},
	whats_the_best_way_to_learn: ({ response }) => {
		response = removeVideo({ response, videoId: 'SGzMElJ11Cc' });
		response = adjustTime({ response, videoId: 'srUlKNLZTas', segmentStart: 6926, start: 7114 });
		return response;
	},
	at_which_point_are_we_good_enough: ({ response }) => {
		response = removeVideo({ response, videoId: 'TG6BuSjwP4o' });
		response = removeVideo({ response, videoId: 'IHg6ixt3CKc' });
		response = adjustPosition({ response, videoId: '7jFdxd1qX2g', newPosition: 2 });
		return response;
	},
	how_do_i_find_purpose: ({ response }) => {
		response = adjustTime({ response, videoId: 'ifX_JnBfxTY', segmentStart: 71, startOffset: 18 });
		response = removeVideo({ response, videoId: 'Q6tDV3BhrcM' });
		return response;
	},
	what_makes_you_happier: ({ response }) => {
		response = adjustTime({ response, videoId: 'NvsI8ijW8xU', segmentStart: 3694, start: 3467 });
		response = combineVideo({ response, videoId: 'srUlKNLZTas' });
		return response;
	},
	work_hard_or_work_smart: ({ response }) => {
		response = removeVideo({ response, videoId: 'yzMVEbs8Zz0' });
		response = addVideo({ response, position: 1, videoId: 'ICj8p5jPd3Y', start: 8632 });
		return response;
	}
};
