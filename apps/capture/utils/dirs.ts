import { root } from 'utils/path.ts';
import { resolve } from 'node:path';

export type RelativePath = string;
export type ImportUrl = string;

export class RootDirectory {
	constructor(public url: ImportUrl, public relative: RelativePath) {
		this.url = url;
		this.relative = relative;
	}

	get path(): string {
		return root(this.url, this.relative);
	}
}

export class Directory {
	root?: RootDirectory;
	parent?: Directory;
	internalPath: string;

	constructor(root: RootDirectory, path?: string);
	constructor(url: ImportUrl, relative: RelativePath, path?: string);
	constructor(parent: Directory, path?: string);
	constructor(
		rootOrParentOrUrl: RootDirectory | Directory | ImportUrl,
		relativeOrPath?: RelativePath | string,
		path?: string
	) {
		if (rootOrParentOrUrl instanceof RootDirectory) {
			// Create from a RootDirectory (e.g. new Directory(rootDirectory, 'data'))
			this.root = rootOrParentOrUrl as RootDirectory;
			if (relativeOrPath) {
				this.internalPath = relativeOrPath as string;
			}
		} else if (rootOrParentOrUrl instanceof Directory) {
			// Create from a parent Directory (e.g. new Directory(dataDirectory, 'transcripts'))
			this.parent = rootOrParentOrUrl as Directory;
			if (relativeOrPath) {
				this.internalPath = relativeOrPath as string;
			}
		} else {
			// Shortcut to create from a root directory without having to set up a RootDirectory object first
			// (e.g. new Directory(import.meta.url, '../..', 'data'))
			this.root = new RootDirectory(rootOrParentOrUrl as ImportUrl, relativeOrPath as RelativePath);
			if (path) {
				this.internalPath = path;
			}
		}
	}

	get path(): string {
		if (this.root) {
			return resolve(this.root.path, this.internalPath);
		} else if (this.parent) {
			return resolve(this.parent.path, this.internalPath);
		} else {
			throw new Error('Directory must be created from a RootDirectory or another Directory');
		}
	}
}
