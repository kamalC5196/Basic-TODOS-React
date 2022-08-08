import { useState, useCallback } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [val, setVal] = useState("");
  const handleTodo = useCallback((e) => {
    e.preventDefault();
    const task = e.target.elements.enterTodo.value;
    const id = Date.now();
    const done = false;
    //setTodos((prev) => [...prev, { task, id }]);
    setTodos((prev) => prev.concat({ task, id, done }));
    setVal(" ");
    e.target.elements.enterTodo.value = "";
  }, []);

  const deleteTodo = useCallback((todo) => {
    //const updatedTodos = todos.filter((x) => x.id !== todo.id);
    setTodos((prev) => prev.filter((x) => x.id !== todo.id));
  }, []);

  const handleDone = useCallback((todo) => {
    //const updatedTodos = todos.filter((x) => x.id !== todo.id);
    setTodos((prev) =>
      prev.map((x) => (x.id === todo.id ? { ...x, done: !x.done } : x))
    );
  }, []);

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={(e) => handleTodo(e)}>
        <input type="text" id="enterTodo" value={val}/>
        <button type="submit">add</button>
      </form>
      {todos.map((todo) => (
        <li
          key={todo?.id}
          onDoubleClick={() => {
            deleteTodo(todo);
          }}
          onClick={() => handleDone(todo)}
          style={{ textDecoration: todo.done ? "line-through" : "none" }}
        >
          {todo?.task}
        </li>
      ))}
    </div>
  );
}
