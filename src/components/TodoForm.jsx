import React from 'react';

const TodoForm = ({ taskValue, onTaskChange, dateValue, onDateChange, onAdd }) => (
  <div className="input-section">
    <input
      type="text"
      placeholder="Add a task . . ."
      className="input input-bordered input-secondary"
      value={taskValue}
      onChange={onTaskChange}
    />
    <input
      type="date"
      className="input input-bordered input-secondary"
      value={dateValue}
      onChange={onDateChange}
    />
    <button className="btn btn-secondary" onClick={onAdd}>
      <i className="bx bx-plus bx-sm"></i>
    </button>
  </div>
);

export default TodoForm;
