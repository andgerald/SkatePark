// Importaciones
import express from "express";
import exphbs from "express-handlebars";
import fileUpload from "express-fileupload";
import "dotenv/config";
import path from "path";
import skatersRoutes from "./routes/index.js";

const { SERVER_PORT } = process.env;
const app = express();
const __dirname = path.resolve();

// Server
app.listen(SERVER_PORT, () =>
  console.log(`Server listening on port http://localhost:${SERVER_PORT}`)
);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use(
  fileUpload({
    limits: 5000000,
    abortOnLimit: true,
    responseOnLimit: "El tamaño de la imagen supera el límite permitido",
  })
);
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/mainLayout`,
  })
);
app.set("view engine", "handlebars");
app.use(skatersRoutes);
