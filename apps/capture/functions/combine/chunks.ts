import { createFolderIfNotExists } from 'utils/fs.ts';
import Transcripts from 'common/Transcripts.ts';
import { Directory } from 'utils/dirs.ts';

export default function combineTranscriptsIntoChunks(chuckWordLimit: number) {
	const chunksDirectory = new Directory(import.meta.url, '..', `data/chunks/${chuckWordLimit}`);
	return async function (transcripts: Transcripts): Promise<Transcripts> {
		console.log(
			`➡️  Combining ${transcripts.size()} files into chunks (of up to ${chuckWordLimit} words each)`
		);

		// Create combined directory if it doesn't exist
		await createFolderIfNotExists(chunksDirectory.path);

		// Generate chunks for each transcript, and save them to the combined directory
		let totalChunks = 0;
		transcripts.reset();
		for (const transcript of transcripts) {
			await transcript.load();
			await transcript.chunks.generate(chuckWordLimit);
			await transcript.chunks.save(chunksDirectory.path);
			totalChunks += transcript.chunks.count();
		}

		console.log(`✅ Combined into ${totalChunks} chunks`);

		return transcripts;
	};
}
