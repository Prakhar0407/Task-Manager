import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onToggleStatus, onEdit }) => {
  if (todos.length === 0) {
    return <tr><td colSpan="4" className="text-center">No tasks found</td></tr>;
  }

  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default TodoList;
