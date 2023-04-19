import type Segment from './Segment';

export default interface Segments extends Array<Segment> {
	[index: number]: Segment;
}
