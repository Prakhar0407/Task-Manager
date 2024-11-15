import React from 'react';

const TodoForm = ({ taskValue, onTaskChange, dateValue, onDateChange, priorityValue, onPriorityChange, onAdd }) => (
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
    <select
      className="input input-bordered input-secondary"
      value={priorityValue}
      onChange={onPriorityChange}
    >
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    <button className="btn btn-secondary" onClick={onAdd}>
      <i className="bx bx-plus bx-sm"></i>
    </button>
  </div>
);

export default TodoForm;
