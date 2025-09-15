import { useState, useEffect } from 'react';

function MiComponente() {
  const [datos, setDatos] = useState([]);

  // Se ejecuta cuando el componente se monta
  useEffect(() => {
    console.log('¡El componente se montó!');
    // Aquí podemos hacer llamadas a APIs
  }, []); // Array vacío = solo una vez

  return <div>Mi componente</div>;
}