import TranscriptLineContract from 'types/TranscriptLine.ts';

export default class TranscriptLine implements TranscriptLineContract {
	text: string;
	start: number;
	duration: number;

	wordCount?: number;

	constructor({ text, start, duration }: TranscriptLineContract) {
		this.text = text;
		this.start = start;
		this.duration = duration;

		this.sanitize();
		this.addWordCount();
	}

	static fromJSON(json: TranscriptLineContract) {
		return new TranscriptLine(json);
	}

	sanitize() {
		this.text = this.text.replace(/[^\w ]/gi, '').trim();
	}

	addWordCount() {
		this.wordCount = this.text.split(' ').length;
	}
}
