
### Middleware
Los middlewares son llamados antes de las funciones ruta, deben siempre tener la funcion "next()" para que pueda continuar con la ejecucion del endpoint,

Ejemplo de un codigo middleware es:
```js
const express = require('express');
const app = express();

//middlewares
app.use(express.json());
```

Ejemplo de un codigo middleware **custom** es:
```js
const express = require('express');
const app = express();

//middlewares
app.use(function(req, res, next){
    console.log("llamado primero...");
    next();
});

app.use(function(req, res, next){
    console.log("llamado segundo...");
    next();
});
```