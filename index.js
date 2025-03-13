require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http"); // Para crear el servidor HTTP
const { Server } = require("socket.io"); // Importar socket.io
const connectDB = require("./config/db");
const GeneralRoute = require("./routes/GeneralRoute");
const swaggerDocs = require("./config/swagger");

const app = express();
const server = http.createServer(app); // Crear servidor HTTP
const io = new Server(server, { cors: { origin: "*" } }); // Habilitar CORS para WebSockets

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rutas
app.use("/api", GeneralRoute);

// Configuración de Swagger
swaggerDocs(app);

// Evento de conexión de WebSockets
io.on("connection", (socket) => {
  console.log("🔌 Nuevo cliente conectado");

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado");
  });
});

// Hacer accesible io desde otros archivos
module.exports = { io };

// Iniciar servidor
server.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`));
