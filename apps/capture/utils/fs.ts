import { PathLike } from 'node:fs';
import niceTry from 'npm:nice-try';
import fs from 'node:fs/promises';

export async function createFolderIfNotExists(folder: PathLike) {
	const exists = await niceTry.promise(() => fs.stat(folder));
	if (!exists) {
		await fs.mkdir(folder, {
			recursive: true
		});
	}
}
