<script lang="ts">
	import ButtonAdd from '$lib/ButtonAdd.svelte';
	import InputPool from './InputPool.svelte';

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
</div>

<ButtonAdd title="Add Word Pool" on:click={addPool}/>

<style>
	.pool-cont {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20px;
		gap: 20px;
	}
</style>
