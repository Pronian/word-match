/**
 * Load words from a dictionary file.
 * @returns - An array of words.
 */
export async function loadWords() {
	// Used dictionary from https://github.com/dwyl/english-words
	let resBody = '';

	resBody = await fetch('/words_alpha.txt')
		.then((res) => res.text())
		.catch((err) => {
			console.error('Failed to load dictionary file.', err);
			return '';
		});

	const allWords = resBody.split('\n').map((word) => word.trim());

	return allWords;
}
