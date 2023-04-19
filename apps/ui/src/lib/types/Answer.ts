import type Segments from './Segments';
import type Source from './Source';
import type Media from './Media';

export default interface Answer {
	id: string;
	title: string;

	media: Media;
	segments: Segments;
	source: Source;
}
