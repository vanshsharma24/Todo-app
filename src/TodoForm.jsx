import { useState } from "react";
import AddButton from "./AddButton";

// Form for adding a new todo. Manages its own input state and calls
// onAdd(text) when submitted.
function TodoForm({ onAdd }) {
  const [newTodoText, setNewTodoText] = useState("");
  function handleAdd(e) {
    e.preventDefault();
    onAdd(newTodoText);
    setNewTodoText("");
  }

  return (
    <form onSubmit={handleAdd} className="todo-form">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Add a task and press enter"
        className="todo-input"
        aria-label="New todo text"
      />
      <AddButton />
    </form>
  );
}
export default TodoForm;
