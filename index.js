const express = require('express');
const connectDB = require('./config/db');

const clientRoutes = require('./routes/clientRoutes');

const app = express();

// Middleware
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/clients', clientRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
