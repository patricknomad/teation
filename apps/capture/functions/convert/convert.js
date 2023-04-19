import fs from 'node:fs';
import { chuckWordLimit } from 'utils/config.ts';

/**
 *
 * NOTE!
 *
 * Check out the conver-new.ts file in this folder for a WIP refactor.
 * This current convert.js file was quickly hacked together in order
 * to quickly create an initial prototype as a proof of concept.
 *
 *
 */

// Create .data/transcripts-combined if it doesn't exist
if (!fs.existsSync('data/chunks-search')) {
	fs.mkdirSync('data/chunks-search');
}

// Open .data/video_details.json
const videoDetails = JSON.parse(fs.readFileSync('data/media/youtube/details.json', 'utf8'));

// Get all json files in the .data/transcripts directory
const files = fs.readdirSync('data/transcripts');

let totalChunks = 0;

const allChunks = [];
for (const file of files) {
	// Read the file
	let transcript = fs.readFileSync(`data/transcripts/${file}`, 'utf8');

	// Parse the file
	transcript = JSON.parse(transcript);

	// Get the video id
	const videoId = file.replace('.json', '');

	// Get video details for this file
	const currentVideoDetails = videoDetails[videoId];
	const hasVideoDetails = currentVideoDetails !== undefined;
	const generalVideoDetails = {
		title: hasVideoDetails ? currentVideoDetails.title : null,
		hosts: hasVideoDetails ? ['Lex Fridman'] : ['Lex Fridman'],
		guests: hasVideoDetails
			? currentVideoDetails.guest.split(',|, and | and ').map((g) => g.trim())
			: [],
		guestPositions: hasVideoDetails ? currentVideoDetails.position : [],
		thumbnail: hasVideoDetails ? currentVideoDetails.thumbnail : null,
		videoId
	};

	// Loop through the transcript array and combine into chuckWordLimit word chunks
	const chunks = [];
	let lastStart = Math.floor(transcript[0].start);
	let chunkText = '';
	for (const line of transcript) {
		// If the chunk is 100 words, add it to the chunks array
		if (chunkText.split(' ').length >= chuckWordLimit) {
			chunks.push({
				...generalVideoDetails,
				recordId: videoId + '-' + chunks.length,
				text: chunkText.trim().replace(/[^\w ]/gi, ''),
				start: lastStart,
				end: Math.ceil(line.start + line.duration)
			});

			chunkText = '';
			lastStart = Math.floor(line.start);
		}

		// Add the line to the chunk
		chunkText += ' ' + line.text.trim();
	}

	// Add the last chunk
	chunks.push({
		...generalVideoDetails,
		recordId: videoId + '-' + chunks.length,
		text: chunkText.trim().replace(/[^\w ]/gi, ''),
		start: lastStart,
		end: Math.ceil(
			transcript[transcript.length - 1].start + transcript[transcript.length - 1].duration
		)
	});

	totalChunks += chunks.length;
	allChunks.push(...chunks);
}

console.log(
	`Combined ${files.length} files into ${totalChunks} chunks of ${chuckWordLimit} words each.`
);

// Write the chunks to a file
fs.writeFileSync(`data/chunks-search/${chuckWordLimit}.json`, JSON.stringify(allChunks, null, 2));
