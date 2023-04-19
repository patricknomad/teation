import { writeFile } from 'node:fs/promises';
import { __dirname } from 'utils/path.ts';
import { PathLike } from 'node:fs';

import TranscriptLine from './TranscriptLine.ts';
import Transcript from './Transcript.ts';
import Chunk from './Chunk.ts';

export default class Chunks {
	chunks: Chunk[] = [];

	constructor(public transcript: Transcript) {
		this.transcript = transcript;
	}

	async generate(chunkWordLimit: number) {
		const { lines } = this.transcript;

		let chunk = new Chunk(chunkWordLimit);

		for (let lineIndexString in lines) {
			const lineIndex = Number(lineIndexString); // for..in returns string indexes
			const line: TranscriptLine = lines[lineIndex];
			const isLastLine = lineIndex === lines.length - 1;

			// If it's the first line for the chunk, set the start time
			if (chunk.start === null) {
				chunk.start = Math.floor(line.start);
			}

			// Add the line to the chunk
			chunk.addLine(line);

			// If it's the last line or the next line would exceed the max words,
			// add the chunk to the chunks array, and reset the chunk
			if (isLastLine || chunk.nextLineWouldExceedMaxWordsLimit(this.transcript.lines, lineIndex)) {
				this.chunks.push(chunk);
				chunk = new Chunk(chunkWordLimit);
			}
		}
	}

	async save(chunksDirectory: PathLike) {
		const { filename } = this.transcript;
		const data = JSON.stringify(this.chunks, null, 2);
		await writeFile(`${chunksDirectory}/${filename}`, data);
	}

	count() {
		return this.chunks.length;
	}

	get() {
		return this.chunks;
	}
}
