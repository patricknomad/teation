export default interface MediaState {
	checkInterval?: ReturnType<typeof setInterval>;
	player?: YT.Player;
	playing: boolean;
	currentTime: number;
	everPlayed: boolean;
	videoUnplayable: boolean;
}
