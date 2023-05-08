<script lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let depth = 5;
	let className = '';
	export { className as class };
	export let classBtn = '';

	let dynamicDepth = depth + 'px';
	let depthChangeTimeout = 0;

	function click(depthDiff: number, duration: number) {
		dynamicDepth = depth + depthDiff + 'px';
		clearTimeout(depthChangeTimeout);

		setTimeout(() => {
			dispatch('click');
		}, duration);

		depthChangeTimeout = setTimeout(() => {
			dynamicDepth = depth + 'px';
		}, duration * 2);
	}

	onDestroy(() => {
		clearTimeout(depthChangeTimeout);
	});
</script>

<div class="cont {className}" style:--depth={dynamicDepth}>
	<div class="butt-shape" />
	<div class="butt-wrapper">
		<button class={classBtn} on:click={() => click(-2, 200)}>
			<slot />
		</button>
	</div>
</div>

<style>
	.cont {
		--radius: 30px;
		position: relative;
	}

	.butt-shape,
	button {
		display: block;
		border-radius: var(--radius);
	}

	.butt-shape {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: var(--c-bg-dark);
	}

	.butt-wrapper {
		border-radius: var(--radius);
		border: 3px solid var(--c-bg-light);
		background-color: var(--c-bg-light);
		transform: translateY(calc(var(--depth) * -1));
		transition: transform 200ms ease-in-out;
	}

	button {
		padding: 1.2ch;
		color: var(--c-text-dark);
		font-size: 18px;
		font-weight: var(--weight-bold);
		border: 3px solid var(--c-theme);
		background-color: var(--c-bg-light);
		outline: none;
	}

	button:focus-visible {
		background-color: var(--c-theme);
	}

	button:not(:disabled) {
		cursor: pointer;
	}
</style>
