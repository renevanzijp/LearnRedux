var redux = require('redux');

console.log('Starting redux example');

// redux maintains state in a store.
// State is a plain js object.
// State is read-only.
// Dispatch action to update state
// Actions are js object, with a type and some data (data required to update the state).

// Reducers are pure functions. The take  state + action to compute new state.

// Name reducer & action generators...
var nameReducer =  (state = 'Anonymous', action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return action.name;
        default:
            return state;
    }
};
var changeName = (name)  => {
    return {
        type: 'CHANGE_NAME',
        name
    }
};

// Hobby reducer & action generators...
var nextHobbyId = 1;
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
var addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    }
};
var removeHobby = (id) => {
  return   {
      type: 'REMOVE_HOBBY',
      id
  }

};

// Movie generator & action generators...
var nextMovieId = 1;
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

var addMovie = (title, genre) => {
    return {
        type: 'ADD_MOVIE',
        title,
        genre
    }
};
var removeMovie =  (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
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

console.log(store.getState());


var unsubscribe = store.subscribe( () =>{
    var state = store.getState()
    console.log("aha, iets veranderd", state);
});

store.dispatch(changeName('Kees'));
store.dispatch(addHobby('skating'));
store.dispatch(addHobby('diving'));
store.dispatch(addHobby('chess'));
store.dispatch(changeName('Piet'));
store.dispatch(addMovie("Middas in het bos", "kids"));
store.dispatch(addMovie( "Middas in het bos II","kids"));
store.dispatch(removeHobby(2));
store.dispatch(removeMovie(1));

unsubscribe();