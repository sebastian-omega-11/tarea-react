// src/components/BusquedaUsuario.jsx
import { useEffect, useState } from 'react';

function BusquedaUsuario() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${query}`,
          {
            signal: controller.signal
          }
        );
        const data = await response.json();
        setResults(data.items || []);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error en la búsqueda:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Buscar usuarios en Github</h2>
      <input
        type="text"
        placeholder="Escribe al menos 3 caracteres"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
      />
      {loading && <p>Cargando...</p>}
      <ul style={{ margin: '1rem' }}>
        {results.map(user => (
          <li key={user.id} style={{ marginBottom: '0.5rem' }}>
            <img
              src={user.avatar_url}
              alt={user.login}
              width={30}
              style={{ marginRight: '8px' }}
            />
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusquedaUsuario;
