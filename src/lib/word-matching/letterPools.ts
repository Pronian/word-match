export interface LetterPool {
	/**
	 * The pool of letters to pick from
	 */
	letters: string[];
	/**
	 * How many letters to pick from the pool
	 */
	count: number;
}

export type PoolOrSequence = LetterPool | string;

/**
 * Convert an array of letter pools and sequences to an array of letter pools.
 * @param parts - an array containing a mix of letter pools and sequences (literal strings)
 * @returns an array of letter pools
 */
export function normalizeToPools(parts: PoolOrSequence[]): LetterPool[] {
	let result: LetterPool[] = [];

	for (const part of parts) {
		if (typeof part === 'string') {
			result = result.concat(
				part
					.toLowerCase()
					.split('')
					.map((letter) => ({
						letters: [letter],
						count: 1,
					})),
			);
		} else {
			result.push({
				letters: part.letters.map((letter) => letter.toLowerCase()),
				count: part.count,
			});
		}
	}

	return result;
}

/**
 * Convert a word search string like `[flo]3[oau]1r` to an array of letter pools.
 * @param searchStr - the word search string, brackets indicate a letter pool,
 * the number after the brackets indicates how many letters to pick from the pool,
 * if characters are not in brackets they are treated as a literal string
 * @returns the letter pools that the word search string represents
 */
export function inputToLetterPools(searchStr: string): LetterPool[] {
	const reVar = /(\[(?<letters>[a-z]+)\](?<count>\d{1,2}))|(?<letter>[a-z])/gi;
	const result: LetterPool[] = [];

	const matches = searchStr.matchAll(reVar);
	if (!matches) return result;

	for (const match of matches) {
		if (match.groups?.letter) {
			result.push({
				letters: [match.groups.letter],
				count: 1,
			});
		} else if (match.groups?.letters) {
			result.push({
				letters: match.groups.letters.split(''),
				count: parseInt(match.groups.count),
			});
		}
	}

	return result;
}

/**
 * Compute word length from letter pools.
 * @param pools the letter pools to compute the word length from
 * @returns the word length that the letter pools represent
 */
export function wordLengthFromLetterPools(pools: LetterPool[]) {
	let length = 0;

	for (const pool of pools) {
		length += pool.count;
	}

	return length;
}

/**
 * Goes though the letter pools and though the word simultaneously and checks
 * if the word matches the letter pools.
 * @param word the word to check
 * @param pools the letter pools to check the word against
 * @returns true if the word matches the letter pools, false otherwise
 */
export function wordMatchesLetterPools(word: string, pools: LetterPool[]) {
	const wordLetters = word.split('').values();
	let targetLetter: string | undefined = wordLetters.next().value;

	for (const pool of pools) {
		const availableLetters = pool.letters.slice();
		let remainingCount = pool.count;

		while (remainingCount > 0) {
			if (!targetLetter) return false;

			const index = availableLetters.indexOf(targetLetter);
			if (index === -1) return false;

			availableLetters.splice(index, 1);
			remainingCount--;
			targetLetter = wordLetters.next().value;
		}
	}

	return true;
}

/**
 * Find all words in the dictionary that match the letter pools.
 * @param pools - the letter pools to match against
 * @param dictionaryWords - the dictionary to search in
 * @returns the words that match the letter pools
 */
export function findWordsFromLetterPools(pools: LetterPool[], dictionaryWords: string[]) {
	const poolWordLength = wordLengthFromLetterPools(pools);
	const wordsMatchingLength = dictionaryWords.filter((word) => word.length === poolWordLength);

	const foundWords = wordsMatchingLength.filter((word) => wordMatchesLetterPools(word, pools));

	return foundWords;
}

/**
 * Find all words in the dictionary that match the letter pools and sequences.
 * @param parts - an array containing a mix of letter pools and
 * sequences (literal strings) to use for the word search
 * @param dictionaryWords - all the words to search in
 * @returns the words that match the letter pools and sequences
 */
export function findWordsFromPoolsAndSequences(
	parts: PoolOrSequence[],
	dictionaryWords: string[],
): string[] {
	const pools = normalizeToPools(parts);
	return findWordsFromLetterPools(pools, dictionaryWords);
}
