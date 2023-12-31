import { readFile, writeFile } from 'node:fs/promises';

/**
 * Loads a file containing one word per line and returns an array of words.
 * @param {string} path - the path to the file to load
 * @returns {Promise<string[]>}
 */
async function loadDictFile(path) {
	const filePath = new URL(path, import.meta.url);
	const text = await readFile(filePath, 'utf-8');
	return text
		.split('\n')
		.map((line) => line.trim())
		.filter((l) => !!l);
}

/** @type {string[]} */
let allLines = [];

allLines = allLines.concat(await loadDictFile('./knot_words.txt'));
allLines = allLines.concat(await loadDictFile('./enable.txt'));
allLines = allLines.concat(await loadDictFile('./words_alpha.txt'));

const words = new Set(allLines.sort());

const targetPath = new URL('../static/words.txt', import.meta.url);

await writeFile(targetPath, [...words].join('\n'), 'utf-8');

console.log(`Wrote ${words.size} words to ${targetPath}`);
