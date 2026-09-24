// Button that switches a todo item into edit mode
function EditButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="todo-icon-button"
      aria-label={`Edit ${label}`}
    >
      Edit
    </button>
  );
}
export default EditButton;
