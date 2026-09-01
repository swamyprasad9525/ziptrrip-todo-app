import React, { useState, useEffect } from 'react';
import api from '../api';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

function TodosList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all todos from backend on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/');
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Stats for top bar calculated across all todos
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  // Filter and search todos client-side for instant updates
  const filteredTodos = todos.filter((todo) => {
    // Status filter
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      const matchTitle = todo.title.toLowerCase().includes(query);
      const matchDesc = todo.description ? todo.description.toLowerCase().includes(query) : false;
      return matchTitle || matchDesc;
    }

    return true;
  });

  return (
    <div className="todos-page">
      {/* quick stats */}
      <div className="stats-bar">
        <div className={`stat ${filter === 'all' ? 'active-stat' : ''}`} onClick={() => setFilter('all')} style={{cursor: 'pointer'}}>
          <span className="stat-num">{totalCount}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className={`stat ${filter === 'active' ? 'active-stat' : ''}`} onClick={() => setFilter('active')} style={{cursor: 'pointer'}}>
          <span className="stat-num active-color">{activeCount}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className={`stat ${filter === 'completed' ? 'active-stat' : ''}`} onClick={() => setFilter('completed')} style={{cursor: 'pointer'}}>
          <span className="stat-num done-color">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {/* add new todo form */}
      <TodoForm onCreated={(newTodo) => setTodos([newTodo, ...todos])} />

      {/* search + filter bar */}
      <div className="toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({totalCount})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {/* todo list */}
      {loading ? (
        <p className="empty">Loading todos...</p>
      ) : filteredTodos.length === 0 ? (
        <p className="empty">No {filter !== 'all' ? filter : ''} todos found. {filter === 'all' ? 'Add one above! ☝️' : ''}</p>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
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
