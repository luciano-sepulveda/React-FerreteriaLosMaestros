import { useState } from 'react';
import { SesionContext } from './SesionContexto';

const CLAVE_USUARIO_ACTIVO = 'usuario_activo';

export function SesionProvider(props) {
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_USUARIO_ACTIVO);
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

  const iniciarSesion = (usuario) => {
    setUsuarioActivo(usuario);
    try {
      localStorage.setItem(CLAVE_USUARIO_ACTIVO, JSON.stringify(usuario));
    } catch {
      return null;
    }
  };

  const cerrarSesion = () => {
    setUsuarioActivo(null);
    try {
      localStorage.removeItem(CLAVE_USUARIO_ACTIVO);
    } catch {
      return null;
    }
  };

  return (
    <SesionContext.Provider
      value={{
        usuarioActivo,
        iniciarSesion,
        cerrarSesion
      }}
    >
      {props.children}
    </SesionContext.Provider>
  );
}
