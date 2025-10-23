# Proyecto para Talento Tech con Node.js

Este es un programa de línea de comandos (CLI) construido con Node.js, que te permite interactuar con la **Fake Store API** (`https://fakestoreapi.com`) para administrar recursos de **productos** mediante solicitudes HTTP (GET, POST, DELETE).

## Uso

El programa emplea una estructura básica de comando:

```bash
npm run start {METODO} {recurso} [datos...]'
```

```{METODO}```: Indica el método HTTP. Los métodos soportados son ```GET```, ```POST``` y ```DELETE```.

```{recurso}```: El recurso objetivo. Actualmente, solo se soporta ```products``` (o ```products/{id}``` para acciones específicas).

```[datos...]```: Argumentos adicionales requeridos para el método ```POST```.

### Comandos

- Consultar todos los productos: 

```bash
npm run start GET products
```
   
- Consultar un producto:

```bash
npm run start GET products/{id}
```

- Crear productos:

```bash
npm run start POST products {titulo} {precio} {categoria}
```

- Eliminar productos:

```bash
npm run start DELETE products/{id}
```