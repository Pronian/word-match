import {
	type PoolOrSequence,
	findWordsFromPoolsAndSequences,
} from '$lib/word-matching/letterPools';

export type FindWordsMessage = [PoolOrSequence[], string[]];

onmessage = (event: MessageEvent<FindWordsMessage>) => {
	const result = findWordsFromPoolsAndSequences(event.data[0], event.data[1]);

	postMessage(result);
};
