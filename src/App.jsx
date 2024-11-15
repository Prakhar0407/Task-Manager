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

  const handleDeleteTodo = (id) => {
    todoManager.deleteTodo(id);
    setTodos(todoManager.filterTodos("all"));
  };

  const handleToggleStatus = (id) => {
    todoManager.toggleTodoStatus(id);
    setTodos(todoManager.filterTodos("all"));
  };

  const handleEditTodo = (id) => {
    const todo = todoManager.todos.find((t) => t.id === id);
    if (todo) {
      setTask(todo.task);
      setDueDate(todo.dueDate);
      setPriority(todo.priority);
      todoManager.deleteTodo(id);
    }
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
          onAdd={handleAddTodo}
        />
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
