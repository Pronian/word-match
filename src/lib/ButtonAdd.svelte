<script lang="ts">
	import BoxContainer from '$lib/BoxContainer.svelte';
	import IconPlus from '~icons/basil/plus-solid';

	export let title: string;
	let className = '';
	export { className as class };
	export let onclick: (() => void) | undefined = undefined;
</script>

<BoxContainer class={className} --color="var(--c-green-dark)">
	<button {title} on:click={onclick}>
		<IconPlus width="32" height="32" transform="scale(1.2)" />
	</button>
</BoxContainer>

<style>
	button {
		display: block;
		border: none;
		border-radius: 0;
		padding: 0;
		line-height: 0;
		color: var(--c-text-light);
		background-color: var(--c-green);
	}

	button:not(:disabled) {
		cursor: pointer;
	}

	button:focus {
		outline: 3px solid var(--c-bg-dark);
	}
</style>
