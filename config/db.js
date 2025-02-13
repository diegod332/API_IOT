const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("📡 Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error en MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
