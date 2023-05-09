<script lang="ts">
	import ButtonAdd from '$lib/ButtonAdd.svelte';
	import ButtonRound from '$lib/ButtonRound.svelte';
	import InputPool from './InputPool.svelte';
	import LetterSequence from './LetterSequence.svelte';
	import type { LetterPool } from '$lib/word-matching/letterPools';

	let pools: LetterPool[] = [];

	function addPool() {
		pools.push({ count: 1, letters: ['A', 'B', 'C'] });
		pools = pools;
	}

	function removePool(pool: LetterPool) {
		const index = pools.indexOf(pool);
		if (index > -1) {
			pools.splice(index, 1);
			pools = pools;
		}
	}

	$: console.log('letter pools', pools);
</script>

<div class="pool-cont">
	{#each pools as pool (pool)}
		<InputPool
			bind:value={pool}
			on:close={() => {
				removePool(pool);
			}}
		/>
	{/each}
	<LetterSequence />
</div>

<div class="buttons">
	<ButtonAdd class="add-pool" title="Add Word Pool" on:click={addPool} />
	<ButtonRound classBtn="btn-convert">
		Convert last<br />to sequence
	</ButtonRound>
	<ButtonRound>Find words</ButtonRound>
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
