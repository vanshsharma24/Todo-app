// Header: title + status subtitle (empty state or progress count)
function TodoHeader({ total, remaining }) {
  return (
    <header className="todo-header">
      <h1 className="todo-title">Todo</h1>
      <p className="todo-subtitle">
        {total === 0
          ? "Nothing on your list."
          : `${remaining} of ${total} remaining`}
      </p>
    </header>
  );
}
export default TodoHeader;
