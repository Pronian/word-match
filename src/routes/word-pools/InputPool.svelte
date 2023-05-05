<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import BoxContainer from "$lib/BoxContainer.svelte";
	import CrossPlus from "~icons/basil/cross-solid";

	const dispatch = createEventDispatcher();
	let count = 1;
	let letters: string = '';
</script>

<BoxContainer --color="var(--c-theme-dark)">
	<div class="cont">
		<div class="top">
			<input class="count" type="number" bind:value={count} min="1" max="20">
			<span>of</span>
			<button on:click={() => dispatch('close')}>
				<CrossPlus class="i-cross"/>
			</button>
		</div>
		<div class="bottom">
			<span class="width-calc" aria-hidden="true">{letters || '0'}</span> <!-- This is used to calculate the width of the input -->
			<input class="letters" type="text" bind:value={letters} maxlength="20">
		</div>
	</div>
</BoxContainer>

<style>
	.cont {
		display: flex;
		flex-direction: column;
		--close-size: 26px;
	}
	
	.top {
		position: relative;
		display: flex;
		width: 100%;
		padding: 0 calc(var(--close-size) + 10px);
		align-items: center;
		justify-content: center;
		gap: 10px;
		font-size: 18px;
		color: var(--c-text-light);
		background-color: var(--c-theme);
	}

	input, .width-calc {
		display: block;
		font-size: 20px;
		font-weight: var(--weight-bold);
		text-align: center;
		border: none;
		outline: none;
	}

	.count {
		width: 3ch;
		color: var(--c-text-light);
		background-color: transparent
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
		transform: scale(1.4);
	}

	.bottom {
		position: relative;
	}

	.width-calc, .letters {
		color: var(--c-text-dark);
		background-color: var(--c-bg-light);
		padding: 0 15px;
		letter-spacing: 0.1ch;
		text-transform: uppercase;
	}

	.letters {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>