<script>
	export let name;
	import { customStore } from './customStore.js';
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>
<button on:click={customStore.send('TOGGLE')}>
	Click to toggle
</button>

<h6>State Machine State is found by getting custom store's value: {$customStore}</h6>
