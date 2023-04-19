import type AIResponse from "./AIResponse";

export interface AdjusterBase {
    response: AIResponse;
    videoId: string;
}

export interface AdjustTime extends AdjusterBase {
    segmentStart: number;
    startOffset?: number;
    start?: number;
}

export interface AddVideo extends AdjusterBase {
    position: number;
    start: number;
}

export interface AdjustPosition extends AdjusterBase {
    newPosition: number;
}
