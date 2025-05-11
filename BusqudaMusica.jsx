// src/components/BusqudaMusica.jsx
import { useState, useEffect } from 'react';

function BusqudaMusica() {
  const [accessToken, setAccessToken] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cliente y Secret del Spotify
  const clientId = "708248e740e84ad7b0c6f2acf3e3d0ab"; // Tu clientId de Spotify
  const clientSecret = "bc2b6a4162d54861bc5e629d67c44cc8"; // Tu clientSecret de Spotify

  // Función para obtener el accessToken de Spotify
  const getAccessToken = async () => {
    const authToken = `${clientId}:${clientSecret}`;
    const encodedAuth = btoa(authToken); // Codificar como base64

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    setAccessToken(data.access_token);
  };

  // Llamamos a la función getAccessToken cuando el componente se monta
  useEffect(() => {
    getAccessToken();
  }, []);

  // Búsqueda en Spotify
  useEffect(() => {
    if (query.length < 3 || !accessToken) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const fetchSpotify = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,playlist&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            signal: controller.signal,
          }
        );
        const data = await response.json();
        const combinedResults = [
          ...(data.tracks?.items || []),
          ...(data.artists?.items || []),
          ...(data.playlists?.items || []),
        ];
        setResults(combinedResults);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error en la búsqueda:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSpotify, 500); // debounce

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query, accessToken]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Buscar en Spotify</h2>
      <input
        type="text"
        placeholder="Escribe al menos 3 caracteres"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
      />
      {loading && <p>Cargando...</p>}
      <ul style={{ marginTop: '1rem' }}>
        {results.map(item => (
          <li key={item.id} style={{ marginBottom: '0.5rem' }}>
            {item.images?.[0]?.url && (
              <img src={item.images[0].url} alt={item.name} width={30} style={{ marginRight: '8px' }} />
            )}
            <a href={item.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
            {item.type && <span style={{ marginLeft: '8px', fontSize: '0.8rem' }}>({item.type})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusqudaMusica;
