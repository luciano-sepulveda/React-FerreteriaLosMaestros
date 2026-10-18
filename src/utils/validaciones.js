// Funciones puras de validación en español (Guía 14, páginas 19-20)
// "Reciben un valor y devuelven un mensaje de error, o texto vacío si está bien.
// No tocan la pantalla ni el estado. Se pueden probar solas con pruebas unitarias."

/**
 * Valida un correo electrónico.
 * @param {string} correo 
 * @returns {string} Mensaje de error o '' si es válido
 */
export function validarCorreo(correo) {
  if (!correo || correo.trim() === '') {
    return 'El correo electrónico es obligatorio.';
  }
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patronCorreo.test(correo.trim())) {
    return 'Ingresa un correo electrónico válido (ej: usuario@dominio.cl).';
  }
  return '';
}

/**
 * Valida la contraseña para inicio de sesión.
 * @param {string} clave 
 * @returns {string} Mensaje de error o '' si es válido
 */
export function validarClave(clave) {
  if (!clave || clave.trim() === '') {
    return 'La contraseña es obligatoria.';
  }
  if (clave.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  return '';
}

/**
 * Valida campos de texto requeridos genéricos.
 * @param {string} valor 
 * @param {string} nombreCampo 
 * @returns {string} Mensaje de error o '' si es válido
 */
export function validarRequerido(valor, nombreCampo = 'Este campo') {
  if (!valor || valor.trim() === '') {
    return `${nombreCampo} es obligatorio.`;
  }
  return '';
}

/**
 * Valida un RUT o cédula chilena.
 * @param {string} rut
 * @returns {string} Mensaje de error o '' si es válido
 */
export function validarRut(rut) {
  if (!rut || rut.trim() === '') {
    return 'El RUT es obligatorio.';
  }
  const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').trim();
  if (rutLimpio.length < 8 || rutLimpio.length > 9) {
    return 'El RUT debe tener entre 8 y 9 dígitos (ej: 12345678-9).';
  }
  return '';
}

// Alias de retrocompatibilidad
export const validarEmail = validarCorreo;
