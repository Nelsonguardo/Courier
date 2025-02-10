import express from 'express';
import cors from 'cors';
import { port } from './config/config.js';
import { swaggerUi, specs } from './config/swagger.js';

const app = express();
const puerto = port;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
import usersRouter from './routes/user.js';
import shipmentRouter from './routes/shipment.js';
import shipmentAssignmentRouter from './routes/shipmentAssignment.js';
import { connectRedis } from './config/redis.js';

app.use('/api/users', usersRouter);
app.use('/api/shipment', shipmentRouter);
app.use('/api/shipmentAssignment', shipmentAssignmentRouter);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Ruta de prueba
app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json({
        message: "Hola mundo",
        nombre: "Nelson",
        apellido: "Guardo",
        edad: 25
    });
});

// Iniciar el servidor
const startServer = async () => {
    try {
        await connectRedis();
        app.listen(puerto, () => {
            console.log(`Servidor funcionando en http://localhost:${puerto}`);
            console.log(`Documentación de la API en http://localhost:${puerto}/api-docs`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();

export default app;