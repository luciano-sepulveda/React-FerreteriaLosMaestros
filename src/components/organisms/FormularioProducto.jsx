import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { CATEGORIAS } from '../../data/productos';
import { validarRequerido } from '../../utils/validaciones';

const FormularioProducto = ({
  productoAEditar = null,
  alGuardar,
  alCancelar
}) => {
  const [datos, setDatos] = useState({
    codigo: '',
    nombre: '',
    categoria: CATEGORIAS[0] || 'Materiales de construcción',
    subcategoria: '',
    marca: '',
    unidad: 'Unidad',
    precioCompra: '',
    precioVenta: '',
    stock: '',
    stockMinimo: '10',
    descripcion: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoAEditar) {
      setDatos({
        codigo: productoAEditar.codigo || '',
        nombre: productoAEditar.nombre || '',
        categoria: productoAEditar.categoria || CATEGORIAS[0],
        subcategoria: productoAEditar.subcategoria || '',
        marca: productoAEditar.marca || '',
        unidad: productoAEditar.unidad || 'Unidad',
        precioCompra: productoAEditar.precioCompra || '',
        precioVenta: productoAEditar.precioVenta || '',
        stock: productoAEditar.stock || '',
        stockMinimo: productoAEditar.stockMinimo || '10',
        descripcion: productoAEditar.descripcion || ''
      });
    }
  }, [productoAEditar]);

  const manejarCambio = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) {
      setErrores((prev) => ({ ...prev, [campo]: '' }));
    }
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!datos.codigo.trim()) nuevosErrores.codigo = 'El código es obligatorio (ej: MAT-003).';
    if (!datos.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!datos.marca.trim()) nuevosErrores.marca = 'La marca es obligatoria.';
    if (!datos.precioVenta || Number(datos.precioVenta) <= 0) {
      nuevosErrores.precioVenta = 'Ingresa un precio de venta válido mayor a 0.';
    }
    if (datos.stock === '' || Number(datos.stock) < 0) {
      nuevosErrores.stock = 'El stock debe ser un número igual o mayor a 0.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) return;

    if (alGuardar) {
      alGuardar({
        ...datos,
        precioCompra: Number(datos.precioCompra) || 0,
        precioVenta: Number(datos.precioVenta),
        stock: Number(datos.stock),
        stockMinimo: Number(datos.stockMinimo) || 5
      });
    }
  };

  return (
    <Form onSubmit={manejarEnvio} noValidate className="p-4 bg-white rounded-4 shadow-sm border">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h5 className="fw-bold text-dark mb-0">
          {productoAEditar ? `✏️ Editar Producto: ${productoAEditar.codigo}` : '➕ Nuevo Producto para Bodega'}
        </h5>
        {alCancelar && (
          <button type="button" className="btn-close" aria-label="Cerrar" onClick={alCancelar}></button>
        )}
      </div>

      <Row>
        <Col md={4}>
          <CampoFormulario
            etiqueta="Código de Producto *"
            marcador="Ej: MAT-015"
            valor={datos.codigo}
            alCambiar={(e) => manejarCambio('codigo', e.target.value)}
            error={errores.codigo}
          />
        </Col>
        <Col md={8}>
          <CampoFormulario
            etiqueta="Nombre del Producto *"
            marcador="Ej: Yeso Cartón Volcanita 10mm"
            valor={datos.nombre}
            alCambiar={(e) => manejarCambio('nombre', e.target.value)}
            error={errores.nombre}
          />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold small">Categoría *</Form.Label>
            <Form.Select
              value={datos.categoria}
              onChange={(e) => manejarCambio('categoria', e.target.value)}
              className="py-2"
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <CampoFormulario
            etiqueta="Subcategoría"
            marcador="Ej: Placas y Tabiquería"
            valor={datos.subcategoria}
            alCambiar={(e) => manejarCambio('subcategoria', e.target.value)}
          />
        </Col>
        <Col md={4}>
          <CampoFormulario
            etiqueta="Marca *"
            marcador="Ej: Volcán, Stanley, Arauco"
            valor={datos.marca}
            alCambiar={(e) => manejarCambio('marca', e.target.value)}
            error={errores.marca}
          />
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <CampoFormulario
            etiqueta="Unidad de Medida"
            marcador="Ej: Saco 25kg, Plancha"
            valor={datos.unidad}
            alCambiar={(e) => manejarCambio('unidad', e.target.value)}
          />
        </Col>
        <Col md={3}>
          <CampoFormulario
            tipo="number"
            etiqueta="Precio Venta (IVA inc.) *"
            marcador="Ej: 8990"
            valor={datos.precioVenta}
            alCambiar={(e) => manejarCambio('precioVenta', e.target.value)}
            error={errores.precioVenta}
          />
        </Col>
        <Col md={3}>
          <CampoFormulario
            tipo="number"
            etiqueta="Stock Actual *"
            marcador="Ej: 50"
            valor={datos.stock}
            alCambiar={(e) => manejarCambio('stock', e.target.value)}
            error={errores.stock}
          />
        </Col>
        <Col md={3}>
          <CampoFormulario
            tipo="number"
            etiqueta="Stock Mínimo (Alerta)"
            marcador="Ej: 15"
            valor={datos.stockMinimo}
            alCambiar={(e) => manejarCambio('stockMinimo', e.target.value)}
          />
        </Col>
      </Row>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold small">Descripción Técnica y Usos</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Especificaciones de resistencia, dimensiones o normas SEC / NCh aplicables..."
          value={datos.descripcion}
          onChange={(e) => manejarCambio('descripcion', e.target.value)}
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        {alCancelar && (
          <Boton
            texto="Cancelar"
            variante="outline-secondary"
            alHacerClic={alCancelar}
            claseAdicional="px-4"
          />
        )}
        <div style={{ minWidth: '180px' }}>
          <Boton
            tipo="submit"
            texto={productoAEditar ? 'Guardar Cambios' : 'Crear Producto'}
            variante="warning"
          />
        </div>
      </div>
    </Form>
  );
};

export default FormularioProducto;
