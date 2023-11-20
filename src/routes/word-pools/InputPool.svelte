<script lang="ts">
	import { onMount } from 'svelte';
	import BoxContainer from '$lib/BoxContainer.svelte';
	import CrossPlus from '~icons/basil/cross-solid';
	import type { LetterPool } from '$lib/word-matching/letterPools';

	export let value: LetterPool = { count: 1, letters: ['A', 'B', 'C'] };
	export let onClose: (() => void) | undefined = undefined;

	let elLetters: HTMLInputElement;
	let lettersAsText = value.letters.join('');
	let maxCount = 20;

	onMount(() => {
		elLetters.select();
		elLetters.focus();
	});

	function onLetterInput(event: Event) {
		const inputEvent = event as InputEvent;
		const input = inputEvent.data;

		const inputMatch = input?.match(/\d/);

		if (inputMatch) {
			value.count = Number(inputMatch[0]);
			elLetters.value = lettersAsText;
			return;
		}

		lettersAsText = elLetters.value.toUpperCase();
		value.letters = lettersAsText.split('');
	}

	function onLetterInputKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (value.count < maxCount) value.count = value.count + 1;
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (value.count > 1) value.count = value.count - 1;
		}
	}

	$: {
		maxCount = Math.min(20, Math.max(1, value.letters.length));

		if (value.count > maxCount) value.count = maxCount;
	}
</script>

<BoxContainer --color="var(--c-theme-dark)">
	<div class="cont">
		<div class="top">
			<input
				class="count"
				type="number"
				bind:value={value.count}
				min="1"
				max={maxCount}
				aria-label="Number of letters in the letter pool"
			/>
			<span>from</span>
			<button title="Remove pool" on:click={onClose}>
				<CrossPlus class="i-cross" />
			</button>
		</div>
		<div class="bottom">
			<!-- width-calc is used to calculate the width of the input
				so that the input can resize dynamically -->
			<span class="width-calc" aria-hidden="true">{lettersAsText || '0'}</span>
			<input
				class="letters"
				type="text"
				bind:this={elLetters}
				value={lettersAsText}
				on:input={onLetterInput}
				on:keydown={onLetterInputKeydown}
				minlength="1"
				maxlength="20"
				aria-label="Letters in the letter pool"
				autocomplete="false"
				autocorrect="false"
				autocapitalize="false"
				spellcheck="false"
			/>
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

	input,
	.width-calc {
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

	.width-calc,
	.letters {
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
