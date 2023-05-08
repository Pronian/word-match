<script lang="ts">
	import ButtonAdd from '$lib/ButtonAdd.svelte';
	import ButtonRound from '$lib/ButtonRound.svelte';
	import InputPool from './InputPool.svelte';
	import LetterSequence from './LetterSequence.svelte';

	let pools: string[] = [];

	function addPool() {
		pools.push('');
		pools = pools;
	}

	function removePool(pool: string) {
		pools.pop();
		pools = pools;
	}
</script>

<div class="pool-cont">
	{#each pools as pool}
		<InputPool on:close={() => {removePool(pool)}}/>
	{/each}
	<LetterSequence/>
</div>

<div class="buttons">
	<ButtonAdd class="add-pool" title="Add Word Pool" on:click={addPool}/>
	<ButtonRound classBtn="btn-convert">
		Convert last<br>to sequence
	</ButtonRound>
	<ButtonRound>
		Find words
	</ButtonRound>
</div>

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
