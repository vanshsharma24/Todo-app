// Key used to store/retrieve the todo list in localStorage
const STORAGE_KEY = "todo-app.todos.v1";

// Reads the saved todo list from localStorage.
// Returns an empty array if nothing is saved or if parsing fails.
export function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to load todos from localStorage:", err);
    return [];
  }
}
// Writes the current todo list to localStorage as JSON.
export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (err) {
    console.error("Failed to save todos to localStorage:", err);
  }
}

// Reducer that handles all state transitions for the todo list.
// Keeping this logic in one place makes it easy to reason about
// how each action type changes state.
export function todosReducer(state, action) {
  switch (action.type) {
    // Replace the entire list (used when loading from storage)
    case "LOAD":
      return action.payload;

    // Add a new todo, ignoring empty/whitespace-only input
    case "ADD": {
      const text = action.payload.trim();
      if (!text) return state;
      return [
        ...state,
        { id: crypto.randomUUID(), text, completed: false },
      ];
    }

    // Update the text of an existing todo by id
    case "EDIT": {
      const text = action.payload.text.trim();
      if (!text) return state; // don't save empty edits
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text } : todo
      );
    }

    // Remove a todo by id
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);

    // Flip the completed state of a todo by id
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    default:
      return state;
  }
}
