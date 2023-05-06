<script lang="ts">
	import '@fontsource/lato/700.css';
	import '@fontsource/lato/900.css';
	import './global.css';
</script>

<div>
	<header>
		<nav>
			<a href="/5-letter">5 letter words</a>
			<a href="/word-pools">word pools</a>
		</nav>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	header {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px;
		font-size: 18px;
	}

	nav {
		display: flex;
		gap: 20px;
		text-transform: uppercase;
	}

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
