import React from 'react';
import api from '../api';

function TodoItem({ todo, onUpdate, onDelete, onOpen }) {
  // toggle completed checkbox
  const toggleComplete = async () => {
    const res = await api.put(`/${todo._id}`, { completed: !todo.completed });
    onUpdate(res.data);
  };

  const deleteTodo = async () => {
    if (window.confirm('Delete this todo?')) {
      await api.delete(`/${todo._id}`);
      onDelete(todo._id);
    }
  };

  const priorityClass = `priority ${todo.priority}`;

  return (
    <li className={`todo-item ${todo.completed ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
      />

      <div className="todo-content" onClick={onOpen}>
        <span className="todo-title">{todo.title}</span>
        <span className={`status-badge ${todo.completed ? 'status-completed' : 'status-active'}`}>
          {todo.completed ? '✓ Completed' : '⚡ Active'}
        </span>
        <span className={priorityClass}>{todo.priority}</span>
        {todo.dueDate && (
          <span className="due-date">
            📅 {new Date(todo.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <button className="btn-view" onClick={onOpen} title="View details">👁</button>
      <button className="btn-delete" onClick={deleteTodo} title="Delete">🗑</button>
    </li>
  );
}

export default TodoItem;
