// Svelte Api docs: writeable store here: https://svelte.dev/docs#writable
// Svelte tutorial docs: Custom store here: https://svelte.dev/tutorial/custom-stores
// Xstate Api docs: interpreter here: https://xstate.js.org/docs/guides/interpretation.html#interpreter

//Thoughts: a custom store with sub/unsub plugged into the service - we're using svelte's store's 'set' method so maybe svelte will know when we're doing things to it?
//alternatively we could forgo the interpreter for this very simple thought experiment and just go with the state machine and do our own transitions like in https://xstate.js.org/docs/guides/states.html#state-definition ?

import { writable } from 'svelte/store';
import { Machine, interpret } from 'xstate';

const toggleMachine = Machine({
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
});


function createCustomStore(){
    const {subscribe, set} = writable({value: 'inactive'});
    const toggleService = interpret(toggleMachine)
        .onTransition(state => {
            console.log('state change:');
            console.log(state);
            set(state);
        })

    return {
        
        //Paul42: for some reason my subscribe method fires... but the store doesn't get initialized or svelete doesn't see it as a good store?

        // subscribe: () => {
        //     console.log('trying to subscribe?');
        //     toggleService.start();

        //     return () => {
        //         console.log('trying to unsub?');
        //         toggleService.stop();
        //     }
        // },

        subscribe, //Paul42: using svelte's built in subscribe does work though, but I loose my custom toggleservice.start(); logic that I do want on subscribe.
        //I probably need to have set in here? the transition is out of scope.
        send: (eventIguess) => {
            console.log('got send with:');
            console.log(eventIguess);
            toggleService.send(eventIguess);
        }
    }
}

export const customStore = createCustomStore();