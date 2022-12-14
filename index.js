const { createStore, applyMiddleware } = require("redux");
const { fetchTodos } = require("./functions");
// const {
//   delayActionMiddleware,
//   fetchAsyncMiddleware,
// } = require("./middlewares");

//* Third party thunk middleware
const thunk = require("redux-thunk");

//* Initial State
const initailState = {
  todos: [],
};

//* Reducer
const todoReducer = (state = initailState, action) => {
  switch (action.type) {
    case "todos/todoAdded":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.payload,
          },
        ],
      };

    case "todos/todoLoaded":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    default:
      return state;
  }
};

//* Store
const store = createStore(
  todoReducer,
  //   applyMiddleware(delayActionMiddleware, fetchAsyncMiddleware)
  applyMiddleware(thunk.default)
);

//* Subscribe to state changes
store.subscribe(() => {
  console.log(store.getState());
});

//* Dispatch actons
// store.dispatch({
//   type: "todos/todoAdded",
//   payload: "Learn Redux from LWS",
// });

//* We need to dispatch a fake action to get data from the server asynchronously and then dispatch the action to update the state in the middleware.

// store.dispatch({
//   type: "todos/fetchTodos",
// });

//* OR (Thunk function fetchTodos)

store.dispatch(fetchTodos);
