const fs = require('fs').promises;

const FICHERO = './datos.json';

// funcion para leer el fichero y convertirlo a objeto
function leerDatos() {
    return fs.readFile(FICHERO, 'utf8')
        .then(texto => JSON.parse(texto));
}

// funcion para guardar el objeto en el fichero
function guardarDatos(datos) {
    return fs.writeFile(FICHERO, JSON.stringify(datos, null, 2));
}