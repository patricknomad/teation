import ChunkContract from 'types/Chunk.ts';
import TranscriptLine from './TranscriptLine.ts';

export default class Chunk implements ChunkContract {
	text: string = '';
	start?: number | null;

	wordCount: number = 0;

	constructor(public wordLimit: number) {
		this.wordLimit = wordLimit;
		this.start = null;
	}

	addLine(line: TranscriptLine) {
		this.text += ' ' + line.text;
		this.wordCount += line.wordCount;
	}

	nextLineWouldExceedMaxWordsLimit(transcriptLines: TranscriptLine[], currentLineIndex: number) {
		const nextLine = transcriptLines[currentLineIndex + 1];
		return this.wordCount + nextLine.wordCount > this.wordLimit;
	}

	toJSON() {
		return {
			text: this.text,
			start: this.start
		};
	}
}
