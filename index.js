require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const GeneralRoute = require("./routes/GeneralRoute");
const swaggerDocs = require("./config/swagger");
const ip = require("ip");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = ip.address(); // Obtener la dirección IP de la máquina

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));  // Servir archivos estáticos desde la carpeta 'public'

// Rutas
app.use("/api", GeneralRoute);

// Configuración de Swagger
swaggerDocs(app);  // Añadimos Swagger para documentación interactiva

// Iniciar servidor
app.listen(PORT, HOST, () => console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`));