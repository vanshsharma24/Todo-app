import { useReducer, useEffect, useState } from "react";
import { todosReducer, loadTodos, saveTodos } from "./todosReducer";
import TodoHeader from "./TodoHeader";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import ConfirmDialog from "./ConfirmDialog";
function TodoApp() {
  const [todos, dispatch] = useReducer(todosReducer, undefined, () =>
    typeof window !== "undefined" ? loadTodos() : []
  );
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);
  // Track which todo is pending deletion (null = no dialog shown)
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  function handleAdd(text) {
    dispatch({ type: "ADD", payload: text });
  }
  function handleToggle(id) {
    dispatch({ type: "TOGGLE", payload: id });
  }
  // Instead of deleting immediately, open the confirmation dialog
  function handleDeleteRequest(id) {
    setPendingDeleteId(id);
  }
  // Called when the user confirms in the dialog
  function confirmDelete() {
    dispatch({ type: "DELETE", payload: pendingDeleteId });
    setPendingDeleteId(null);
  }
  // Called when the user cancels
  function cancelDelete() {
    setPendingDeleteId(null);
  }
  function handleEdit(id, text) {
    dispatch({ type: "EDIT", payload: { id, text } });
  }
  const remaining = todos.filter((t) => !t.completed).length;
  return (
    <div className="todo-page">
      <div className="todo-card">
        <TodoHeader total={todos.length} remaining={remaining} />
        <TodoForm onAdd={handleAdd} />
        {todos.length === 0 ? (
          <div className="todo-empty-state">
            <p className="todo-empty-title">No todos yet</p>
            <p className="todo-empty-body">
              Add your first task above to get started.
            </p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDeleteRequest}
                onEdit={handleEdit}
              />
            ))}
          </ul>
        )}
      </div>
      {/* Confirmation dialog, only rendered when there's a pending delete */}
      {pendingDeleteId !== null && (
        <ConfirmDialog
          message="Do you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
export default TodoApp;