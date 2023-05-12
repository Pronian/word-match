<script lang="ts">
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import LetterSequence from "$lib/LetterSequence.svelte";
	export let words: string[] | undefined;

	function removeWord(word: string) {
		words = words?.filter((w) => w !== word);
	}
</script>

<div class="results">
	{#if words && words.length > 0}
		<div class="head">Results:</div>
		<ol>
			{#each words as word, i (word)}
				<li animate:flip={{duration: d => Math.sqrt(d) * 20}} transition:scale>
					<span class="num">{i + 1}.</span>
					<LetterSequence value={word} on:close={() => {removeWord(word)}}/>
				</li>
			{/each}
		</ol>
	{:else if words && words.length === 0}
		<div class="head">No results</div>
	{/if}
</div>

<style>
	.results {
		width: 100%;
		max-width: 750px;
	}

	.head {
		font-size: 20px;
		font-weight: var(--weight-bold);
		text-align: center;
		line-height: 1.5;
		margin-top: 10px;
		margin-bottom: 5px;
	}

	ol {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style-type: none;
		padding: 0;
		margin-top: 0;
		margin-bottom: 15px;
		gap: 20px 15px;
	}

	li {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 20px;
	}

	.num {
		margin-bottom: 3px;
		color: var(--c-text-subtle);
	}
</style>