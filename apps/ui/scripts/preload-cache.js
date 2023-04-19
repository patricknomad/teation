const domainName = 'https://teation.com';

import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

/**
 * This script can be executed after deploying a new version
 * to production in order to preload the cache with the
 * default list of questions.
 */

(async () => {
	console.log(`Starting preload script…`);
	console.log(`Domain: ${domainName}`);

	const questions = JSON.parse(
		fs.readFileSync(path.join('', 'src/lib/layout/header/questions.json'), 'utf8')
	);

	// For each question load ${domainName}/question.json?q=${question}
	for (const question of questions) {
		const url = `${domainName}/question.json?q=${question}`;
		const currentTime = new Date().toLocaleTimeString();

		console.log(`${currentTime} Preloading: ${question}`);

		await fetch(url);
	}
})();
