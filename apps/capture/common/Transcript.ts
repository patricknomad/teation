import { readFile } from 'node:fs/promises';
import { Directory } from 'utils/dirs.ts';

import TranscriptLine from './TranscriptLine.ts';
import Chunks from './Chunks.ts';

const transcriptsDirectory = new Directory(import.meta.url, '..', `data/transcripts`);

export default class Transcript {
	_loaded: boolean = false;
	chunks: Chunks;
	lines: TranscriptLine[];

	constructor(public filename: string) {
		this.filename = filename;
		this.chunks = new Chunks(this);
	}

	static forFile(filename: string) {
		return new Transcript(filename);
	}

	async load() {
		if (this._loaded) return;
		const data = await readFile(`${transcriptsDirectory.path}/${this.filename}`, 'utf8');
		this.lines = JSON.parse(data).map(TranscriptLine.fromJSON);
		this._loaded = true;
	}
}
