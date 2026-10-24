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

export function validarClave(clave) {
  if (!clave || clave.trim() === '') {
    return 'La contraseña es obligatoria.';
  }
  if (clave.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  return '';
}

export function validarRequerido(valor, nombreCampo = 'Este campo') {
  if (!valor || valor.trim() === '') {
    return `${nombreCampo} es obligatorio.`;
  }
  return '';
}

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

export const validarEmail = validarCorreo;
