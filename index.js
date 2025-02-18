require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const appointmentRoutes = require("./routes/GeneralRoute");
const swaggerDocs = require("./config/swagger");  // Asegúrate de importar el archivo que contiene la configuración de Swagger

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", appointmentRoutes);

// Configuración de Swagger
swaggerDocs(app);  // Añadimos Swagger para documentación interactiva

// Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
