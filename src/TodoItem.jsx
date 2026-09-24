import { useState, useEffect, useRef } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

// Renders a single todo, either in display mode (checkbox + text +
// Edit/Delete buttons) or edit mode (text input + Save/Cancel buttons).
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.text);
  const editInputRef = useRef(null);

  // When entering edit mode, focus the edit input and select its text
  // so the user can immediately start typing to replace it.
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  function startEdit() {
    setEditingText(todo.text);
    setIsEditing(true);
  }

  function commitEdit() {
    onEdit(todo.id, editingText);
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="todo-list-item">
        <div className="todo-edit-row">
          <input
            ref={editInputRef}
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={(e) => {
              // Enter saves the edit, Escape discards it
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            className="todo-edit-input"
            aria-label="Edit todo text"
          />
          <button onClick={commitEdit} className="todo-save-button">
            Save
          </button>
          <button onClick={cancelEdit} className="todo-cancel-button">
            Cancel
          </button>
        </div>
      </li>
    );
  }
  return (
    <li className="todo-list-item">
      <div className="todo-row">
        <label className="todo-checkbox-label">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="todo-checkbox"
          />
          <span
            className={
              todo.completed ? "todo-text todo-text-done" : "todo-text"
            }
          >
            {todo.text}
          </span>
        </label>
        <div className="todo-actions">
          <EditButton onClick={startEdit} label={todo.text} />
          <DeleteButton onClick={() => onDelete(todo.id)} label={todo.text} />
        </div>
      </div>
    </li>
  );
}
export default TodoItem;
