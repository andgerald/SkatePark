import { skatersModel } from "../models/index.js";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import "dotenv/config";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { SECRET_KEY } = process.env;

const findAll = async (req, res) => {
  try {
    const skaters = await skatersModel.findAll();
    res.status(200).send(skaters);
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
};
const create = async (req, res) => {
  try {
    const { email, nombre, password, anos_experiencia, especialidad } =
      req.body;

    if (!req.files || !req.files.foto) {
      return res.status(400).send({ error: "Foto es requerida" });
    }

    const { foto } = req.files;
    const { name } = foto;
    const uploadsPath = path.join(__dirname, "../public/uploads");
    const pathPhoto = path.join(uploadsPath, name);
    foto.mv(pathPhoto, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: "Error al subir la foto" });
      }

      const foto = `/uploads/${name}`;

      // Crear el nuevo skater
      try {
        await skatersModel.create(
          email,
          nombre,
          password,
          anos_experiencia,
          especialidad,
          foto
        );

        res.status(201).redirect("/");
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ error: "Error al crear el skater en la base de datos" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Algo salió mal..." });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("EL id es requerido");
  }
  try {
    const skaters = await skatersModel.remove(id);
    res.status(200).send({ message: "Skater Eliminado con éxito", skaters });
  } catch (error) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
};
const update = async (req, res) => {
  const { id, nombre, anos_experiencia, especialidad } = req.body;
  const skater = await skatersModel.update(
    nombre,
    anos_experiencia,
    especialidad,
    id
  );
  res.status(200).send({ message: "Datos actualizados con éxito", skater });
};

const updateState = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const skater = await skatersModel.updateState(id, estado);
  res.status(200).send({ message: "Estado actualizado con éxito", skater });
};

const loginSkaters = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Email y password son requeridos" });
  }
  const skater = await skatersModel.loginSkaters(email, password);
  if (!skater) {
    return res.status(401).send({ error: "Email o password incorrectos" });
  }
  const token = jwt.sign({ id: skater.id, email: skater.email }, SECRET_KEY);

  res.status(200).send(token);
};

const home = async (req, res) => {
  try {
    const skaters = await skatersModel.findAll();
    res.render("Home", { skaters });
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
};

const admin = async (req, res) => {
  try {
    const skaters = await skatersModel.findAll();
    res.render("Admin", { skaters });
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
};
const registro = (req, res) => {
  res.render("Registro");
};

const login = (req, res) => {
  res.render("Login");
};

const perfil = async (req, res) => {
  const email = req.skater.email;
  try {
    const skater = await skatersModel.findByEmail(email);
    res.render("Perfil", { skater });
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
};

export const skatersController = {
  findAll,
  create,
  remove,
  update,
  updateState,
  loginSkaters,
  home,
  admin,
  registro,
  login,
  perfil,
};
