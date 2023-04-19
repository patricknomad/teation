import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Returns absolute path to a directory (path of `type`) from the root of the project
 *
 * @param url string Pass `import.meta.url` when calling this function
 * @param relative string Relative path from the file that called this function (e.g. `../..`)
 * @param type string Type of directory (e.g. `data`)
 */
export function dir(url: string, relative: string, type: string): string {
	return resolve(root(url, relative), type);
}

/**
 * Returns the directory of the file that called this function
 *
 * @param url string Pass `import.meta.url` when calling this function
 */
export function __dirname(url: string): string {
	return dirname(fileURLToPath(url));
}

/**
 * Returns absolute path to root of the project
 *
 * @param url string Pass `import.meta.url` when calling this function
 * @param relative string Relative path from the file that called this function (e.g. `../..`)
 */
export function root(url: string, relative: string): string {
	return resolve(__dirname(url), relative);
}
