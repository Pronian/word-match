<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import BoxContainer from '$lib/BoxContainer.svelte';
	import CrossPlus from '~icons/basil/cross-solid';

	const dispatch = createEventDispatcher();

	export let value: string;
	export let closable = true;
</script>

<BoxContainer --color="var(--c-bg-dark)">
	<div class="letters">
		{#each value as letter}
			<div class="letter">{letter}</div>
		{/each}
		{#if closable}
			<button title="Remove letter sequence" on:click={() => dispatch('close')}>
				<CrossPlus class="i-cross" />
			</button>
		{/if}
	</div>
</BoxContainer>

<style>
	.letters {
		--close-size: 25px;
		display: flex;
		align-items: center;
		padding-right: var(--close-size);
		background-color: var(--c-bg-light);
	}

	.letter {
		border-right: 2px solid var(--c-letter-separator);
		width: 2.4ch;
		font-size: 20px;
		font-weight: var(--weight-bold);
		text-align: center;
		text-transform: uppercase;
	}

	.letter:last-of-type {
		border-color: var(--c-bg-dark);
	}

	button {
		position: absolute;
		top: 0;
		right: 0;
		display: block;
		border: none;
		border-radius: 0;
		padding: 0;
		line-height: 0;
		color: var(--c-text-light);
		background-color: var(--c-red);
	}

	button :global(.i-cross) {
		width: var(--close-size);
		height: var(--close-size);
		transform: scale(1.5);
	}
</style>
