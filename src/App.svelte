<script>
	export let name;
	import { Machine, interpret } from 'xstate'; // or use your own interpreter!

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
const toggleMachine = Machine({
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
});


// Machine instance with internal state
const toggleService = interpret(toggleMachine)
  .onTransition(state => {
	  console.log(state.value);
	  
  })
  .start();
// => 'inactive'

$: currentState = toggleService.state.value

toggleService.send('TOGGLE');
// => 'active'

toggleService.send('TOGGLE');
// => 'inactive'

function handleClick(){
	toggleService.send('TOGGLE')
	currentState = toggleService.state.value;
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

<h6>State Machine State is found by getting toggleService.state.value: {currentState}</h6>
