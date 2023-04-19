import { writeFile } from 'node:fs/promises';
import { Directory } from 'utils/dirs.ts';
import { createFolderIfNotExists } from 'utils/fs.ts';
import Transcripts from 'common/Transcripts.ts';

export default function combineTranscriptsIntoChunks(chuckWordLimit: number) {
	const chunksCsvDirectory = new Directory(import.meta.url, '..', `data/chunks-csv`);
	return async function (transcripts: Transcripts): Promise<Transcripts> {
		console.log(`➡️  Combining ${transcripts.size()} files into one CSV file`);

		// Create directory if it doesn't exist
		await createFolderIfNotExists(chunksCsvDirectory.path);

		// Using a simple string concatenation to create the CSV, this is because
		// under the current controlled environment the text should be sanitzed
		// using TranscriptLine.sanitize function (removed non \w characters)
		let csv = 'video_id,text,start';
		transcripts.reset();
		for (const transcript of transcripts) {
			const chunks = transcript.chunks.get();
			for (const chunk of chunks) {
				csv += `\n${transcript.filename.replace('.json', '')},"${chunk.text}",${chunk.start}`;
			}
		}

		// Save csv file
		await writeFile(`${chunksCsvDirectory.path}/${chuckWordLimit}.csv`, csv);

		console.log(`✅ Combined into one CSV file`);

		return transcripts;
	};
}
