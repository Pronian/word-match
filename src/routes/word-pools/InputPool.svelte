<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import BoxContainer from "$lib/BoxContainer.svelte";
	import CrossPlus from "~icons/basil/cross-solid";

	const dispatch = createEventDispatcher();
	let count = 1;
	let elLetters: HTMLInputElement;
	let letters: string = 'ABC';

	onMount(() => {
		elLetters.select();
		elLetters.focus();
	});
</script>

<BoxContainer --color="var(--c-theme-dark)">
	<div class="cont">
		<div class="top">
			<input class="count" type="number" bind:value={count}
				min="1" max="20"
				aria-label="Number of letters in the letter pool"
			>
			<span>from</span>
			<button title="Remove pool" on:click={() => dispatch('close')}>
				<CrossPlus class="i-cross"/>
			</button>
		</div>
		<div class="bottom">
			<!-- width-calc is used to calculate the width of the input -->
			<span class="width-calc" aria-hidden="true">{letters || '0'}</span>
			<input class="letters" type="text"
				bind:this={elLetters}
				bind:value={letters}
				minlength="1"
				maxlength="20"
				aria-label="Letters in the letter pool"
				autocomplete="false"
				autocorrect="false"
				autocapitalize="false"
				spellcheck="false"
			>
		</div>
	</div>
</BoxContainer>

<style>
	.cont {
		display: flex;
		flex-direction: column;
		--close-size: 24px;
	}
	
	.top {
		position: relative;
		display: flex;
		width: 100%;
		padding-left: 10px;
		padding-right: calc(var(--close-size) + 10px);
		align-items: center;
		justify-content: center;
		gap: 0.5ch;
		font-size: 18px;
		color: var(--c-text-light);
		background-color: var(--c-theme);
	}

	input, .width-calc {
		display: block;
		font-size: 20px;
		font-weight: var(--weight-bold);
		border: none;
		outline: none;
	}

	.count {
		width: 3ch;
		color: var(--c-text-light);
		background-color: transparent;
		text-align: right;
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

	.bottom {
		position: relative;
	}

	.width-calc, .letters {
		padding: 0 1ch;
		color: var(--c-text-dark);
		background-color: var(--c-bg-light);
		text-align: center;
		letter-spacing: 0.1ch;
		text-transform: uppercase;
	}

	.letters {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.letters::selection {
		background-color: var(--c-yellow);
	}
</style>