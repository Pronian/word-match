<script lang="ts">
	import BoxContainer from "$lib/BoxContainer.svelte";
	import IconPlus from "~icons/basil/plus-solid";

	export let title: string;
</script>

<BoxContainer --color="green">
	<button {title}>
		<IconPlus width="32" height="32"/>
	</button>
</BoxContainer>

<style>
	button {
		display: block;
		outline: none;
		border: none;
		border-radius: 0;
		padding: 0;
		line-height: 0;
		color: white;
		background-color: var(--color);
	}
</style>