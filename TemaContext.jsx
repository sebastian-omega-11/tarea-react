import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const TemaContext = createContext();

// Proveedor del contexto
export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState('claro'); // Tema por defecto es "claro"

  const toggleTema = () => {
    setTema((prevTema) => (prevTema === 'claro' ? 'oscuro' : 'claro'));
  };

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
};

// Hook para consumir el contexto fácilmente
export const useTema = () => {
  return useContext(TemaContext);
};
