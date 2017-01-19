var redux = require('redux');

console.log('Starting redux Todo example');

var stateDefault =
    {
        searchText: "",
        showCompleted: false,
        todos: []
    };


var reducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCHTEXT':
            return {
                ...state,
                searchText: action.searchText
            }
        default:
            return state;
    }
};


// one store per app..
var store = redux.createStore(reducer);

console.log(store.getState());

var action = {
    type: 'CHANGE_SEARCHTEXT',
    searchText: "zoek naar mij",

};

store.dispatch(action);

console.log(store.getState());
