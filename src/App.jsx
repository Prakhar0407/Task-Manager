import React, { useState, useEffect } from 'react';
import './App.css';
import { TodoManager } from './utils/TodoManager';
import { TodoItemFormatter } from './utils/TodoItemFormatter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const todoItemFormatter = new TodoItemFormatter();
  const todoManager = new TodoManager(todoItemFormatter);

  const [todos, setTodos] = useState(todoManager.filterTodos("all"));
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false); // New state to track editing
  const [editingId, setEditingId] = useState(null); // New state to track the ID of the task being edited

  useEffect(() => {
    setTodos(todoManager.filterTodos("all"));
  }, [todoManager]);

  const handleAddTodo = () => {
    if (!task) return;
    todoManager.addTodo(task, dueDate, priority);
    setTodos(todoManager.filterTodos("all"));
    setTask("");
    setDueDate("");
    setPriority("Medium");
  };

  const handleEditTodo = (id) => {
    const todo = todoManager.todos.find((t) => t.id === id);
    if (todo) {
      setTask(todo.task);
      setDueDate(todo.dueDate);
      setPriority(todo.priority);
      setEditMode(true);
      setEditingId(id);
    }
  };

  const handleUpdateTodo = () => {
    if (!task || !editingId) return;

    const updatedTodo = {
      id: editingId,
      task: todoItemFormatter.formatTask(task),
      dueDate: todoItemFormatter.formatDueDate(dueDate),
      priority,
      completed: todos.find((t) => t.id === editingId)?.completed || false,
      status: todos.find((t) => t.id === editingId)?.completed ? "Completed" : "Pending",
    };

    // Update the todo in the manager
    const updatedTodos = todos.map((t) =>
      t.id === editingId ? updatedTodo : t
    );
    setTodos(updatedTodos);
    todoManager.todos = updatedTodos;
    todoManager.saveToLocalStorage();

    // Reset states
    setTask("");
    setDueDate("");
    setPriority("Medium");
    setEditMode(false);
    setEditingId(null);
  };

  const handleDeleteTodo = (id) => {
    todoManager.deleteTodo(id);
    setTodos(todoManager.filterTodos("all"));
  };

  const handleToggleStatus = (id) => {
    todoManager.toggleTodoStatus(id);
    setTodos(todoManager.filterTodos("all"));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <TodoForm
          taskValue={task}
          onTaskChange={(e) => setTask(e.target.value)}
          dateValue={dueDate}
          onDateChange={(e) => setDueDate(e.target.value)}
          priorityValue={priority}
          onPriorityChange={(e) => setPriority(e.target.value)}
          onAdd={editMode ? handleUpdateTodo : handleAddTodo}
        />
        {editMode && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              setTask("");
              setDueDate("");
              setPriority("Medium");
              setEditMode(false);
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="todos-filter">
        <button
          className="btn btn-secondary"
          onClick={() => setTodos(todoManager.filterTodos("all"))}
        >
          All
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setTodos(todoManager.filterTodos("pending"))}
        >
          Pending
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setTodos(todoManager.filterTodos("completed"))}
        >
          Completed
        </button>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Task</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <TodoList
            todos={filteredTodos}
            onDelete={handleDeleteTodo}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEditTodo}
          />
        </tbody>
      </table>
    </div>
  );
};

export default App;
