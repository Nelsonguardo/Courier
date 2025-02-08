const express = require('express');
const cors = require('cors');
const {port} = require('./config/config');

const app = express();
const puerto = port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require('./routes/user');

app.use('/api/users', usersRouter);

app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json(
        {
            message: "Hola mundo",
            nombre: "Nelson",
            apellido: "Guardo",
            edad: 25
        }
    );
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});