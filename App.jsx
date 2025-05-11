// App.jsx
import { useState } from 'react';
import BusquedaUsuario from './components/BusquedaUsuario';
import BusquedaMusica from './components/BusqudaMusica';
import Clima from './components/Clima'; // Asegúrate de que la ruta sea correcta
import FormularioContacto from './components/FormularioContacto';
import { TemaProvider } from './components/TemaContext';  
import ComponenteHijo from './components/ComponenteHijo'; 

import './App.css';

function App() {
  return (
    <>
    {/*<BusquedaUsuario /> */}
      {<Clima />}
      {/*<FormularioContacto />*/}
      {/* <BusquedaMusica /> */}
      {/*<TemaProvider>
      <div>
        <ComponenteHijo /> */} {/* Este es el componente que maneja el tema claro/oscuro */}
      {/*</div>
    </TemaProvider>*/}

    </>
  );
}

export default App;

 




