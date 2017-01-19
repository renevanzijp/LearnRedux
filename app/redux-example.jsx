var redux = require('redux');

console.log('Starting redux example');

// redux maintains state in a store.
// State is a plain js object.
// State is read-only.
// Dispatch action to update state
// Actions are js object, with a type and some data (data required to update the state).

// Reducers are pure functions. The take  state + action to compute new state.
var reducer = (state = {name: 'Anonymous'}, action ) => {
    // state = state || {name: 'Anonymous'} ;
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
};

// one store per app..
var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

var currentState = store.getState();

console.log(currentState);

var action = {
    type: 'CHANGE_NAME',
    name: "Kees"
};
var unsubscribe = store.subscribe( () =>{
    var state = store.getState()
    console.log("aha, iets veranderd", state);
});

store.dispatch(action);

// unsubscribe();

store.dispatch(
    {
        type: 'CHANGE_NAME',
        name: "Piet"
    });


