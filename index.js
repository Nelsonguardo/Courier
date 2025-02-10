import express from 'express';
import cors from 'cors';
import { port } from './config/config.js';
import { swaggerUi, specs } from './config/swagger.js';

const app = express();
const puerto = port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import usersRouter from './routes/user.js';
import shipmentRouter from './routes/shipment.js';
import shipmentAssignmentRouter from './routes/shipmentAssignment.js';

app.use('/api/users', usersRouter);
app.use('/api/shipment', shipmentRouter);
app.use('/api/shipmentAssignment', shipmentAssignmentRouter);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json({
        message: "Hola mundo",
        nombre: "Nelson",
        apellido: "Guardo",
        edad: 25
    });
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});

export default app;