const express = require('express');
const { dbConection } = require('./database/config');
//variables de entorno
require('dotenv').config();

const cors = require('cors')


//crear el servidor de express
const app = express();

//base de datos
dbConection();

app.use(cors())


//Directorio publico, muestra el html del public
app.use(express.static('public'));

//Lectura y parse del body
app.use(express.json());

//rutas
app.use('/auth', require('./routes/auth'));
app.use('/events', require('./routes/events'));




//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
})