const fs = require('fs').promises;

const FICHERO = './datos.json';

// funcion para leer el fichero y convertirlo a objeto js
function leerDatos() {
    return fs.readFile(FICHERO, 'utf8')
        .then(texto => JSON.parse(texto));
}

// funcion para guardar el objeto en el fichero
function guardarDatos(datos) {
    return fs.writeFile(FICHERO, JSON.stringify(datos, null, 2));
}

// funcion para obtener los gastos de un usuario
function obtenerGastosUsuario(usuario) {
    // se lee el contenido del fichero
    return leerDatos().then(datos => {
        // si el usuario no existe, se devuelve un array vacío
        if (!datos[usuario]) {
            return [];
        }
        return datos[usuario]
    })
}