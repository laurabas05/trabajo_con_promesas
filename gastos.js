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
        return datos[usuario];
    });
}

// funcion q añade un gasto a un usuario
function anyadirGastoUsuario(usuario, gasto) {
    return leerDatos().then(datos => {
        // si el usuario no existe, se crea
        if (!datos[usuario]) {
            datos[usuario] = [];
        }
        
        // si el gasto no tiene id, se genera uno
        if (!gasto.id) {
            gasto.id = Date.now().toString();
        }

        datos[usuario].push(gasto);

        return guardarDatos(datos).then(() => gasto);
    });
}

// funcion q actualiza un gasto de un usuario mediante id del gasto
function actualizarGastoUsuario(usuario, gastoId, nuevosDatos) {
    return leerDatos().then(datos => {

        const lista = datos[usuario];
        if (!lista) {
            throw new Error('El usuario no existe');
        }

        const gasto = lista.find(g => g.id == gastoId);
        if (!gasto) {
            throw new Error('El gasto no existe');
        }

        // se actualiza solo lo q se pasa
        Object.assign(gasto, nuevosDatos);

        return guardarDatos(datos).then(() => gasto);
    });
}

// funcion q borra un gasto de un usuario mediante id del gasto
function borrarGastoUsuario(usuario, gastoId) {
    return leerDatos().then(datos => {
        
        const lista = datos[usuario];
        if (!lista) {
            throw new Error('El usuario no existe');
        }

        const indice = lista.findIndex(g => g.id == gastoId);
        if (indice === -1) {
            throw new Error('El gasto no existe');
        }

        const eliminado = lista.splice(indice, 1)[0];

        return guardarDatos(datos).then(() => eliminado);
    });
}