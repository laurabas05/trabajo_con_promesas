const fs = require('fs').promises;

const FICHERO = './datos.json';

// funcion para leer el fichero y convertirlo a objeto
function leerFichero() {
    return fs.readFile(FICHERO, 'utf8')
        .then(texto => JSON.parse(texto));
}