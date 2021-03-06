var redux = require('redux');

console.log('Starting redux Todo example');

var stateDefault =
    {
        searchText: "",
        showCompleted: false,
        todos: []
    };
var nextTodoId = 1;

var reducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCHTEXT':
            return {
                ...state,
                searchText: action.searchText
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos,
                    {
                        id: nextTodoId++,
                        todo: action.todo
                    }
                ]
            }
        default:
            return state;
    }
};


// one store per app..
var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

console.log("wat is je state: ", store.getState());

var action = {
    type: 'CHANGE_SEARCHTEXT',
    searchText: "zoek naar mij",

};
var unsubscribe = store.subscribe( () =>{
    var state = store.getState()
    console.log("aha, iets veranderd", state);
    document.getElementById("app").innerHTML = state.searchText + ' ' + state.todos;
});

store.dispatch(action);

// unsubscribe();

store.dispatch( {
    type: 'CHANGE_SEARCHTEXT',
    searchText: "zoek naar iets anders dan mij",

});

store.dispatch( {
    type: 'CHANGE_SEARCHTEXT',
    searchText: " naar iets anders dan mij",

});
store.dispatch( {
    type: 'CHANGE_SEARCHTEXT',
    searchText: "zoek  iets anders dan mij",

});
store.dispatch( {
    type: 'CHANGE_SEARCHTEXT',
    searchText: "zoek naar  anders dan mij",

});
store.dispatch( {
    type: 'CHANGE_SEARCHTEXT',
    searchText: "zoek naar iets  dan mij",

});
store.dispatch( {
    type: 'CHANGE_SEARCHTEXT',
    searchText: "zoek naar iets anders  mij",

});
store.dispatch( {
    type: 'CHANGE_SEARCHTEXT',
    searchText: "zoek naar iets anders dan ",

});
store.dispatch(
    {
        type: 'ADD_TODO',
        todo: "Cleaning the house"
    });


store.dispatch(
    {
        type: 'ADD_TODO',
        todo: "Cleaning the cat"
    });

store.dispatch(
    {
        type: 'ADD_TODO',
        todo: "Feeding the cat"
    });

