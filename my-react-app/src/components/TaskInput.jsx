import React, { useState } from 'react';

export default function TaskInput({ onAdd }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
