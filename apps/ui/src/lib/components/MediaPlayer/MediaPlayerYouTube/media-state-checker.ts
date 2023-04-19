import type MediaState from '$lib/types/MediaState';

function checkAndUpdateMediaState($mediaState: MediaState) {
	if ($mediaState.player) {
		$mediaState.currentTime = $mediaState.player.getCurrentTime();
	}
}

export function stopMediaStateUpdater($mediaState: MediaState) {
	clearInterval($mediaState.checkInterval);
}

export function startMediaStateUpdater($mediaState: MediaState) {
	stopMediaStateUpdater($mediaState);
	$mediaState.checkInterval = setInterval(() => {
		checkAndUpdateMediaState($mediaState);
	}, 500);
}
