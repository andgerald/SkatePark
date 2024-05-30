// Importaciones
import express from "express";
import jwt from "jsonwebtoken";
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
app.use(skatersRoutes);

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

app.get("/registro", (req, res) => {
  res.render("Registro");
});

app.get("/perfil", (req, res) => {
  const { token } = req.query;
  jwt.verify(token, secretKey, (err, skater) => {
    if (err) {
      res.status(500).send({
        error: `Algo salió mal...`,
        message: err.message,
        code: 500,
      });
    } else {
      res.render("Perfil", { skater });
    }
  });
});

app.get("/login", (req, res) => {
  res.render("Login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const skater = skaters.find(
      (s) => s.email == email && s.password == password
    );

    const token = jwt.sign(skater, secretKey);
    res.status(200).send(token);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
});

app.get("/Admin", async (req, res) => {
  try {
    res.render("Admin", { skaters });
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
});

// API REST de Skaters

// app.get("/skaters", async (req, res) => {
//   try {
//     res.status(200).send(skaters);
//   } catch (e) {
//     res.status(500).send({
//       error: `Algo salió mal... ${e}`,
//       code: 500,
//     });
//   }
// });

app.post("/skaters", async (req, res) => {
  const skater = req.body;
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No se encontro ningun archivo en la consulta");
  }
  const { files } = req;
  const { foto } = files;
  const { name } = foto;
  const pathPhoto = `/uploads/${name}`;

  console.log("Valor del req.body: ", skater);
  console.log("Nombre de imagen: ", name);
  console.log("Ruta donde subir la imagen: ", pathPhoto);

  foto.mv(`${__dirname}/public${pathPhoto}`, async (err) => {
    try {
      if (err) throw err;
      skater.foto = pathPhoto;
      skaters.push(skater);
      res.status(201).redirect("/");
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: `Algo salió mal... ${e}`,
        code: 500,
      });
    }
  });
});

app.put("/skaters", async (req, res) => {
  const { id, nombre, anos_experiencia, especialidad } = req.body;
  console.log("Valor del body: ", id, nombre, anos_experiencia, especialidad);
  try {
    const skaterB = skaters.findIndex((s) => s.id == id);
    //        if (skaterB) {
    skaters[skaterB].nombre = nombre;
    skaters[skaterB].anos_experiencia = anos_experiencia;
    skaters[skaterB].especialidad = especialidad;
    res.status(200).send("Datos actualizados con éxito");
    // } else {
    //     res.status(400).send("No existe este Skater");
    // }
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
});

app.put("/skaters/status/:id", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  console.log("Valor de estado recibido por body: ", estado);
  try {
    const skaterB = skaters.findIndex((s) => s.id == id);

    //if (skaterB !== -1) {
    skaters[skaterB].estado = estado;
    res.status(200).send("Estado Actualizado con éxito");
    // } else {
    //     res.status(400).send("No existe este Skater");
    // }
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
});

app.delete("/skaters/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const skaterB = skaters.findIndex((s) => s.id == id);

    if (skaterB !== -1) {
      skaters.splice(skaterB, 1);
      res.status(200).send("Skater Eliminado con éxito");
    } else {
      res.status(400).send("No existe este Skater");
    }
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
});
