require("dotenv").config(); // Para usar las variables de entorno
const express = require("express");
const cors = require('cors');
const dbConnect = require('./config/mongo')
const app = express();

app.use(cors());

const port = process.env.PORT || 3000; // usa la variable de entorno

app.listen(port, () => {
    console.log('app en el puerto http://localhost' + port)
})

dbConnect();