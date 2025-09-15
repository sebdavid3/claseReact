import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener posts de la API
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Error al obtener los posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Función para obtener usuarios de la API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPosts(), fetchUsers()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Función para obtener el nombre del usuario por ID
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Usuario desconocido';
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>Cargando datos...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error">
          <h2>Error: {error}</h2>
          <button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Posts de JSONPlaceholder</h1>
        <p>Datos obtenidos de: https://jsonplaceholder.typicode.com/</p>
      </header>
      
      <main className="posts-container">
        <h2>Posts ({posts.length})</h2>
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p className="post-body">{post.body}</p>
              <div className="post-meta">
                <span className="post-id">ID: {post.id}</span>
                <span className="post-author">Autor: {getUserName(post.userId)}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;