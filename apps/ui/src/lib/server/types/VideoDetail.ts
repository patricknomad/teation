export default interface VideoDetail {
    title: string;
    url: string;
    thumbnail: string;
    guest: string;
    position: string[],
    youtubeUrl: string;
}

export type VideoDetails = {
    [key: string]: VideoDetail;
};
