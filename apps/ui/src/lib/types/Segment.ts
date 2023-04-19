export default interface Segment {
	start: number;
	end: number;
	note?: string;
}

export interface SegmentBeforeFormat extends Segment {
	combine?: boolean;
}
