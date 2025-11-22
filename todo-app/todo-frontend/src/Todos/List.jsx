import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  if (!Array.isArray(todos)) {
    console.error('todos is not an array:', todos);
    return <div>Loading todos...</div>;
  }

  return (
    <>
      {todos
        .map((todo) => {
          return (
            <div key={todo._id}>
              <Todo
                todo={todo}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            </div>
          );
        })
        .reduce((acc, cur, idx) => [...acc, <hr key={`hr-${idx}`} />, cur], [])}
    </>
  );
};

export default TodoList;
