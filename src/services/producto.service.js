const productoRepository = require('../repositories/producto.repository');
const HttpError = require('../utils/http-error');

const validarId = (id) => {
    const numero = Number(id);
    if (!Number.isInteger(numero) || numero <= 0) throw new HttpError(400, 'El id debe ser un entero positivo');
    return numero;
};

const listar = () => productoRepository.findAll();

const buscarPorNombre = (nombre) => {
    if (typeof nombre !== 'string' || !nombre.trim() || nombre.trim().length > 100) {
        throw new HttpError(400, 'nombre debe ser un texto de entre 1 y 100 caracteres');
    }
    return productoRepository.findByNombre(nombre.trim());
};

const obtenerPorId = async (id) => {
    const producto = await productoRepository.findById(validarId(id));
    if (!producto) throw new HttpError(404, 'Producto no encontrado');
    return producto;
};

const crear = (datos) => productoRepository.create(datos);

// Actualización parcial: los campos que no se envían conservan su valor actual
const actualizar = async (id, datos) => {
    const actual = await obtenerPorId(id);
    return productoRepository.update(actual.id, {
        nombre: datos.nombre ?? actual.nombre,
        precio: datos.precio ?? actual.precio,
        stock: datos.stock ?? actual.stock,
    });
};

const eliminar = async (id) => {
    const eliminado = await productoRepository.remove(validarId(id));
    if (!eliminado) throw new HttpError(404, 'Producto no encontrado');
};

module.exports = { listar, buscarPorNombre, obtenerPorId, crear, actualizar, eliminar };
