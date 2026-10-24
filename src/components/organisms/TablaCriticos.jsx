import { Table } from 'react-bootstrap';
import Boton from '../atoms/Boton';
import Etiqueta from '../atoms/Etiqueta';

const TablaCriticos = ({
  criticos = [],
  alReponerStock,
  modoCompacto = false
}) => {
  if (criticos.length === 0) {
    return (
      <div className="text-center py-4 text-success">
        <p className="fs-5 mb-0">✓ No hay productos en nivel crítico. Todo el inventario está sobre el mínimo.</p>
      </div>
    );
  }

  if (modoCompacto) {
    return (
      <div>
        <p className="text-muted small">
          Los siguientes productos han caído bajo el umbral mínimo de seguridad:
        </p>
        <div className="table-responsive">
          <Table hover className="small align-middle">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Stock</th>
                <th>Mínimo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {criticos.map((item) => (
                <tr key={item.id}>
                  <td><Etiqueta variante="light">{item.codigo}</Etiqueta></td>
                  <td className="fw-semibold">{item.nombre}</td>
                  <td><Etiqueta variante="danger">{item.stock}</Etiqueta></td>
                  <td>{item.stockMinimo}</td>
                  <td>
                    <Boton
                      variante="outline-success"
                      tamano="sm"
                      claseAdicional="py-0 px-2 w-auto"
                      alHacerClic={() => alReponerStock(item.id, item.stock)}
                      texto="+25 Reponer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table hover className="align-middle small">
        <thead className="table-light">
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th className="text-center">Stock Actual</th>
            <th className="text-center">Stock Mínimo</th>
            <th className="text-center">Déficit</th>
            <th className="text-end">Acción Rápida</th>
          </tr>
        </thead>
        <tbody>
          {criticos.map((prod) => (
            <tr key={prod.id}>
              <td><Etiqueta variante="light">{prod.codigo}</Etiqueta></td>
              <td className="fw-semibold">{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td className="text-center fw-bold text-danger">{prod.stock}</td>
              <td className="text-center text-muted">{prod.stockMinimo}</td>
              <td className="text-center text-danger fw-bold">
                -{Math.max(0, prod.stockMinimo - prod.stock)} u.
              </td>
              <td className="text-end">
                <Boton
                  variante="success"
                  tamano="sm"
                  claseAdicional="py-1 px-3 w-auto fw-bold"
                  alHacerClic={() => alReponerStock(prod.id, prod.stock)}
                  texto="📥 Reponer +25 u."
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaCriticos;
