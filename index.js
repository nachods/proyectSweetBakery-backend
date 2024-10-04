const mongoose = require("mongoose"); // Corregido de 'moongose' a 'mongoose'
const app = require("./app");
require("dotenv").config();

const dbUser = process.env.DB_USER; // Variables del entorno
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const ipServer = process.env.IP_SERVER;
const apiVersion = process.env.API_VERSION;
const port = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}`);
    app.listen(port, () => {
      console.log("================================");
      console.log("============API RESET===========");
      console.log("================================");
      console.log(`http://${ipServer}:${port}/api/${apiVersion}`);
    });
    console.log("La conexión con la base de datos fue exitosa");
  } catch (error) {
    console.log("Error al conectar la base de datos", error);
  }
};

connectDB();
