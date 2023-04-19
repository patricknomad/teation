import type { SegmentBeforeFormat } from "$lib/types/Segment";

export interface Answer {
    videoId: string;
    segment: SegmentBeforeFormat,
};

export interface AnswerWithSegments extends Answer {
    segments: SegmentBeforeFormat[]
};