import React, { useState, useEffect } from 'react';
import api from '../api';

function TodoDetail() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/${id}`);
      setTodo(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setPriority(res.data.priority);
      setCompleted(res.data.completed || false);
      setDueDate(res.data.dueDate ? res.data.dueDate.slice(0, 10) : '');
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/${id}`, {
        title,
        description,
        priority,
        completed,
        dueDate: dueDate || null,
      });
      setTodo(res.data);
      setEditing(false);
    } catch (err) {
      alert('Failed to update todo');
    }
  };

  const deleteTodo = async () => {
    if (window.confirm('Delete this todo?')) {
      await api.delete(`/${id}`);
      window.location.href = '/'; 
    }
  };

  const toggleStatus = async () => {
    try {
      const res = await api.put(`/${id}`, { completed: !todo.completed });
      setTodo(res.data);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (notFound) return <p>Todo not found. <a href="/">Go back</a></p>;

  return (
    <div className="todo-detail">
      <a href="/" className="back-link">← Back to all todos</a>

      {editing ? (
        <form className="todo-form edit-form" onSubmit={saveChanges}>
          <div className="form-group">
            <label>Task Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select value={completed ? 'completed' : 'active'} onChange={(e) => setCompleted(e.target.value === 'completed')}>
                <option value="active">⚡ Active</option>
                <option value="completed">✓ Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Due Date</label>
              <div className="date-wrapper">
                <input
                  type="date"
                  value={dueDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="attractive-date"
                />
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <button type="submit" className="btn-save">Save Changes</button>
            <button type="button" className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="detail-header">
            <h2 className={todo.completed ? 'done-title' : ''}>{todo.title}</h2>
            <button 
              className={`status-toggle ${todo.completed ? 'completed' : 'active'}`}
              onClick={toggleStatus}
            >
              {todo.completed ? '✓ Mark as Active' : '○ Mark as Completed'}
            </button>
          </div>
          
          {todo.description && <p className="detail-desc">{todo.description}</p>}

          <div className="detail-meta">
            <p><strong>Status:</strong> {todo.completed ? '✅ Completed' : '⏳ Pending'}</p>
            <p><strong>Priority:</strong> <span className={`priority ${todo.priority}`}>{todo.priority}</span></p>
            {todo.dueDate && (
              <p><strong>Due date:</strong> {new Date(todo.dueDate).toLocaleDateString()}</p>
            )}
            <p><strong>Created:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
            <p><strong>Last updated:</strong> {new Date(todo.updatedAt).toLocaleString()}</p>
          </div>

          <div className="detail-actions">
            <button onClick={() => setEditing(true)} className="btn-edit">✏️ Edit</button>
            <button className="detail-btn-delete" onClick={deleteTodo}>🗑️ Delete Todo</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoDetail;
