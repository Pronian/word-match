<script lang="ts">
	import { onMount } from 'svelte';
	import ButtonAdd from '$lib/ButtonAdd.svelte';
	import ButtonRound from '$lib/ButtonRound.svelte';
	import LetterSequence from '$lib/LetterSequence.svelte';
	import WordResults from '$lib/WordResults.svelte';
	import InputPool from './InputPool.svelte';
	import { loadWords } from '$lib/word-matching/dictionary';
	import type { PoolOrSequence } from '$lib/word-matching/letterPools';
	import type { FindWordsMessage } from '$lib/word-matching/findWordsWorker';

	let wordsPromise: Promise<string[]>;
	let findWordsWorker: Worker;
	let results: string[] | undefined = undefined;
	let searching = false;
	let parts: PoolOrSequence[] = [];

	onMount(async () => {
		wordsPromise = loadWords();

		const FindWordsWorker = await import('$lib/word-matching/findWordsWorker?worker');
		findWordsWorker = new FindWordsWorker.default();
	});

	function addPart() {
		parts.push({ count: 1, letters: ['A', 'B', 'C'] });
		parts = parts;
	}

	function removePart(part: PoolOrSequence) {
		const index = parts.indexOf(part);
		if (index > -1) {
			parts.splice(index, 1);
			parts = parts;
		}
	}

	function convertLastToSequence() {
		const last = parts.at(-1);

		if (!last || typeof last === 'string') return;

		const letters = last.letters.join('');
		parts[parts.length - 1] = letters;
	}

	function findWords(dictionary: string[]) {
		searching = true;
		const message: FindWordsMessage = [parts, dictionary];

		findWordsWorker.postMessage(message);

		findWordsWorker.onmessage = (e: MessageEvent<string[]>) => {
			results = e.data;
			searching = false;
		};
	}

	$: {
		parts;
		results = undefined; // reset results on input change
	}

	$: console.log('letter pool parts', parts);
	$: console.log('searching', searching);
</script>

<div class="pool-cont">
	{#each parts as part (part)}
		{#if typeof part === 'string'}
			<LetterSequence
				value={part}
				on:close={() => {
					removePart(part);
				}}
			/>
		{:else}
			<InputPool
				bind:value={part}
				on:close={() => {
					removePart(part);
				}}
			/>
		{/if}
	{/each}
</div>

<div class="buttons">
	<ButtonAdd class="add-pool" title="Add Word Pool" on:click={addPart} />
	<ButtonRound classBtn="btn-convert" on:click={convertLastToSequence}>
		Convert last<br />to sequence
	</ButtonRound>

	{#await wordsPromise}
		<div>Loading dictionary</div>
	{:then words}
		<ButtonRound
			on:click={() => {
				findWords(words);
			}}>
			Find words
		</ButtonRound>
	{/await}
</div>

<WordResults words={results} {searching}/>

<style>
	.pool-cont {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20px;
		gap: 20px;
	}

	.buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, auto);
		justify-items: center;
		align-items: center;
		padding: 10px;
		gap: 15px;
	}

	.buttons :global(.add-pool) {
		grid-column: 1 / span 2;
	}

	.buttons :global(.btn-convert) {
		font-size: 15px;
	}
</style>
