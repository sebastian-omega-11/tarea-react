import React from 'react';
import { useTema } from './TemaContext';

const ComponenteHijo = () => {
  const { tema, toggleTema } = useTema();

  return (
    <div
      style={{
        backgroundColor: tema === 'claro' ? '#fff' : '#333',
        color: tema === 'claro' ? '#000' : '#fff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <h1>{tema === 'claro' ? 'Modo Claro' : 'Modo Oscuro'}</h1>
      <button
        onClick={toggleTema}
        style={{
          padding: '10px 20px',
          border: 'none',
          backgroundColor: tema === 'claro' ? '#007BFF' : '#444',
          color: '#fff',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Cambiar Tema
      </button>
    </div>
  );
};

export default ComponenteHijo;
