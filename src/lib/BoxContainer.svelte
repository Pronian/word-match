<script lang="ts">
	import { onDestroy } from "svelte";

	export let depth = 5;
	let className = '';
	export { className as class };

	let dynamicDepth = depth + 'px';
	let depthChangeTimeout = 0;

	function tempDepthChange(depthDiff: number, duration: number) {
		dynamicDepth = (depth + depthDiff) + 'px';
		clearTimeout(depthChangeTimeout);

		depthChangeTimeout = setTimeout(() => {
			dynamicDepth = depth + 'px';
		}, duration * 2);
	}

	function onPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			tempDepthChange(-2, 200);
		}
	}

	onDestroy(() => {
		clearTimeout(depthChangeTimeout);
	});
</script>

<div class="cont {className}"
	style:--depth={dynamicDepth}
	style:margin-top={depth + 'px'}
	style:margin-right={depth + 'px'}
>
	<div class="border-corner-top"/>
	<div class="border-top"/>
	<div class="border-left"/>
	<div class="border-bottom"/>
	<div class="border-corner-right"/>
	<div class="box-content"
		on:click={() => {tempDepthChange(-2, 200)}}
		on:keypress={onPress}
	>
		<slot />
	</div>
</div>

<style>
	.cont {
		--transition: all 200ms ease-in-out;
		--overlap: 1px;
		position: relative;
		transition: var(--transition);
		width: min-content;
		height: min-content;
	}

	.box-content {
		position: relative;
		transition: var(--transition);
		transform: translate(calc(var(--depth)), calc(var(--depth) * -1));
		border: 2px solid var(--color);
	}

	.border-corner-top {
		position: absolute;
		background-color: var(--color);
		top: calc(var(--depth) * -1);
		left: 0;
		width: calc(var(--depth) + var(--overlap));
		height: calc(var(--depth) + var(--overlap));
		clip-path: polygon(var(--depth) 0, 100% 0, 100% 100%, 0 100%, 0 var(--depth));
		transition: var(--transition);
	}

	.border-left {
		position: absolute;
		top: 0;
		left: 0;
		width: calc(var(--depth) + var(--overlap));
		height: 100%;
		background-color: var(--color);
		transition: var(--transition);
	}

	.border-bottom {
		position: absolute;
		bottom: 0;
		left: var(--depth);
		width: calc(100% - var(--depth));
		height: calc(var(--depth) + var(--overlap));
		background-color: var(--color);
		transition: var(--transition);
	}

	.border-corner-right {
		position: absolute;
		bottom: 0;
		right: calc(var(--depth) * -1);
		width: calc(var(--depth) + var(--overlap));
		height: calc(var(--depth) + var(--overlap));
		clip-path: polygon(100% 0, 100% var(--overlap), var(--overlap) 100%, 0 100%, 0 0);
		background-color: var(--color);
		transition: var(--transition);
	}
</style>