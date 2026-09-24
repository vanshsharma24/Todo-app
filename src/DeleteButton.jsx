// Button that deletes a todo item
function DeleteButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="todo-delete-button"
      aria-label={`Delete ${label}`}
    >
      Delete
    </button>
  );
}
export default DeleteButton;
