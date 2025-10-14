import { argv, exit } from 'process';

const URL_BASE = 'https://fakestoreapi.com';

const [metodo, recursoArg, ...datos] = argv.slice(2);

if (!metodo || !recursoArg) {
    console.error('Error: Solicitud incompleta.');
    console.log('Uso: npm run start {METODO} {recurso} [datos...]');
    console.log('Comandos válidos:');
    console.log('- Consultar todos los productos: npm run start GET products');
    console.log('- Consultar un productos:        npm run start GET products/{id}');
    console.log('- Crear productos:               npm run start POST products {titulo} {precio} {categoria}');
    console.log('- Eliminar productos:            npm run start DELETE products/{id}');
    exit(1);
}

const metodoMayus = metodo.toUpperCase();
const partesRecurso = recursoArg.split('/');
const recurso = partesRecurso[0].toLowerCase();
const id = partesRecurso.length > 1 ? parseInt(partesRecurso[1]) : null;

if (!id && recursoArg.includes('/')) {
    console.error('Error: ID de producto no válido.');
    exit(1);    
}

if (recurso !== 'products') {
    console.error(`Error: Recurso '${recurso}' no soportado. Usa 'products'.`);
    exit(1);
}

let url = `${URL_BASE}/${recurso}`;
let opciones = { method: metodoMayus };

switch (metodoMayus) {
    case 'GET':
        if (id) url += `/${id}`
        
        fetch(url)
            .then(response => response.json())
            .then(data => console.log(data));
        
        break;

    case 'POST':
        if (datos.length < 3) {
            console.error('Error: Faltan argumentos para crear un producto.');
            console.log('Uso: npm run start POST products Pulsera 300.99 Accesorios');
            exit(1);
        }

        const [titulo, precioStr, categoria] = datos;
        const precio = Number(precioStr);

        if (isNaN(precio)) {
            console.error('Error: El precio debe ser un número válido.');
            exit(1);        
        }

        const producto = { title: `${titulo}`, price: `${precio}`, category: `${categoria}` };
        opciones.headers = { 'Content-Type': 'application/json' };
        opciones.body = JSON.stringify(producto);

        fetch(url, opciones)
        .then(response => response.json())
        .then(data => console.log(data));

        break;

    case 'DELETE':
        if (!id) {
            console.error('Error: El comando DELETE requiere un ID de producto específico.');
            console.log('Uso: npm run start DELETE products/7')
            exit(1);        
        }

        url += `/${id}`

        fetch(url, opciones)
        .then(response => response.json())
        .then(data => console.log(data));

        break;

    default:
        console.error(`Error: se desconoce el método ${metodoMayus}.`);
        console.log('Métodos válidos: GET, POST, DELETE.');
        
        break;
}