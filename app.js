const express = require('express');
const { mongoConection } = require('./DataBases/config');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
mongoConection();

app.use(
    cors({
        origin: '*'
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importar rutas

const proyectos = require('./rutas/proyectoRouter'); 


// Usar las rutas

app.use('/api/v1/proyectos', proyectos); 


// Ruta para manejar errores 404
app.get("*", (req, res) => {
    return res.status(404).json({
        msj: 'No encontrado',
        status: 404
    });
});

module.exports = app;

 

