// Svelte Api docs: writeable store here: https://svelte.dev/docs#writable
// Svelte tutorial docs: Custom store here: https://svelte.dev/tutorial/custom-stores
// Xstate Api docs: interpreter here: https://xstate.js.org/docs/guides/interpretation.html#interpreter

//Thoughts: a custom store with sub/unsub plugged into the service - we're using svelte's store's 'set' method so maybe svelte will know when we're doing things to it?
//alternatively we could forgo the interpreter for this very simple thought experiment and just go with the state machine and do our own transitions like in https://xstate.js.org/docs/guides/states.html#state-definition ?
import { writable } from "svelte/store";
import { Machine, interpret } from "xstate";

function createStore(definition) {
  const machine = Machine(definition);

  const { subscribe, set } = writable(definition.initial, () => {
    service.start();
    return () => service.stop();
  });

  const service = interpret(machine).onTransition(set);

  return {
    subscribe,
    send: e => service.send(e)
  };
}

export const customStore = createStore({
  initial: "inactive",
  states: {
    inactive: { on: { TOGGLE: "active" } },
    active: { on: { TOGGLE: "inactive" } }
  }
});
