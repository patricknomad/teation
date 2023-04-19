import { chuckWordLimit } from 'utils/config.ts';
import { Directory } from 'utils/dirs.ts';
import Transcripts from 'common/Transcripts.ts';
import combineTranscriptsIntoChunks from './chunks.ts';
import combineChunksIntoACSVFile from './csv.ts';

const transcriptsDirectory = new Directory(import.meta.url, '..', 'data/transcripts');

// List all the files in the transcripts directory (but don't load the individual files yet)
Transcripts.load(transcriptsDirectory.path)
	.then(combineTranscriptsIntoChunks(chuckWordLimit))
	.then(combineChunksIntoACSVFile(chuckWordLimit))
	.then(() => console.log('🎉 All Done!'));
