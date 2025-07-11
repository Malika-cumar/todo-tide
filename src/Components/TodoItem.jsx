import { useState } from "react";

function TodoItem({ todos, deleteFunc, updateFunc, completeFunc }) {
  const [editTodo, setEditTodo] = useState("");
  const [editId, setEditId] = useState(null);

  function handleEdit(id) {
    setEditId(id);
    const currentTodo = todos.find((todo) => todo.id === id )
    if (currentTodo){
      setEditTodo(currentTodo.text)
    }else{
      setEditTodo("")
    }
    
  }

  return (
    <div className="p-4 sm:p-6 space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-gradient-to-r from-cyan-500 to-cyan-800 rounded-xl shadow-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          
          <div className="flex items-center gap-3">
            {editId !== todo.id && (
              <input
                onChange={() => completeFunc(todo.id)}
                type="checkbox"
                checked={todo.completed}
                className="w-5 h-5 accent-fuchsia-700"
              />
            )}

            {editId === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditTodo(e.target.value)}
                value={editTodo}
                className="text-lg sm:text-xl font-semibold text-black bg-white px-2 py-1 rounded"
              />
            ) : (
              <h1 className="text-lg sm:text-xl font-semibold text-stone-800">
                {todo.text}
              </h1>
            )}
          </div>

          
          <div className="flex gap-2 mt-3 sm:mt-0">
            {editId === todo.id ? (
              <button
              id="btn"
                className="bg-cyan-900 px-4 py-2 rounded-lg font-bold text-fuchsia-100 hover:bg-cyan-600 transition"
                onClick={() => {
                  console.log(editTodo);
                  if ( typeof editTodo === "string" && editTodo.trim()){
                  updateFunc(editId, editTodo);
                  setEditId(null);
                  setEditTodo("");
                }}}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-cyan-900 px-4 py-2 rounded-lg font-bold text-fuchsia-100 hover:bg-cyan-600 transition"
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </button>
            )}

            <button
              className="bg-cyan-900 px-4 py-2 rounded-lg font-bold text-fuchsia-100 hover:bg-cyan-600 transition"
              onClick={() => deleteFunc(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoItem;
