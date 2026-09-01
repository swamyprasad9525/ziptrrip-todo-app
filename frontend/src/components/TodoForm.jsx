import React, { useState } from 'react';
import api from '../api';

function TodoForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const res = await api.post('/', {
        title,
        description,
        priority,
        dueDate: dueDate || null,
      });
      onCreated(res.data);
      // reset the form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setError('');
    } catch (err) {
      console.error('Add Todo error:', err);
      const msg = err.response?.data?.message || err.message || 'Something went wrong. Please check your backend connection.';
      setError(msg);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="2"
      />
      <div className="form-row">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <div className="date-wrapper">
          <input
            type="date"
            value={dueDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDueDate(e.target.value)}
            className="attractive-date"
          />
        </div>
        <button type="submit" className="btn-add">Add Todo</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TodoForm;
