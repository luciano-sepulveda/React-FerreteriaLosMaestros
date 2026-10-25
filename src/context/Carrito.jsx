import { useState, useEffect } from 'react';
import { CarritoContext } from './CarritoContexto';

const CLAVE_ALMACENAMIENTO = 'ferreteria_los_maestros_carrito';

export const CarritoProvider = ({ children }) => {
  const [elementosCarrito, setElementosCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(elementosCarrito));
    } catch {
      return;
    }
  }, [elementosCarrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    if (!producto || cantidad <= 0) return;

    setElementosCarrito((elementosPrevios) => {
      const indiceExistente = elementosPrevios.findIndex(
        (item) => item.producto.id === producto.id
      );

      if (indiceExistente >= 0) {
        const itemActual = elementosPrevios[indiceExistente];
        const nuevaCantidad = Math.min(
          itemActual.cantidad + cantidad,
          producto.stock || 999
        );
        const listaActualizada = [...elementosPrevios];
        listaActualizada[indiceExistente] = {
          ...itemActual,
          cantidad: nuevaCantidad,
          subtotal: nuevaCantidad * producto.precioVenta
        };
        return listaActualizada;
      }

      const cantidadValida = Math.min(cantidad, producto.stock || 999);
      const nuevoElemento = {
        producto,
        cantidad: cantidadValida,
        subtotal: cantidadValida * producto.precioVenta
      };
      return [...elementosPrevios, nuevoElemento];
    });
  };

  const actualizarCantidad = (idProducto, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(idProducto);
      return;
    }

    setElementosCarrito((elementosPrevios) =>
      elementosPrevios.map((item) => {
        if (item.producto.id === idProducto) {
          const cantidadAjustada = Math.min(
            nuevaCantidad,
            item.producto.stock || 999
          );
          return {
            ...item,
            cantidad: cantidadAjustada,
            subtotal: cantidadAjustada * item.producto.precioVenta
          };
        }
        return item;
      })
    );
  };

  const eliminarDelCarrito = (idProducto) => {
    setElementosCarrito((elementosPrevios) =>
      elementosPrevios.filter((item) => item.producto.id !== idProducto)
    );
  };

  const vaciarCarrito = () => {
    setElementosCarrito([]);
  };

  const cantidadTotalArticulos = elementosCarrito.reduce(
    (acumulador, item) => acumulador + item.cantidad,
    0
  );

  const totalPagar = elementosCarrito.reduce(
    (acumulador, item) => acumulador + item.subtotal,
    0
  );

  const subtotalNeto = Math.round(totalPagar / 1.19);
  const montoIva = totalPagar - subtotalNeto;

  return (
    <CarritoContext.Provider
      value={{
        elementosCarrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadTotalArticulos,
        subtotalNeto,
        montoIva,
        totalPagar
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
