var redux = require('redux');

console.log('Starting redux example');

// redux maintains state in a store.
// State is a plain js object.
// State is read-only.
// Dispatch action to update state
// Actions are js object, with a type and some data (data required to update the state).

// Reducers are pure functions. The take  state + action to compute new state.

var defaultState = {
    name: "Anonymous",
    hobbies: [],
    movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;

var oldOneBigReducer = (state = defaultState, action) => {
    // state = state || {name: 'Anonymous'} ;
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'ADD_HOBBY':
            return {
                ...state,
                hobbies: [...state.hobbies,
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
                ]
            }
        case 'ADD_MOVIE':
            return {
                ...state,
                movies: [...state.movies,
                    {
                        id: nextMovieId++,
                        movie: action.title,
                        genre: action.genre
                    }
                ]
            }
        case 'REMOVE_HOBBY':
            return {
                ...state,
                hobbies: state.hobbies.filter( (hobby) => hobby.id !== action.id)
            }
        case 'REMOVE_MOVIE':
            return {
                ...state,
                movies: state.movies.filter( (movie) => movie.id !== action.id)
            }
            default:
            return state;
    }
};
var nameReducer =  (state = 'Anonymous', action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }
};

var hobbiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_HOBBY':
            return [
                ...state,
                {
                    id: nextHobbyId++,
                    hobby: action.hobby
                }
            ]
        case 'REMOVE_HOBBY':
            return state.filter( (hobby) => hobby.id !== action.id)
         default:
            return state;
    }
};

var moviesReducer =  (state = [] , action) => {
    switch (action.type) {
        case 'ADD_MOVIE':
            return [
                ...state,
                {
                    id: nextMovieId++,
                    movie: action.title,
                    genre: action.genre
                }
            ]
        case 'REMOVE_MOVIE':
            return state.filter((movie) => movie.id !== action.id)
        default:
            return state;
    }
};

var reducer = redux.combineReducers(
    {
        name: nameReducer,
        hobbies: hobbiesReducer,
        movies: moviesReducer
    }
);

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
        type: 'ADD_HOBBY',
        hobby: "Skating"
    });
store.dispatch(
    {
        type: 'ADD_HOBBY',
        hobby: "diving"
    });
store.dispatch(
    {
        type: 'ADD_HOBBY',
        hobby: "chess"
    });
store.dispatch(
    {
        type: 'CHANGE_NAME',
        name: "Piet"
    });
store.dispatch(
    {
        type: 'ADD_MOVIE',
        title: "Middas in het bos",
        genre: "kids"

    });
store.dispatch(
    {
        type: 'ADD_MOVIE',
        title: "Middas in het bos II",
        genre: "kids"

    });
store.dispatch(
    {
        type: 'REMOVE_HOBBY',
        id: 2
    });

store.dispatch(
    {
        type: 'REMOVE_MOVIE',
        id: 1
    });