import React, { useState, useEffect } from 'react';
import api from '../api';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

function TodosList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // stats for the top bar
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  // fetch todos from backend, re-fetch when filter changes
  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, [filter]);

  const fetchTodos = async (searchText = '') => {
    try {
      setLoading(true);
      const params = {};
      if (filter !== 'all') params.status = filter;
      if (searchText) params.search = searchText;

      const res = await api.get('/', { params });
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTodos(search);
  };

  return (
    <div className="todos-page">
      {/* quick stats */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-num">{todos.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-num active-color">{activeCount}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat">
          <span className="stat-num done-color">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {/* add new todo form */}
      <TodoForm onCreated={(newTodo) => setTodos([newTodo, ...todos])} />

      {/* search + filter bar */}
      <div className="toolbar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* todo list */}
      {loading ? (
        <p className="empty">Loading todos...</p>
      ) : todos.length === 0 ? (
        <p className="empty">No todos found. Add one above! </p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={(updated) =>
                setTodos(todos.map((t) => (t._id === updated._id ? updated : t)))
              }
              onDelete={(id) => setTodos(todos.filter((t) => t._id !== id))}
              onOpen={() => window.location.href = `/todo.html?id=${todo._id}`}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodosList;
