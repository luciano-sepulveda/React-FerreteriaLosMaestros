import React, { createContext, useState, useEffect, useContext } from 'react';

export const CarritoContext = createContext();

const CLAVE_ALMACENAMIENTO = 'ferreteria_los_maestros_carrito';

export const CarritoProvider = ({ children }) => {
  const [elementosCarrito, setElementosCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.error('Error al cargar carrito desde almacenamiento local:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(elementosCarrito));
    } catch (error) {
      console.error('Error al guardar carrito en almacenamiento local:', error);
    }
  }, [elementosCarrito]);

  // Agregar producto al carrito o incrementar su cantidad
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

  // Modificar cantidad exacta de un producto
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

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (idProducto) => {
    setElementosCarrito((elementosPrevios) =>
      elementosPrevios.filter((item) => item.producto.id !== idProducto)
    );
  };

  // Vaciar completamente el carrito
  const vaciarCarrito = () => {
    setElementosCarrito([]);
  };

  // Cálculos de totales financieros
  const cantidadTotalArticulos = elementosCarrito.reduce(
    (acumulador, item) => acumulador + item.cantidad,
    0
  );

  const totalPagar = elementosCarrito.reduce(
    (acumulador, item) => acumulador + item.subtotal,
    0
  );

  // En Chile el IVA es 19% incluido en el precio de venta final
  // Subtotal Neto = Total / 1.19
  // IVA = Total - Subtotal Neto
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

export const useCarrito = () => {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error('useCarrito debe ser utilizado dentro de un CarritoProvider');
  }
  return contexto;
};

export default CarritoContext;
