import React, { useState } from 'react';
import './FormularioContacto.css';  // Asegúrate de tener el archivo CSS importado

const FormularioContacto = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Nombre:', nombre);
    console.log('Correo:', correo);
    console.log('Mensaje:', mensaje);
    setEnviado(true);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Formulario de Contacto</h2>
      <form onSubmit={manejarEnvio} className="form">
        <div className="form-field">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label className="form-label">Mensaje</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            rows="4"
            className="form-textarea"
          />
        </div>
        <button type="submit" className="form-button">Enviar</button>
      </form>

      {enviado && (
        <div className="form-response">
          <h3>Datos enviados:</h3>
          <p><strong>Nombre:</strong> {nombre}</p>
          <p><strong>Correo:</strong> {correo}</p>
          <p><strong>Mensaje:</strong> {mensaje}</p>
        </div>
      )}
    </div>
  );
};

export default FormularioContacto;
