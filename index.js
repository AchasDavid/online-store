const argumentos = process.argv.slice(2);

if (!argumentos.length) {
    console.log('Solicitud incompleta: debe incluir parámetros.');
}