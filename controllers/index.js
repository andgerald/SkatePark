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

export const skatersController = {
  findAll,
  remove,
  home,
  admin,
};
