<script>
	export let name;
	import { customStore } from './customStore.js';

	function handleClick(event){
		console.log('got click with:');
		console.log(event);
		customStore.send('TOGGLE');
		console.log('store is now:')
		console.log($customStore);
	}
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>
<button on:click={handleClick}>
	Click to toggle
</button>

<h6>State Machine State is found by getting custom store's value: {$customStore}</h6>
