import { readdir } from 'node:fs/promises';
import { PathLike } from 'node:fs';

import Transcript from './Transcript.ts';

export default class Transcripts implements IterableIterator<Transcript> {
	private pointer = 0;

	constructor(public directory: PathLike, public transcripts: Transcript[]) {}

	// Allows to asynchronously create a new instance of this class
	static async load(directory: PathLike): Promise<Transcripts> {
		const files = await readdir(directory);
		const transcripts = files.map(Transcript.forFile);
		return new Transcripts(directory, transcripts);
	}

	size(): number {
		return this.transcripts.length;
	}

	reset(): void {
		this.pointer = 0;
	}

	// A simple iterator for using `next()`
	public next(): IteratorResult<Transcript> {
		if (this.pointer < this.transcripts.length) {
			return {
				done: false,
				value: this.transcripts[this.pointer++]
			};
		} else {
			return {
				done: true,
				value: null
			};
		}
	}

	// A simple iterator for using `for...of`
	[Symbol.iterator](): IterableIterator<Transcript> {
		return this;
	}
}
