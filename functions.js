const fetch = require("node-fetch");

//* Thunk function to delay action and get the data from server
const fetchTodos = async (dispatch, getState) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const todos = await response.json();

  dispatch({
    type: "todos/todoLoaded",
    payload: todos,
  });

  console.log(`Number of updated todos: ${getState().todos.length}`);
};

module.exports = {
  fetchTodos,
};
