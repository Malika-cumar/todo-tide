import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import Strike from "./Strike";
import Quotes from "./quotes.js";
function AddBar() {
  const [todos, setTodos] = useState(() => {
    let saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputVal, setInputVal] = useState("");
  const [strike, setStrike] = useState(0);
  const [quote, setQuote] = useState("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleDelete(deleteId) {
    let deleted = todos.filter(
      (todo)=>{
 return todo.id !== deleteId;
      }
    )
   setTodos(deleted)
  }

  function handleQuote() {
    const num = Math.floor(Math.random() * Quotes.length);
    return setTimeout(() => {
      setQuote(Quotes[num])
      setTimeout(()=> setQuote(""), 4000)
    }, 2000);
  }
  function handleComplete(id) {
    const todo = todos.find((todo) => todo.id === id );
    if (!todo.completed) {
      setStrike((prev) => prev + 1);
      handleDelete(id);
      handleQuote();
    }
  }

  function handleUpdate(editId, editTodo) {
    let updated = todos.map((todo) =>
      todo.id === editId ? { ...todo, text: editTodo } : todo
    );
    setTodos(updated);
  }

  function addTodo(newTodo) {
    if (newTodo.trim()) {
      setTodos([...todos, { id:Date.now(), text: newTodo, completed: false }]);
    }
    setInputVal("");
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-stone-700 to-stone-900 p-4 rounded-xl shadow-md">
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          type="text"
          name="add"
          id="add"
          placeholder="Add Task"
          className="bg-white text-black p-3 rounded-lg w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          onClick={() => addTodo(inputVal)}
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-lg w-full sm:w-auto transition"
        >
          Add
        </button>
      </div>
      <TodoItem
        todos={todos}
        deleteFunc={handleDelete}
        updateFunc={handleUpdate}
        completeFunc={handleComplete}
      />
      <Strike strike={strike} quote={quote} />
    </div>
  );
}

export default AddBar;
