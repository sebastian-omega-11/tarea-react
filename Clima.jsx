import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clima = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const apiKey = 'a99d25618a4db77957f2570a59d99d6f'; // API Key válida
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Medellin&appid=${apiKey}&units=metric&lang=es`;

        const respuesta = await axios.get(url);
        const temp = respuesta.data.main.temp;
        const desc = respuesta.data.weather[0].description;

        setTemperatura(temp);
        setDescripcion(desc);
      } catch (err) {
        setError('No se pudo obtener el clima');
        console.error(err);
      }
    };

    obtenerClima();
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Clima en Medellín</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : temperatura !== null ? (
        <div>
          <p>Temperatura actual: {temperatura}°C</p>
          <p>Condición: {descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Clima;
