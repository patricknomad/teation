import _videoDetails from '$lib/server/data/data/video_details.json';

import type { AnswerWithSegments } from '$lib/server/types/Answer';
import type { VideoDetails } from '$lib/server/types/VideoDetail';
import type { SegmentBeforeFormat } from '$lib/types/Segment';
import type AIResponse from '$lib/server/types/AIResponse';
import MediaType from '$lib/types/MediaType';
import type Answer from '$lib/types/Answer';

const videoDetails: VideoDetails = _videoDetails;

export function search({ response }: { response: AIResponse }): Answer[] {
	const answers: AnswerWithSegments[] = response.answers.map((result) => ({
		videoId: result.meta.video_id,
		segments: [],
		segment: {
			combine: result.meta.combine,
			start: result.meta.start,
			end: result.meta.start + 60 * 4,
			note: 'end time is estimated'
		},
	} satisfies AnswerWithSegments));

	// Combine answers's segment if the next has the same videoId
	for (const answerIndex in answers) {
		const answer = answers[answerIndex];
		const nextAnswer = answers[parseInt(answerIndex) + 1];

		answer.segments = [answer.segment];

		if (nextAnswer && answer.videoId === nextAnswer.videoId) {
			answer.segments.push(nextAnswer.segment as SegmentBeforeFormat);
			answers.splice(parseInt(answerIndex) + 1, 1);
		}
	}

	// Combine if it has the combine flag (currently combines all videos cause of a bug)
	for (const answerIndex in answers) {
		const answer = answers[answerIndex];
		for (const answerIndex2 in answers) {
			const answer2 = answers[answerIndex2];
			if (
				answerIndex !== answerIndex2 &&
				answer.videoId === answer2.videoId
				// && answer2.segments[0].combine
			) {
				answer.segments = answer.segments?.concat(answer2.segments);
				answers.splice(parseInt(answerIndex2), 1);
			}
		}
	}

	// Add video details
	let newAnswers: (Answer | false)[] = answers.map((answer) => {
		const video = videoDetails[answer.videoId];
		if (!video) {
			return false;
		}

		return {
			id: answer.videoId,
			title: video.title,
			source: {
				type: 'podcast',
				title: 'Lex Fridman Podcast'
			},
			media: {
				type: MediaType.YOUTUBE,
				id: answer.videoId
			},
			segments: answer.segments
		} satisfies Answer;
	});

	// Remove empty answers
	newAnswers = newAnswers.filter((answer) => answer);

	// Remove combine from segments
	newAnswers = newAnswers.map((answer) => {
		if(!answer) return answer;

		answer.segments = answer.segments.map((segment) => {
			delete segment.combine;
			return segment;
		});

		return answer;
	});

	const finalAnswer = newAnswers as Answer[];

	return finalAnswer;
}
