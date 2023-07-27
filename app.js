require("dotenv").config(); // Para usar las variables de entorno
const express = require("express");
const cors = require('cors');
// const morganBody = require('morgan-body');
const dbConnect = require('./config/mongo');
const {dbConnectMySql} = require('./config/mysql');
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors());
app.use(express.json()); // cuando se hace el controlador
app.use(express.static('storage')); // para ver los archivos estaticos en el navegador
// morganBody(app, {

// })

const port = process.env.PORT || 3000; // usa la variable de entorno


// Routes

app.use('/api', require('./routes'))


app.listen(port, () => {
    console.log('app en el puerto http://localhost' + port)
});

(ENGINE_DB === 'nosql') ? dbConnect() : dbConnectMySql();