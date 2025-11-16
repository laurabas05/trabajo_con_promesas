// Librería de acceso a datos

// Acceso a las funciones de lectura/escritura de ficheros en NodeJS en forma de promesas
// Las funciones a utilizar son:
// fs.readFile(RUTA_FICHERO) - Para leer el contenido de un fichero. Devuelve una promesa.
// fs.writeFile(RUTA_FICHERO, DATOS_EN_FORMATO_TEXTO) - Para escribir el contenido de un fichero. Devuelve una promesa.
import { promises as fs } from 'fs';

// Ruta del fichero de almacenamiento de datos
let ficheroDatos = "./datos.json";

// Para actualizar el fichero de datos en los tests
function cambiarFicheroDatos(nombre) {
    ficheroDatos = nombre;
}

// funcion para leer el fichero y convertirlo a objeto js
function leerDatos() {
    return fs.readFile(ficheroDatos, 'utf8')
        .then(texto => JSON.parse(texto));
}

// funcion para guardar el objeto en el fichero
function guardarDatos(datos) {
    return fs.writeFile(ficheroDatos, JSON.stringify(datos, null, 2));
}

// Debe devolver una promesa que cuando se resuelva devuelva el array de gastos del usuario
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

// Debe devolver una promesa. Cuando se resuelva se debe haber añadido un nuevo gasto al usuario
// y actualizado el fichero de datos
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

// Debe devolver una promesa. Cuando se resuelva se debe haber modificado el gasto del usuario
// y actualizado el fichero de datos
function actualizarGastoUsuario(usuario, gastoId, nuevosDatos) {

    return leerDatos().then(datos => {

        const lista = datos[usuario];
        if (!lista) {
            throw new Error('El usuario no existe');
        }

        const indiceGasto = lista.findIndex(g => g.id == gastoId);
        if (indiceGasto == -1) {
            throw new Error('El gasto no existe');
        }

        // objeto q solo contiene los nuevos datos.
        // me aseguro de dejar el id correcto
        const actualizado = Object.assign({}, nuevosDatos, { id: gastoId });

        // reemplazo el gasto antiguo por el objeto nuevo
        lista[indiceGasto] = actualizado;
        datos[usuario] = lista;

        return guardarDatos(datos).then(() => actualizado);
    });

}

// Debe devolver una promesa. Cuando se resuelva se debe haber eliminado el gasto del usuario
// y actualizado el fichero de datos
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

// Exportación de funciones
// Normalmente en NodeJS se utiliza el sistema CommonJS,
// pero se ha configurado el proyecto para que utilice módulos indicando
// 'type = module' en el archivo 'package.json'
export {
    obtenerGastosUsuario,
    anyadirGastoUsuario,
    actualizarGastoUsuario,
    borrarGastoUsuario,
    // Para poder utilizar uno distinto en los tests y no interferir con los datos reales
    cambiarFicheroDatos
}
