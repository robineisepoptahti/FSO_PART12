import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  // Defensive: ensure todos is an array. If it's not, log it for debugging
  if (!Array.isArray(todos)) {
    // eslint-disable-next-line no-console
    console.warn("TodoList expected todos to be an array, got:", todos);
    return null;
  }

  return (
    <>
      {todos
        .map((todo) => {
          return (
            <div key={todo._id || todo.id || Math.random()}>
              <Todo
                todo={todo}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            </div>
          );
        })
        .reduce((acc, cur) => [...acc, <hr key={Math.random()} />, cur], [])}
    </>
  );
};

export default TodoList;
