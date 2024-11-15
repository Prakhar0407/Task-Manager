import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleStatus, onEdit }) => (
  <tr className="todo-item" data-id={todo.id}>
    <td>{todo.task}</td>
    <td>{todo.dueDate}</td>
    <td>{todo.status}</td>
    <td>
      <button className="btn btn-warning btn-sm" onClick={() => onEdit(todo.id)}>
        <i className="bx bx-edit-alt bx-bx-xs"></i>
      </button>
      <button className="btn btn-success btn-sm" onClick={() => onToggleStatus(todo.id)}>
        <i className="bx bx-check bx-xs"></i>
      </button>
      <button className="btn btn-error btn-sm" onClick={() => onDelete(todo.id)}>
        <i className="bx bx-trash bx-xs"></i>
      </button>
    </td>
  </tr>
);

export default TodoItem;
