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
var store = redux.createStore(reducer);

var currentState = store.getState();

console.log(currentState);

var action = {
    type: 'CHANGE_NAME',
    name: "Kees"
};

store.dispatch(action);

console.log(store.getState());
