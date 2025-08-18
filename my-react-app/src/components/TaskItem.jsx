import React from 'react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={onToggle}>{task.title}</span>
      <button onClick={onDelete}>❌</button>
    </li>
  );
}
