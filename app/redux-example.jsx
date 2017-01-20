var redux = require('redux');
var axios = require('axios');

console.log('Starting redux example');

// redux maintains state in a store.
// State is a plain js object.
// State is read-only.
// Dispatch action to update state
// Actions are js object, with a type and some data (data required to update the state).
// Reducers are pure functions. The take  state + action to compute new state.

var actions  = require('./actions/index');
var store = require('./store/configureStore').configure();

console.log(store.getState());

var unsubscribe = store.subscribe( () =>{
    var state = store.getState()
    console.log("aha, iets veranderd", state);

    // using the async action...
    if(state.map.isFetching){
        document.getElementById('app').innerHTML = 'Loading';
    } else if (state.map.url){
        document.getElementById('app').innerHTML = "<a target='_blank' href='" + state.map.url + "'>View your location</a>";
    }
});

store.dispatch(actions.changeName('Kees'));
store.dispatch(actions.addHobby('skating'));
store.dispatch(actions.addHobby('diving'));
store.dispatch(actions.addHobby('chess'));
store.dispatch(actions.changeName('Piet'));
store.dispatch(actions.addMovie("Middas in het bos", "kids"));
store.dispatch(actions.addMovie( "Middas in het bos II","kids"));
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.removeMovie(1));

store.dispatch(actions.fetchLocation());

//unsubscribe();