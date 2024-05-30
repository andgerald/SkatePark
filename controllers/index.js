import { skatersModel } from "../models/index.js";

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

export const skatersController = {
  findAll,
  remove,
  update,
  updateState,
  home,
  admin,
  registro,
  login,
};
